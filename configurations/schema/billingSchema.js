const {checkSchema,validationResult}=require('express-validator');
const cardPaymentSchema=checkSchema({
    intent: {
        isString:true,
    },
    purchase_units:{
        isArray:true
    },
    withAmount:{
        isDecimal:Number,
        isEmpty:false,
        errorMessage: 'With amount is required',

    },
    returnURL:{
        isArray:true
    },
    country:{
        isString:true
    },
    statementDescriptor:{
        isString:true
    },
    customer_id:{
        isString:true,
        isEmpty:false,
        errorMessage:'Customer is required'
    },
    nameOnTheCard:{
        isString:true,
        errorMessage:'Own name is required'
    },
    cardNumber:{
        isNumeric:true,
        errorMessage:'Card Number is required'
    },
    expiringMonth:{
        isNumeric:true,
        errorMessage:'Expiring month is required'
    },
    expiringYear:{
        isNumeric:true,
        errorMessage:'Expiring year is required'
    },
    cvc:{
        isNumeric:true,
        errorMessage:'Cv is required'
    }


});
const invoicingSchema=checkSchema({
    _token: {
        isHash: true,
        errorMessage:'purchase_units amount is required'
    },
    intent: {
        isString:true,
    },
    purchase_units: {
        isArray: true,
        exists:true,
        errorMessage: 'purchase_units amount is required'
    },

    returnURL: {
        isString: String
    },
    country: {
        isString: String
    },
    statementDescriptor: {
        isString: String
    },
    customer_id: {
        isString:true,
        exists:true,
        isEmpty:false,
        errorMessage:'Customer is required'
    },

    payer: {
        isArray:true,
        isEmpty:false,
        exists:true
    },
    transactions: {
        isArray:true,
        isEmpty:false,
        errorMessage: 'Transactions is required'
    },
    note_to_payer: {
        isString:true
    },
    redirect_urls: {
        isArray:true
    }
});

const creatCustomerSchema=checkSchema({
    user_id:{
        in:["params","body"],
        isString:true,
        isEmpty:false,
        exists:true,
        errorMessage:'User id is needed'
    },
    email:{
        in:["params","body"],
        isString:true,
        isEmpty:false,
        exists:true,
        errorMessage:'Email is needed'
    },
    telephoneNumber:{
        in:["params","body"],
        isString:true,
        exists:true,
        errorMessage:'telephone number is needed'
    }
});

module.exports={
  validationResult,
    creatCustomerSchema
};
