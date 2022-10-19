require("dotenv").config();
const express = require("express");

//Security Packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

const connectDB = require("./db/connect");
const passwordRouter = require("./routes/password-route");
const authRouter = require("./routes/auth-route");
const workoutRouter = require("./routes/workout-route");
const authenticate = require("./middleware/authentication");
const stripeRouter = require("./routes/stripe-route");
const { SERVER_PORT } = process.env;

const app = express();


app.set('trust proxy, 1')
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);
app.use(express.json());
app.use(express.static("public"));
app.use(helmet());
app.use(cors());
app.use(xss());

app.use("/api/v1/password", passwordRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/workouts", authenticate, workoutRouter);
app.use("/api/v1/create-checkout-session", stripeRouter);

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
