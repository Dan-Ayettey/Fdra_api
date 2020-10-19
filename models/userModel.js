/*
dependencies
*/
'use strict'
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
// Date updated
function getDateUpdated(date){
    return  date;
}
function getDateDeactivated(date){
    return  date;
}
function getDateActivated(date){
    return  date;
}



// mongoose user schema
const UserSchema=new Schema({
     _customerId:Schema.Types.ObjectId,
    email:{
        type:String,
        unique:true,
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
        type:String,

    },
    postalCode:{
        type:Number,
    },
    apartmentNumber:{
        type:String,
    },
    state:{
        type:String
    },
    countryCode:{
        type:Number,
    },
    country:{
        type:String,
    },
    careOf:{
        type:String,
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
const userModel=mongoose.model('user',UserSchema);
module.exports={userModel,isValidPassword,getHashedPassword};

