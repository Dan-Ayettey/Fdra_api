//instances
const {userModel,isValidPassword,getHashedPassword}=require('../models/userModel');
const {secret}=require('../configurations/auth/user-secret.json');
const jwt=require('jsonwebtoken');
const stripe_key = "sk_test_4eC39HqLyjWDarjtT1zdp7dc"
const stripe = require('stripe')(stripe_key);
const {validationResult} = require("../configurations/schema/userSchema");
//Set constructs or composites
const createUser=async function (request,response,next){
 const errors=validationResult(request);

if(errors.isEmpty()) {
    request.body.created_at=new Date();
    const {role,email}=request.body
    request.body._links = [
        {
            rel: 'self', href: ['v1/user/auth', '/'], action: 'POST',
            types: ["application/json"], gives: 'authorization token'
        },
        {
            rel: 'self', href: ['v1/', '/'], action: 'GET',
            types: ["application/json"]
        },
        {
            rel: 'self', href: 'localhost/v1/admins', action: 'POST',
            types: ["application/x-www-form-urlencoded"]
        },
        {
            rel: 'self', href: 'localhost/v1/admin/managed-users/', action: 'GET',
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
            rel: 'self', href: 'localhost/v1/users/id/deactivated-user', action: 'PUT',
            types: ["application/x-www-form-urlencoded"], authorization: 'token'
        },
        {
            rel: 'self', href: 'localhost/v1/users/id/activated-user', action: 'PUT',
            types: ["application/x-www-form-urlencoded"], authorization: 'token'
        },
        {
            rel: 'self', href: 'localhost/v1/admins/managed-users/id/deactivate-user', action: 'PUT',
            types: ["application/x-www-form-urlencoded"], authorization: 'token'
        },
        {
            rel: 'self', href: 'localhost/v1/admins/managed-users/id', action: 'DELETE',
            types: [], authorization: 'token'
        },
    ];
    try {
        const find=await userModel.findOne({email});
        if(!find){
                request.body.isActive = true;
                request.body.isAvailable = true;
                request.body.role=role||'basic';
                request.body._customer_id= await stripe.customers.create(
                    { email: email }
                ).then((customer) =>{ return customer.id} ).then((customer)=>{return customer}).
                catch((err) => {
                    throw new Error(err);
                });

                request.body._token=jwt.sign({role,email,isActive:request.body.isActive},secret,{
                    expiresIn: '1d'
                })
                const user = await userModel.create(request.body);
                response.status(201).json({
                    user,
                    isCreated: true,
                });
            }else {
                response.status(409).json({msg: 'Conflict', isAvailable: find.isAvailable, isActive: find.isActive});
            }

    } catch (e) {
        next({error:e._message,msg:'might be server error'});
        throw new Error(e.message);
    }
}else {
    response.status(400).json(errors);
}
};
const grantAuthenticationWithAToken=async function (request){
    const {email,password,telephoneNumber}=request.body;
      const user=await userModel.findOne(({email}) || ({telephoneNumber}));
        if(user){
            const isAvailable=isValidPassword(password,user.password) || telephoneNumber === user.telephoneNumber &&
                email===user.email && user.isActive;
                if(isAvailable){
                    user._token= await jwt.sign(request.body, secret, {expiresIn: '1d'});
                    await user.save();
                    return {user};
                }else if(user.email === email  && user.isActive===false){
                    return {isActive:user.isActive,isNeededActivation:true};
                }else {
                    return false;
                }

        }else {
            return false;
        }
    }
const authorizeUser=async function (request,response){
    const errors=validationResult(request);
    if(errors.isEmpty()) {
        const {user} = await grantAuthenticationWithAToken(request);

         if(user){

             if (user.isActive) {

                 response.status(200).json({user,isAuthorized:true});
             }else {
                 response.status(401).json({msg: 'Unauthorized', isAuthorized: user.isActive});
             }
         } else {
            response.status(401).json({msg: 'Unauthorized', isAuthorized: false});
        }
    }else {
        response.status(400).json(errors);
    }
};
const getUsers=async function (request,response,next){


    try {
         await userModel.find({},(err,users)=>{
            if(!err){ response.locals.loggedInUser = users;
                response.status(200).json({users,isAvailable:userModel.isAvailable});
            }else {
                response.status(401).json({msg:'Unauthorized',...err,isAvailable:userModel.isAvailable});
            }
        });
    }catch (e){
        next({error:e._message,msg:'might be server error'});
        throw new Error(e.message);
    }
};
const getUserById=async function (request,response,next){
    const errors=validationResult(request);
    if(errors.isEmpty()) {
        const _id=request.body.id ? request.body.id:request.params.id;
        try {
            const user = await userModel.findOne({_id});

            if (user) {
                    if(user.id===_id){
                        response.status(200).json({user, isAvailable: userModel.isAvailable});
                    }else {
                        response.status(401).json({msg: 'Unauthorized', _id, isAvailable: userModel.isAvailable});
                    }
            } else {
                response.status(401).json({msg: 'Unauthorized', ...user, isAvailable: userModel.isAvailable});
            }
        } catch (e) {
            next({error:e._message,msg:'might be server error'});
            throw new Error(e.message);
        }
    }else {
        response.status(400).json(errors);
    }
};
const deactivateUserById= async function (request,response,next){
    const errors=validationResult(request);
    if(errors.isEmpty()) {
        request.body.deactivated_at=new Date();
        const _id=request.body.id ? request.body.id:request.params.id;
        try {
            const user = await userModel.findOne({_id});

            if(user.isActive) {
                if (user) {
                    user.isActive = false;
                    user.deactivated_at=new Date();
                    const save=await user.save();
                    response.status(200).json({id: user.id, isDeactivated:!save.isActive});
                } else {
                    response.status(401).json({msg: 'Unauthorized', isDeactivated: false});
                }
            } else{
                response.status(403).json({msg: 'Unauthorised to access the resource', isDeactivated:true});
            }

        } catch (e) {
            next({error:e._message,msg:'might be server error'});
            throw new Error(e.message);
        }
    }else {
        response.status(400).json(errors);
    }
};
const deleteUserById= async function (request,response,next){
    const errors=validationResult(request);
    if(errors.isEmpty()) {
        const _id=request.body.id ? request.body.id:request.params.id;
        try {
            const user = await userModel.findOne({_id});
            if (user) {

                await userModel.findOneAndDelete({_id});
                response.status(200).json({id:user.id, isDeleted: true});
            } else {
                response.status(401).json({msg: 'Unauthorized', isDeleted:  false});
            }
        } catch (e) {
            next({error:e._message,msg:'might be server error'});
            throw new Error(e.message);
        }
    }else {
        response.status(400).json(errors);
    }
};
const activateUser= async function (request,response,next){
    const errors=validationResult(request);
    if(errors.isEmpty()) {
        const {email,telephone}=request.body;
        try {
            const user = await userModel.findOne(({email}) || ({telephone}));
            if (user) {
                user.isActive=true;
                user.activated_at=new Date();
                const save=await user.save();
                if (save){
                    response.status(200).json({id:save.id, isActive: save.isActive});
                }else{
                    response.status(401).json({error:save.message, isActive: save.isActive});
                }

            } else {
                response.status(401).json({msg: 'Unauthorized', isActive:  false});
            }
        } catch (e) {
            next({error:e._message,msg:'might be server error'});
            throw new Error(e.message);
        }
    }else {
        response.status(400).json(errors);
    }
};
const updateUserById=async function (request,response,next){
    const errors=validationResult(request);
    if(errors.isEmpty()) {
        request.body.updated_at=new Date();
        const _id=request.body.id ? request.body.id:request.params.id;
        try {
            const user = await userModel.findOne({_id});
            if (user) {
                if(user.isActive){
                    request.body.password ? getHashedPassword(request.body.password,8):user.password;
                    const user = await userModel.findByIdAndUpdate({_id},{...request.body});
                    response.status(200).json({id:user.id,updated_at:user.updated_at, isUpdated: true})
                }else {
                    response.status(401).json({msg: 'Unauthorized', isUpdated: false});
                }
            } else {
                response.status(401).json({msg: 'Unauthorized', ...user, isUpdated: false});
            }
        } catch (e) {
            next({error:e._message,msg:'might be server error'});
            throw new Error(e.message);
        }


    }else {
        response.status(400).json(errors);
    }
};
const renewPasswordById=async function (request,response,next){
    const errors=validationResult(request);
    if(errors.isEmpty()) {
        const {id,password}=request.body;
        const _id=id;
        try {
            const user = await userModel.findOne({_id});
            if (user) {
                user.updated_at=new Date();
                user.password=getHashedPassword(password,8);
                const save=await user.save();
                if (save){
                    response.status(200).json({id:save.id, isRenewed: save.isActive});
                }else{
                    response.status(401).json({error:save.message, isRenewed: !save.isActive});
                }

            } else {
                response.status(401).json({msg: 'Unauthorized', isActive:  false});
            }
        } catch (e) {
            next({error:e._message,msg:'might be server error'});
            throw new Error(e.message);
        }
    }else {
        response.status(400).json(errors);
    }
};
const veryToken=async function (req, res, next){

    if (req.headers.authorization) {

        const accessToken = req.headers.authorization.slice(7,1000).trim();

        try{
            const very = await jwt.verify(accessToken, secret);
            // Check if token has expired
            if (very.exp < Date.now().valueOf() / 1000) {
                res.status(401).json({ error: "JWT token has expired, please login to obtain a new one" });
            }else
            res.locals.loggedInUser = await userModel.findById(very.id);
            next();
        }catch (e){
            next({error:e._message,msg:'might be server error'});
            throw new Error(e.message);
        }

    } else {
        next();
    }
};
module.exports={
    createUser,
    getUsers,
    renewPasswordById,
    authorizeUser,
    getUserById,
    deleteUserById,
    activateUser,
    deactivateUserById,
    updateUserById,
    veryToken

};


