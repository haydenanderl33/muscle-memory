const { StatusCodes } = require("http-status-codes");
const { CLIENT_URL, SECRET_KEY } = process.env;

const stripe = require("stripe")(
  SECRET_KEY
);


const payment = async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: "price_1Lu3khDNjLMWETox2AL12YH6",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${CLIENT_URL}?success=true`,
    cancel_url: `${CLIENT_URL}/goals`,
  });

  res.redirect(303, session.url);
  // res.send('Stripe Payment')
};

module.exports = payment;
