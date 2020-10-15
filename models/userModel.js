/*
dependencies
*/
const mongoose=require('mongoose');
const {hashSync}=require('bcrypt');
const Schema=mongoose.Schema;

// Password constructor
function getPassword(password){
    return  hashSync(password,8);
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
        set:getPassword
    },
    firstName:{
        type:String,
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
        required:true
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
    isActive:Boolean,
    role:{
         type:String,
          required:[true,'Role field is needed']
    }
});

//module
const userModel=mongoose.model('user',UserSchema);
module.exports={userModel};

