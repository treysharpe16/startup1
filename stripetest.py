from flask import Flask, request, jsonify
import stripe

from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Replace this with your actual secret key
stripe.api_key = 'sk_test_51JSMZFB4WfHejuVb2gtNI5CmetWQafnH0c2WN4kRVwNTSjwLfT0OagkfDd3hOWopid1tNjFu9HVGUlRW3rADCsra00UEb44lBl'

@app.route('http://localhost:8000/submit-payment', methods=['POST'])
def submit_payment():
    data = request.json
    token = data.get('stripeToken')

    # Logic to create and complete payment using Stripe
    try:
        charge = stripe.Charge.create(
            amount=1000,  # Amount in cents
            currency='usd',
            source=token,  # Use the token provided by the client
            description='Charge for some goods.',
        )
        return jsonify({'status': 'success', 'charge': charge})
    except stripe.error.StripeError as e:
        return jsonify({'status': 'error', 'message': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
