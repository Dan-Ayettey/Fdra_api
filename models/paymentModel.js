//instances
const mongoose=require('mongoose');

// card payment schema
const cardPaymentSchema=new mongoose.Schema({
     intent: {
         type:String,
     },
    purchase_units:{
         type:[]
    },
    withAmount:{
         type:Number,
         required:[true, 'With amount is required']
    },
    returnURL:{
         type:String
    },
    country:{
         types:String
    },
    statementDescriptor:{
       type:String
    },
    customer_id:{
        type:String,
        required:[true, 'Customer is required']
    },
    nameOnTheCard:{
        type:String,
        required:[true, 'Own name is required']
    },
    cardNumber:{
        type:Number,
        required:[true, 'Card Number is required']
    },
    expiringMonth:{
        type:Number,
        required:[true, 'Expiring month is required']
    },
    expiringYear:{
        type:Number,
        required:[true, 'Expiring year is required']
    },
    cvc:{
        type:Number,
        required:[true, 'Cv is required']
    }


});


//module
const cardPaymentModel=mongoose.model('cardPayment',cardPaymentSchema);

module.exports={
    cardPaymentModel,
}

