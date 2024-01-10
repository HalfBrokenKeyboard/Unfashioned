const Stripe = require('stripe');
const stripe = Stripe(process.env.StripeTestKey);

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        try {
          const session = await stripe.checkout.sessions.create({
            // Your Checkout Session configuration
            mode: 'payment',
            success_url:`http://localhost:3000/checkout`,
            cancel_url:`http://localhost:3000/failed`,
            automatic_tax: {enabled: true},
            line_items: [
                {
                    price: 'price_1OToXqCQhkYR2Pl3V5uI6F5i',
                    quantity: 3,
                },
            ],
          });
    
          res.status(200).json({ url: session.url });
        } catch (error) {
          res.status(error.statusCode).json({ statusCode: error.statusCode, message: error.message });
        }
      } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
      }
}