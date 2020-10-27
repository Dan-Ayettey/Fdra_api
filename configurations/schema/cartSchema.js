const {checkSchema,validationResult}=require('express-validator');
const createCartSchema=checkSchema({
    items:{
        in:['body'],
        isArray:true,
        isEmpty:false,
        errorMessage:'Needed items and must not be left empty'


    },

    user_id:{
        in:['body'],
        isString:true,
        isEmpty:false,
        errorMessage:'Need id and must not be left empty'

    },


});
const getCartSchema=checkSchema({


    user_id:{
        in:['body',"params"],
        isString:true,
        isEmpty:false,
            errorMessage:'_user_id item must not be left empty'


    },


});
const getCartByIdSchema =checkSchema({


    cart_id:{
        in:['body',"params"],
        isString:true,
        isEmpty:false,
        errorMessage:'card_id item must not be left empty'

    },

});
const getCartProductsByUserIdSchema=checkSchema({

    user_id:{
        in:['body',"params"],
        isString:true,
        isEmpty:false,
        errorMessage:'_user_id item must not be left empty'


    },
});
const updateCartSchema=checkSchema({
    items:{
        in:['body'],
        isArray:true,
        isEmpty:false,
        errorMessage:'Must be items and must not be left empty ex:items[(quantity:900001,' +
            'id: 7929' +
            'properties: { '+
            'First name:Joe' +
            '})] or create your own'


    },

    cart_id:{
        in:['body',"params"],
        isString:true,
        isEmpty:false,
        errorMessage:'_user_id item must not be left empty'


    },


});


module.exports={
    createCartSchema,
    getCartSchema,
    validationResult,
    updateCartSchema,
    getCartProductsByUserIdSchema,
    getCartByIdSchema
};
