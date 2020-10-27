//dependencies
const bodyParser=require('body-parser');
const express=require('express');
const app=express();
const stripe_key = "sk_test_4eC39HqLyjWDarjtT1zdp7dc"
const stripe = require('stripe')(stripe_key);
 const newCustomer =async function(req, res) {
    var body = req.body
    await stripe.customers.create(
        { email: body.email }
    ).then((customer) => {
        console.log(customer)
        // Send customerId -> Save this for later use
        res.status(200).json(customer.id)
    }).catch((err) => {
        console.log('error while creating new customer account' + err)
        res.status(400).send(JSON.stringify({ success: false, error: err }))
    });
};

// Express
const StripeEphemeralKeys = function(req, res) {
    const stripe_version = req.body.api_version="2015-10-12";
    const customerId = req.body.customerId="cus_IFAkaVkWLCKySG"
    if (!stripe_version) {
        console.log('I did not see any api version')
        res.status(400).end()
        return;
    }

    stripe.ephemeralKeys.create(
        {customer: customerId},
        {stripe_version: stripe_version}
    ).then((key) => {
        console.log("Ephemeral key: " + key)
        res.status(200).json(key)
    }).catch((err) => {
        console.log('stripe version is ' + stripe_version + " and customer id is " + customerId + " for key: " + stripe_key + " and err is " + err.message )
        res.status(500).json(err)
    });
};
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.post('/strip/new',newCustomer);
app.post('/strip/key',StripeEphemeralKeys);
app.get('/',(res,req)=>req.status(200).json(res.body));
app.listen(7070,()=>{
   console.log('Listening: 1000');
});
