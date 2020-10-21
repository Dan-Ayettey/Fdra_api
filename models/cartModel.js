//instances
const mongoose=require('mongoose');

//cart schema
const cartSchema=new mongoose.Schema({
  customer_id:{
      type:String,
      required:[true, 'customer id is required']
  },
    intent: {
        type:String,
    },
    cardType: {
        type:String,
    },
    productName:{
        type:String,
        required:[true, 'Product name is required']
    },
    product_sn:{
        type:String
    },
    productDescription:{
        type:[]
    },
    purchase_units:{
        type:[]
    },
    withAmount:{
        type:Number,
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


});

//modules
const productModel=mongoose.model('Product',cartSchema);
module.exports={
    productModel
}
