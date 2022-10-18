require("dotenv").config();
const express = require("express");
var cors = require("cors");

const connectDB = require("./db/connect");
const passwordRouter = require("./routes/password-route");
const authRouter = require("./routes/auth-route");
const workoutRouter = require("./routes/workout-route");
const authenticate = require("./middleware/authentication");
const stripeRouter = require("./routes/stripe-route");
const { SERVER_PORT, CLIENT_URL } = process.env;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/v1/password", passwordRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/workouts", authenticate, workoutRouter);
app.use("/api/v1/create-checkout-session", stripeRouter);
// const stripe = require('stripe')('sk_test_51HwaqHDNjLMWEToxYdHx96txk4GikzTb6pu5OloetDXxFFAon8hfE6AqfNf6ziBqw38ecpdoWDCxhbRGN6Iv52oQ001ZTWGHtx');
// app.use(express.static('public'));


// app.post('/api/v1/create-checkout-session', async (req, res) => {
//   const session = await stripe.checkout.sessions.create({
//     line_items: [
//       {
//         // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
//         price: 'price_1Lu3khDNjLMWETox2AL12YH6',
//         quantity: 1,
//       },
//     ],
//     mode: 'payment',
//     success_url: `${CLIENT_URL}?success=true`,
//     cancel_url: `${CLIENT_URL}?canceled=true`,
//   });

//   res.redirect(303, session.url);
// });

const port = SERVER_PORT || 5555;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
