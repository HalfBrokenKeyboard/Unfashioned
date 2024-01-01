// This is your test secret API key.
const { apiUrl } = require('src/environments/environment');
const stripe = require('stripe')(process.env.StripeAPIKey);

module.exports = async (req, res) => {
    try {
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price: '{{PRICE_ID}}',
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${apiUrl}/succes`,
        cancel_url: `${apiUrl}/failed`,
        automatic_tax: { enabled: true },
      });
  
      res.status(303).json({ url: session.url });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };