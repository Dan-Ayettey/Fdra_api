const {checkSchema,validationResult}=require('express-validator');
const schemaUpdate=checkSchema({
    id:{
        in:['body'],
        isEmpty:false,
        isString:true,
        exists:true,
        errorMessage:'id is needed'


    }
});
const getCustomerByIdSchema=checkSchema({
    id:{
        in:["params","body"],
        isString:true,
        isEmpty:false,
        exists:true,
        errorMessage:'User id is needed'
    }});
const schemaGet=checkSchema({
    id:{
        in:['body'],
        isEmpty:false,
        isString:true,
        exists:true,
        errorMessage:'id is needed'


    }
});
const schemaRenewPassword=checkSchema({
    id:{
        in:['body'],
        isEmpty:false,
        isString:true,
        exists:true,
        errorMessage:'id is needed'


    },
    password:{
        in:['body'],
        isEmpty:false,
        isString:true,
        exists:true,
        errorMessage:'password is needed'


    }
});
const  schemaRenewSecretMessage=checkSchema({
    id:{
        in:['body'],
        isEmpty:false,
        isString:true,
        exists:true,
        errorMessage:'id is needed'


    },
    secretMessage:{
        in:['body'],
        isEmpty:false,
        isString:true,
        exists:true,
        errorMessage:'Secret message is needed'


    }
});
const schemaDelete=checkSchema({
    id:{
        in:['body'],
        isEmpty:false,
        isString:true,
        exists:true,
        errorMessage:'id is needed'


    }
});

const schemaCreate=checkSchema ({
    email:{
        in:['body'],
        isEmail:true,
        isString:true,
        isInt:false,
        exists:true,
            errorMessage:' The email is needed'

    },
    secretMessage:{
        isString:true,
        in:['body'],
        exists:false,
        errorMessage:' secret message is needed'
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
        exists:true,
        isEmpty:false,
        errorMessage:' The email is needed'
    },
    telephoneNumber:{
        isString:true,
        in:['body'],
        exists:true,
        errorMessage:' The telephoneNumber is needed'
    },
    password:{
        isString:true,
        in:['body'],
        exists:false,
        errorMessage:' The  password is needed'
    },
    secretMessage:{
        isString:true,
        in:['body'],
        exists:false,
        isEmpty:false,
        errorMessage:' secret message is needed'
    },

});

module.exports={
    schemaCreate,
    schemaDelete,
    schemaUpdate,
    schemaAuth,
    schemaRenewSecretMessage,
    schemaRenewPassword,
    schemaActivate,
    schemaGet,
    getCustomerByIdSchema,
    validationResult
};
