

const {stripeChargeModel}=require('../models/billingModel');
const {validationResult} = require("../configurations/schema/billingSchema");
require('dotenv').config();
const stripe = require('stripe')(process.env['STRIPE_KEY']);
//Payment Constructs

const getKeys=async function (request,response,next) {
  const  errors= validationResult(request);
   request.body.customer_id=request.body.customer_id ? request.params.id:request.body.customer_id;
    if(errors.isEmpty()){
        try{
        const keys= cardPaymentModel.create(request.body);
        if(keys){
                response.status(201).json({
                    keys,
                    isCreated: true,
                });
            }else {
                response.status(401).json({msg: 'Key can not be created',isCreated:false});
        }
        }catch (e) {
            next(e.message);
            throw  new Error(e);
        }



    }
};
const getWebHooks=async function (request,response,next) {
    const  errors= validationResult(request);
    request.body.customer_id=request.body.customer_id ? request.params.id:request.body.customer_id;
    if(errors.isEmpty()){
        try{
            const keys= cardPaymentModel.create(request.body);
            if(keys){
                response.status(201).json({
                    keys,
                    isCreated: true,
                });
            }else {
                response.status(401).json({msg: 'Key can not be created',isCreated:false});
            }
        }catch (e) {
            next(e.message);
            throw  new Error(e);
        }



    }
};
const createProductByCustomerId=async function (request,response,next) {
    const  errors= validationResult(request);
    request.body.customer_id=request.body.customer_id ? request.params.id:request.body.customer_id;
    if(errors.isEmpty()){
        try{
            const keys= cardPaymentModel.create(request.body);
            if(keys){
                response.status(201).json({
                    keys,
                    isCreated: true,
                });
            }else {
                response.status(401).json({msg: 'Key can not be created',isCreated:false});
            }
        }catch (e) {
            next(e.message);
            throw  new Error(e);
        }



    }
};
const createPlanByCustomerId=async function (request,response,next) {
    const  errors= validationResult(request);
    request.body.customer_id=request.body.customer_id ? request.params.id:request.body.customer_id;
    if(errors.isEmpty()){
        try{
            const keys= cardPaymentModel.create(request.body);
            if(keys){
                response.status(201).json({
                    keys,
                    isCreated: true,
                });
            }else {
                response.status(401).json({msg: 'Key can not be created',isCreated:false});
            }
        }catch (e) {
            next(e.message);
            throw  new Error(e);
        }



    }
};


const subscribeToACustomerPlan=async function (request,response,next) {
    const  errors= validationResult(request);
    request.body.customer_id=request.body.customer_id ? request.params.id:request.body.customer_id;
    if(errors.isEmpty()){
        try{
            const keys= cardPaymentModel.create(request.body);
            if(keys){
                response.status(201).json({
                    keys,
                    isCreated: true,
                });
            }else {
                response.status(401).json({msg: 'Key can not be created',isCreated:false});
            }
        }catch (e) {
            next(e.message);
            throw  new Error(e);
        }



    }
};
const confirmPaymentIntent=async function (request,response,next) {
    const  errors= validationResult(request);
    request.body.customer_id=request.body.customer_id ? request.params.id:request.body.customer_id;
    if(errors.isEmpty()){
        try{
            const keys= cardPaymentModel.create(request.body);
            if(keys){
                response.status(201).json({
                    keys,
                    isCreated: true,
                });
            }else {
                response.status(401).json({msg: 'Key can not be created',isCreated:false});
            }
        }catch (e) {
            next(e.message);
            throw  new Error(e);
        }



    }
};
const createChargeIntent=async function (request,response,next) {
    const  errors= validationResult(request);
    const  {email,telephoneNumber}=request.body;
    request.body.customer_id=request.body.customer_id ? request.params.id:request.body.customer_id;
    if(errors.isEmpty()){
        try{

            const find=await userModel.findOne(({email}) || ({telephoneNumber}));
            if(!find){
                request.body.charges=await stripe.charges.create(
                    request.body
                ).then((customer) => {
                    return customer;
                }).then((customer) => {
                    return customer;
                }).catch((err) => {
                    throw new Error(err);
                });
                const client=createStripeChargeIntent.create(request.body);
                if(client){
                    response.status(201).json({
                        client,
                        isCreated: true,
                    });
                }else {
                    response.status(401).json({msg: 'Key can not be created',isCreated:false});
                }
            }

        }catch (e) {
            next(e.message);
            throw  new Error(e);
        }
    }
};

module.exports={
    createChargeIntent,

};
