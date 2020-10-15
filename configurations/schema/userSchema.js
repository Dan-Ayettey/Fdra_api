const {checkSchema,validationResult,body}=require('express-validator');


const schemaCreate=checkSchema ({
    email:{
        exists:true,
        isString:true,
        isEmail:true,
        in:["body","params"],
        isEmpty:false,
        errorMessage:'Email field is needed'
    },
    password:{
        exists:true,
        isString:true,
        in:["body","params"],
        isEmpty:false,
        errorMessage:'Password field is needed'
    },
    firstName:{
        in:["body","params"],
        exists:true,
        isString:true,
        isEmpty:false,
        errorMessage:'firstName field is needed'
    },
    dateOfBirth:{
        in:["body","params"],
        toDate:true,
    },
    age:{
        in:["body","params"],
        errorMessage:'Age field is needed'
    },

    lastName:{
        in:["body","params"],
        exists:true,
        isEmpty:false,
        isString:true,
        errorMessage:'lastName field is needed'
    },
    telephoneNumber:{
        exists:true,
        isInt:true,
        in:["body","params"],
        isEmpty:false,
        errorMessage:'Telephone number field is needed'
    },
    address:{

        in:["body","params"],

    },
    postalCode:{
        in:["body","params"]
    },
    apartmentNumber:{
        in:["body","params"]
    },
    state:{
        in:["body","params"]
    },
    countryCode:{
        in:["body","params"]
    },
    country:{

        in:["body","params"]
    },
    careOf:{
        in:["body","params"]
    },
    role:{
        exists:true,
        isString:true,
        in:["body","params"],
        isEmpty:false,
        errorMessage:'Role field is needed'
    }
});
const schemaUpdate=[body('id').not().isEmpty().withMessage('id isNeeded')];
const schemaGet=[body('id').not().isEmpty().withMessage('id isNeeded')];
const schemaDelete=[body('id').not().isEmpty().withMessage('id isNeeded')];
const schemaAuth=checkSchema ({
    email:{
        in:['params','body'],
        isEmail:true,
        isString:true,
        isInt:false,
        exists:{
            errorMessage:' The param email is needed'
        }
    },
    password:{
        in:['params','body'],
        isString:true,
        isInt:false,
        exists:{
            errorMessage:' The param email is needed'
        }
    }
});

module.exports={
    schemaCreate,
    schemaDelete,
    schemaUpdate,
    schemaAuth,
    schemaGet,
    validationResult
}
