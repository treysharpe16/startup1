from flask import Flask, request, jsonify, abort
import stripe

from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Your Flask app routes


# Initialize Flask app
app = Flask(__name__)

# Stripe API key setup
stripe.api_key = 'sk_test_51JSMZFB4WfHejuVb2gtNI5CmetWQafnH0c2WN4kRVwNTSjwLfT0OagkfDd3hOWopid1tNjFu9HVGUlRW3rADCsra00UEb44lBl'

# Endpoint for creating a payment intent
@app.route('/create-payment-intent', methods=['POST'])
def create_payment_intent():
    try:
        data = request.json
        # Create a PaymentIntent with the order amount and currency
        payment_intent = stripe.PaymentIntent.create(
            amount=data['amount'],  # Amount is expected to be in cents
            currency='usd',
            metadata={'integration_check': 'accept_a_payment'},
        )
        return jsonify({
            'clientSecret': payment_intent.client_secret
        })
    except Exception as e:
        return jsonify(error=str(e)), 400

# Endpoint for handling Stripe webhooks
@app.route('/webhook', methods=['POST'])
def stripe_webhook():
    payload = request.data
    sig_header = request.headers.get('Stripe-Signature')
    endpoint_secret = 'your_webhook_secret'

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, endpoint_secret
        )
    except ValueError as e:
        # Invalid payload
        return 'Invalid payload', 400
    except stripe.error.SignatureVerificationError as e:
        # Invalid signature
        return 'Invalid signature', 400

    # Handle the event
    if event['type'] == 'payment_intent.succeeded':
        payment_intent = event['data']['object']  # contains a stripe.PaymentIntent
        # Perform actions after the payment is successfully completed
        print('PaymentIntent was successful!')
    # ... handle other event types
    else:
        print('Unhandled event type {}'.format(event['type']))

    return 'Success', 200

if __name__ == '__main__':
    app.run(port=4242)  # Run the server on a specific port
