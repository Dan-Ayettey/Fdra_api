//instances

const mongoose=require('mongoose');
const Schema=mongoose.Schema;
// card payment schema


const productModelSchema=new Schema({
    product:{
        type:Array,
        required:[true, 'Product is required'],
    },
    _customer_id:{
        type:String,
        required:[true, 'customer id is required'],
    }
});


const ChargeModelSchema=new Schema({
    charges:{
        type:Array,
        required:[true, 'Product is required'],
    },
    _customer_id:{
        type:String,
        required:[true, 'customer id is required'],
    }
})
const  planModelSchema=new Schema({

    plan:{
        type:Array,
        required:[true, 'Plan is required'],
    },
    _customer_id:{
        type:String,
        required:[true, 'customer id is required'],
    }

});
const  subscriptionPlanSchema=new Schema({
    subscriptionPlan:{
        type:Array,
        required:[true, 'Subscription plan nick name is required'],
    },
    _customer_id:{
        type:String,
        required:[true, 'customer id is required'],
    }

});
   const CustomerModelSchema=new Schema({
       _user_id:{
           type:String,
           unique:true,
           exists:true,
           isEmpty:false,
           required:[true, 'customer id is required'],

       },
       email:{
           type:String,
           unique:true,
           exists:true,
           isEmail:true,
           isEmpty:false,
           required:[true, 'customer id is required'],

       },
       telephoneNumber:{
           type:Number,
           unique:true,
           exists:true,
           required:[true, 'customer id is required'],

       },
    customer:{
        type:Array,
        required:[true, 'Plan is required'],
    },

});
   const balanceModelSchema=new Schema({
    balance:{
        type:Array,
        required:[true, 'Plan is required'],
    },
    _customer_id:{
        type:String,
        required:[true, 'customer id is required'],
    },

})
/*
const cardPaymentSchema=new Schema({
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
         type:Array
    },
    currency:{
        types:String,
        isCurrency:true

    },
    description:{
      type:String
    },
    paymentMethodtypes:{
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
const invoicingSchema=new Schema({
    _token: {
        type: String,
    },

    intent: {
        type: String,
    },
    purchase_units: {
        type: [],
        required: [true, 'purchase_units amount is required']
    },

    returnURL: {
        type: String
    },
    country: {
        types: String
    },
    statementDescriptor: {
        type: String
    },
    customer_id: {
        type: String,
        required: [true, 'Customer is required']
    },

    payer: {
        type:Object,
        },
transactions: {
  type:Array,
  required:[true, 'Transactions is required']
},
    note_to_payer: {
        type:String
    },
    redirect_urls: {
        type:Object
    }
});
*/


//module
//const stripeBillingChargeModel=model('Charge',stripeSchema.chargeModelSchema);
const stripeChargeModel=mongoose.model('Charge',ChargeModelSchema);
const stripeCustomerModel=mongoose.model('Customer',CustomerModelSchema);
module.exports={
stripeCustomerModel,
    stripeChargeModel,

};

