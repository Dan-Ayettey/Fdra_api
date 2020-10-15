
const {userModel}=require('../models/userModel');
const {hashSync,compareSync}=require('bcrypt');
const {}=require('../configurations/schema/userSchema')
const {secret}=require('../configurations/auth/user-secret.json');
const jwt=require('jsonwebtoken');
const {validationResult} = require("../configurations/schema/userSchema");
//Set constructs or composites

const createUser=async function (request,response){
 const errors=validationResult(request);

if(errors.isEmpty()) {
    request.body._links = [
        {
            rel: 'self', href: ['v1/user/login', '/'], action: 'GET',
            types: ["application/json"], gives: 'authorization token'
        },
        {
            rel: 'self', href: ['v1/', '/'], action: 'GET',
            types: ["application/json"]
        },
        {
            rel: 'self', href: 'localhost/v1/users', action: 'POST',
            types: ["application/x-www-form-urlencoded"]
        },
        {
            rel: 'self', href: 'localhost/v1/users', action: 'GET',
            types: ["application/json"], authorization: 'token'
        },
        {
            rel: 'self', href: 'localhost/v1/users/id', action: 'GET',
            types: ["application/json"], authorization: 'token'
        },
        {
            rel: 'self', href: 'localhost/v1/users/id', action: 'PUT',
            types: ["application/x-www-form-urlencoded"], authorization: 'token'
        },
        {
            rel: 'self', href: 'localhost/v1/users/id/activate-user', action: 'PUT',
            types: ["application/x-www-form-urlencoded"], authorization: 'token'
        },
        {
            rel: 'self', href: 'localhost/v1/users/id', action: 'DELETE',
            types: [], authorization: 'token'
        },
    ];
    try {
        await userModel.find({}, async (err, user) => {
            let isAvailable=false;
            user.filter(async (user) => {
                if (!err && (user.email === request.body.email)) {
                    isAvailable=true;
                }
            });
            if(!isAvailable){
                request.body.isActive = true;
                const _links = await userModel.create(request.body);
                response.status(201).json({
                    _links: _links._links,
                    isCreated: true,
                    isActive: request.body.isActive
                });
                isAvailable=false;
            }else {
                response.status(409).json({msg: 'Conflict', ...err, isAvailable: true, isActive: user.isActive});
                return false;
            }
        });
    } catch (e) {
        response.status(404).json(e.message);
    }
}else {
    response.status(400).json(errors);
}
};
const grantAuthenticationWithAToken=async function (request){
    const {email,password,telephoneNumber}=request.body;
         const user=await userModel.findOne({email});
        if(user && compareSync(password,user.password)
            || telephoneNumber === user.telephoneNumber
            || email===user.email && user.isActive){
                const authToken = await jwt.sign({sub: user.id, role: user.role}, secret, {expiresIn: '2h'});
                return {user, authToken};
        }else {
            return false;
        }
    }
const authorizeUser=async function (request,response){
    const errors=validationResult(request);
    if(errors.isEmpty()) {
        const user = await grantAuthenticationWithAToken(request);
        if (user) {
            response.status(200).json({...user,isAuthorized:false});
        } else {
            response.status(401).json({msg: 'Unauthorized', isAuthorized: user});
        }
    }else {
        response.status(400).json(errors);
    }
};
const getUsers=async function (request,response){
    try {
        await userModel.find({},(err,users)=>{
            if(!err){
                response.status(200).json({users,isAvailable:true});
            }else {
                response.status(401).json({msg:'Unauthorized',...err,isAvailable:true});
            }
        });
    }catch (err){
        throw new Error(err);
    }
};
const getUserById=async function (request,response){
    const errors=validationResult(request);
    if(errors.isEmpty()) {
        const _id=request.body.id ? request.body.id:request.params.id;
        try {
            const user = await userModel.findOne({_id});
            if (user) {
                response.status(200).json({user, isAvailable: true});
            } else {
                response.status(401).json({msg: 'Unauthorized', ...user, isAvailable: false});
            }
        } catch (err) {
            throw new Error(err);
        }
    }else {
        response.status(400).json(errors);
    }
};

const deactivateUserById= async function (request,response){
    const errors=validationResult(request);
    if(errors.isEmpty()) {
        const _id=request.body.id ? request.body.id:request.params.id;
        try {
            const user = await userModel.findOne({_id});
            if (user) {
                user.isActive=false;
                const user = await userModel.findOneAndUpdate({_id},user);
                response.status(200).json({id:user.id, isDeactivated: true});
            } else {
                response.status(401).json({msg: 'Unauthorized', isDeactivated:  false});
            }
        } catch (err) {
            throw new Error(err);
        }
    }else {
        response.status(400).json(errors);
    }
};
const deleteUserById= async function (request,response){
    const _id=request.body.id ? request.params.id:request.body.id;

    try {
        await userModel.findByIdAndUpdate({_id},(err,user)=>{
            if(!err){
                response.status(200).json({user,isDeleted:true});
            }else {
                response.status(401).json({msg:'Unauthorized',...err,isDeleted:false});
            }
        });
    }catch (err){
        throw new Error(err);
    }
};
const activateUserById= async function (request,response){
    const _id=request.body.id ? request.params.id:request.body.id;
    try {
        await userModel.findByIdAndUpdate({_id},(err,user)=>{
            if(!err){
                response.status(200).json({user,isDeleted:true});
            }else {
                response.status(401).json({msg:'Unauthorized',...err,isDeleted:false});
            }
        });
    }catch (err){
        throw new Error(err);
    }
};
const updateUserById=async function (request,response){
    const errors=validationResult(request);
    if(errors.isEmpty()) {
        const _id=request.body.id ? request.body.id:request.params.id;
        try {
            const user = await userModel.findByIdAndUpdate({_id},{...request.body});
            if (user) {
                request.body.password ? hashSync(request.body.password,8):user.password;
                response.status(200).json({id:user.id, isUpdated: true});
            } else {
                response.status(401).json({msg: 'Unauthorized', ...user, isUpdated: false});
            }
        } catch (err) {
            throw new Error(err);
        }


    }else {
        response.status(400).json(errors);
    }
};
/*
const patchUser=function (request,response){
    const {password,email,telephone_number}=request.body;
    try {
        return pool.query('SELECT * FROM users');
    }catch (e){
        throw new Error(e);
    }
}
*/
module.exports={
    createUser,
    getUsers,
    authorizeUser,
    getUserById,
    deleteUserById,
    activateUserById,
    deactivateUserById,
    updateUserById,

};


