const { StatusCodes } = require("http-status-codes");
const { CLIENT_URL } = process.env;

const stripe = require("stripe")(
  "sk_test_51HwaqHDNjLMWEToxYdHx96txk4GikzTb6pu5OloetDXxFFAon8hfE6AqfNf6ziBqw38ecpdoWDCxhbRGN6Iv52oQ001ZTWGHtx"
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
