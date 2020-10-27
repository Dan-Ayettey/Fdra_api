/*
dependencies
*/
'use strict';
//instances
const mongoose=require('mongoose');
const {hashSync,compareSync}=require('bcrypt');
const Schema=mongoose.Schema;
// IsAvailable constructor
function getIsAvailable(isAvailable){
    return  isAvailable;
}
// IsAvailable constructor
function getIsActive(isActive){
    return  isActive;
}
// Password constructor
function getHashedPassword(password){
    return  hashSync(password,8);
}
// Token constructor
function getToken(token){
    return  token;
}
function isValidPassword(data,encrypt){
    return compareSync(data,encrypt);
}
// Date created constructor
function getDateCreated(date){
    return  date;
}
// Date updated constructor
function getDateUpdated(date){
    return  date;
}
function getDateDeactivated(date){
    return  date;
}
function getDateActivated(date){
    return  date;
}

//getStripe customer id
const getCustomerId = function(id) {
    return id;
};
const CustomerModelSchema=new Schema({
    email:{
        type:String,
        unique:true,
        exists:true,
        isEmail:true,
        isEmpty:false,
        required:[true, 'Email id is required'],

    },
    telephoneNumber:{
        type:String,
        unique:true,
        exists:true,
        required:[true, 'Telephone number is required'],

    },
    customer:{
        type:Array,
        required:[true, 'Customer field is required'],
    },
    _user_id:{
        type:String,
        unique:true,
        exists:true,
        required:[true, 'user id is required'],
    }

});
const UserSchema=new Schema({
     _customer_id:{
         type:String,
         unique: true,
         immutable:true,
         set:getCustomerId,
     },
    email:{
        type:String,
        unique: true,
        immutable:true,
        required:[true, 'Email field is needed']
    },
    password:{
        type:String,
        required:[true, 'Password field is needed'],
        set:getHashedPassword
    },
    firstName:{
        type:String,
    },
    tagName:{
        type:String,
    },
    created_at:{
        type:String,
         set:getDateCreated
    } ,
    updated_at: {
        type:String,
        set:getDateUpdated
    },
    deactivated_at: {
        type:String,
        set:getDateDeactivated
    },
    activated_at: {
        type:String,
        set:getDateActivated
    },
    companyName:{
        type:String,
    },
    dateOfBirth:{
        type:String,
    },
    age:{
        type:Number,
        min:15,
        max:200,
        required:[true, 'Age field is needed'],
    },

    lastName:{
        type:String,
    },
    telephoneNumber:{
        type:Number,
    },

    address:{
        type:Array,
    },

    _links:[],
    isActive:{
         type:Boolean,
        set:getIsActive
    },
    isAvailable:{
        type:Boolean,
        set:getIsAvailable
    },
    secretMessage:{
        type: String,
        required:true,
        set:getHashedPassword
    },
    role: {
        type: String,
        default: 'basic',
        enum: ["basic", "supervisor", "admin"]
    },
    _token:{
         type:String,
         set:getToken,
    }
});

//module
const userModel=mongoose.model('User',UserSchema);
const customerModel=mongoose.model('Customer',CustomerModelSchema);
module.exports={userModel,isValidPassword,getHashedPassword,customerModel};

