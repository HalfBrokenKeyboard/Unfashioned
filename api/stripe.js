const { log } = require('@angular-devkit/build-angular/src/builders/ssr-dev-server');
const Stripe = require('stripe');
const stripe = Stripe(process.env.StripeTestKey);
// ... (other imports)

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    try {
      // Guard clause to check if cart is present and is an array
      // if (!req.body || !req.body.cart || !Array.isArray(req.body.cart)) {
      //   res.status(400).json({ error: 'Invalid request payload' });
      //   return;
      // }

      const { cart } = req.body;      
      const lineItems = cart?.map((product) => ({
        price_data: {
          currency: product.currency,
          unit_amount: parseInt(product.retail_price * 100),
          product_data: {
            name: product.name,
            images: [product.files[1].preview_url],
          },
        },
        quantity: 1,
      }));

      const session = await stripe.checkout.sessions.create({
        ui_mode: 'embedded',
        mode: 'payment',
        return_url: 'http://localhost:3000//checkout/confirm',
        automatic_tax: { enabled: true },
        line_items: lineItems,
        shipping_address_collection: {
          allowed_countries: ['AC', 'AD', 'AE', 'AG', 'AI', 'AL', 'AM', 'AO', 'AQ', 'AR', 'AT', 'AU', 'AW', 'AX', 'AZ', 'BA', 'BB', 'BD', 'BE', 'BF', 'BG', 'BH', 'BI', 'BJ', 'BL', 'BM', 'BN', 'BO', 'BQ', 'BR', 'BS', 'BT', 'BV', 'BW', 'CA', 'CD', 'CF', 'CG', 'CH', 'CI', 'CK', 'CL', 'CM', 'CN', 'CO', 'CR', 'CV', 'CW', 'CY', 'CZ', 'DE', 'DJ', 'DK', 'DM', 'DO', 'DZ', 'EC', 'EE', 'EG', 'EH', 'ER', 'ES', 'ET', 'FI', 'FJ', 'FK', 'FO', 'FR', 'GA', 'GB', 'GD', 'GE', 'GF', 'GG', 'GH', 'GI', 'GL', 'GM', 'GN', 'GP', 'GQ', 'GS', 'GT', 'GU', 'GW', 'GY', 'HK', 'HN', 'HR', 'HT', 'HU', 'ID', 'IE', 'IM', 'IN', 'IO', 'IQ', 'IS', 'JE', 'JM', 'JO', 'JP', 'KE', 'KG', 'KH', 'KI', 'KM', 'KN', 'KR', 'KW', 'KY', 'KZ', 'LB', 'LC', 'LI', 'LK', 'LR', 'LS', 'LT', 'LU', 'LV', 'LY', 'MA', 'MC', 'MD', 'ME', 'MF', 'MG', 'MK', 'ML', 'MN', 'MQ', 'MR', 'MS', 'MT', 'MU', 'MV', 'MW', 'MY', 'MZ', 'NA', 'NC', 'NE', 'NG', 'NI', 'NL', 'NO', 'NP', 'NR', 'NZ', 'OM', 'PA', 'PE', 'PF', 'PG', 'PH', 'PK', 'PL', 'PM', 'PN', 'PR', 'PS', 'PT', 'PY', 'QA', 'RE', 'RO', 'RS', 'RW', 'SA', 'SB', 'SC', 'SE', 'SG', 'SH', 'SI', 'SJ', 'SK', 'SL', 'SM', 'SN', 'SO', 'SR', 'SS', 'ST', 'SV', 'SX', 'SZ', 'TA', 'TC', 'TD', 'TF', 'TG', 'TH', 'TJ', 'TK', 'TL', 'TM', 'TN', 'TO', 'TR', 'TT', 'TV', 'TW', 'TZ', 'UG', 'US', 'UY', 'UZ', 'VA', 'VC', 'VE', 'VG', 'VN', 'VU', 'WF', 'WS', 'XK', 'YT', 'ZA', 'ZM', 'ZW', 'ZZ']
        },
    });

      res.status(200).json({ clientSecret: session.client_secret });
    } catch (error) {
      // Set a default status code in case error.statusCode is undefined
      const statusCode = error.statusCode || 500;

      res.status(statusCode).json({ statusCode, message: error.message || 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }

  if (req.method === 'GET') {
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

    res.send({
      status: session.status,
      customer_email: session.customer_details.email,
    });
  }
};
