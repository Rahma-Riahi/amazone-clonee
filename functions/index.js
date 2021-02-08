const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')('sk_test_51IGNabKavGvweDqw4WbdV4BwcrzojoJlkalfGRyrOVf2tltViZU73uymIXw5gjTZMxgTlyWqwS3o9jQDoKYRFROP00RwSnXAY7');


//API

//App config
const app= express();
//middelware
app.use(cors({origin:true}));
app.use(express.json());
//-API routes
app.get('/', (request, response)=>response.status(200).send('hello World'));
app.post('/payments/create', async(req,res)=>{
    const total= req.query.total;
    console.log('PAyment Request', total);
    const paymentIntent = await stripe.paymentIntents.create({
        amount : total, // subunit of the currency,
        currency: 'usd'
    });
    console.log('payment intent',paymentIntent)
    res.status(201).send({
        clientSecret: paymentIntent.client_secret
    })
})
//-Listen command
exports.api = functions.https.onRequest(app);