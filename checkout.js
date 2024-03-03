import {loadStripe} from '@stripe/stripe-js';

// const stripe = await loadStripe('pk_live_51JSMZFB4WfHejuVbYqRKkUjqu70QfvUb0NSYtc5M8tcDeiO9ae8An7ScPrufXBpXHwjflAe3NDJPARvaNxkJpic800uNzO6nEx');

// var elements = stripe.elements({
//     clientSecret: 'CLIENT_SECRET',
//   });

// var elements = stripe.elements({
// mode: 'payment',
// currency: 'usd',
// amount: 1099,
// });

// var paymentElement = elements.create('payment');
  

// const checkout = await stripe.initEmbeddedCheckout({
//     clientSecret: 'CLIENT_SECRET',
//   });

// document.getElementById("checkout").addEventListener("Click", function(){
//     checkout.mount('#checkout');
// })


// Assume you have Stripe initialized and your card element mounted as before
var stripe = stripe('pk_test_51JSMZFB4WfHejuVb9NstRUCRoFSPPvJGoBa0RvweJ14Bm4to4bArZS1MfGjaDAW40wAEiNoCuRUXm2t0MIU5RXuH00RCG5Fjx1');

  // Create an instance of Elements
  var elements = stripe.elements();

  // Custom styling can be passed to options when creating an Element
  var style = {
    base: {
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4'
      }
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a'
    }
  };

  // Create an instance of the card Element and mount it to the "card-element" div
  var card = elements.create('card', { style: style });
  card.mount('#card-element');

  // Handle real-time validation errors from the card Element
  card.on('change', function(event) {
    var displayError = document.getElementById('card-errors');
    if (event.error) {
      displayError.textContent = event.error.message;
    } else {
      displayError.textContent = '';
    }
  });

  // Handle form submission
  var form = document.getElementById('payment-form');
  form.addEventListener('submit', function(event) {
    event.preventDefault();

    stripe.createToken(card).then(function(result) {
      if (result.error) {
        // Inform the user if there was an error
        var errorElement = document.getElementById('card-errors');
        errorElement.textContent = result.error.message;
      } else {
        // Send the token to your server
        stripeTokenHandler(result.token);
      }
    });
  });

  function stripeTokenHandler(token) {
    // Insert the token ID into the form so it gets submitted to the server
    var form = document.getElementById('payment-form');
    var hiddenInput = document.createElement('input');
    hiddenInput.setAttribute('type', 'hidden');
    hiddenInput.setAttribute('name', 'stripeToken');
    hiddenInput.setAttribute('value', token.id);
    form.appendChild(hiddenInput);

    // Submit the form
    form.submit();
  }

// Example function to fetch the client secret from the server
function fetchClientSecret() {
    // Example: Sending a POST request to your server to create a payment intent
    return fetch('/create-payment-intent', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        // Include any other necessary data in the body, such as the payment amount or currency
        body: JSON.stringify({amount: 1000}) // Example amount in smallest currency unit, e.g., cents
    }).then(function(response) {
        return response.json();
    }).then(function(responseJson) {
        return responseJson.clientSecret;
    });
}

// Example submission handler for your form
var form = document.getElementById('payment-form');
form.addEventListener('submit', function(event) {
    event.preventDefault();

    fetchClientSecret().then(function(clientSecret) {
        // Now that we have the client secret, we can confirm the payment
        stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                // Optionally, include additional payment method details
            }
        }).then(function(result) {
            if (result.error) {
                // Show error to your customer
                console.error(result.error.message);
            } else {
                // The payment succeeded!
                console.log('Payment successful!');
                // You can redirect the user or show a success message
            }
        });
    });
});