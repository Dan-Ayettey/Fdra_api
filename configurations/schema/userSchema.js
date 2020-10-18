const {checkSchema,validationResult,body}=require('express-validator');

/*checkSchema ({
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
});*/
const schemaUpdate=body('id').isString().withMessage('id is Needed');
const schemaGet=body('id').isString().withMessage('id is Needed');
const schemaRenewPassword= [body('id').isString().withMessage('id is Needed'),
    body('password').isString().withMessage('password is Needed')].filter(schema=>schema);
const schemaDelete=body('id').isString().withMessage('id is Needed');
const schemaCreate=checkSchema ({
    email:{
        in:['body'],
        isEmail:true,
        isString:true,
        isInt:false,
        exists:{
            errorMessage:' The email is needed'
        }
    },
    password:{
        in:['body'],
        isString:true,
        isInt:false,
        exists:{
            errorMessage:' The password is needed'
        }
    },
    telephoneNumber:{
        isString:true,
        in:['body'],
        isEmpty:false,
        exists:{
            errorMessage:' The telephoneNumber is needed'
        }
    },
    firstName:{
        isString:true,
        in:['body'],
        isEmpty:false,
        exists:{
            errorMessage:' The firstName is needed'
        }
    },
    lastName:{
        isString:true,
        in:['body'],
        isEmpty:false,
        exists:{
            errorMessage:' The lastName is needed'
        }
    },
    tagName:{
        isString:true,
        in:['body'],
        isEmpty:false,
        exists:{
            errorMessage:' The tagName is needed'
        }
    },
    age:{
        isInt:true,
        in:['body'],
        isEmpty:false,
        exists:{
            errorMessage:' The age is needed'
        }
    },

});
const schemaAuth=checkSchema ({
    email:{
        in:['body'],
        isEmail:true,
        isString:true,
        isInt:false,
        exists:{
            errorMessage:' The email is needed'
        }
    },
    password:{
        in:['body'],
        isString:true,
        isInt:false,
        exists:{
            errorMessage:' The password is needed'
        }
    },
    telephoneNumber:{
        isString:true,
        in:['body'],
        isEmpty:false,
        exists:{
            errorMessage:' The telephoneNumber is needed'
        }
    },


});
const schemaActivate=checkSchema ({
    email:{
        in:['body'],
        isEmail:true,
        isString:true,
        isInt:false,
        exists:{
            errorMessage:' The email is needed'
        }
    },
    telephoneNumber:{
        isString:true,
        in:['body'],
        exists:{
            errorMessage:' The telephoneNumber is needed'
        }
    },


});

module.exports={
    schemaCreate,
    schemaDelete,
    schemaUpdate,
    schemaAuth,
    schemaRenewPassword,
    schemaActivate,
    schemaGet,
    validationResult
}
