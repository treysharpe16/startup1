import {loadStripe} from '@stripe/stripe-js';

const stripe = await loadStripe('pk_live_51JSMZFB4WfHejuVbYqRKkUjqu70QfvUb0NSYtc5M8tcDeiO9ae8An7ScPrufXBpXHwjflAe3NDJPARvaNxkJpic800uNzO6nEx');

var elements = stripe.elements({
    clientSecret: 'CLIENT_SECRET',
  });

var elements = stripe.elements({
mode: 'payment',
currency: 'usd',
amount: 1099,
});

var paymentElement = elements.create('payment');
  

const checkout = await stripe.initEmbeddedCheckout({
    clientSecret: 'CLIENT_SECRET',
  });

document.getElementById("checkout").addEventListener("Click", function(){
    checkout.mount('#checkout');
})