const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const nodemailer = require("nodemailer");
const { EMAIL, PASSWORD } = process.env;

const test = (req, res) => {
  res.status(StatusCodes.OK).send("<h1>Hello there ya whore!</h1>");
};

const register = async (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json("Please provide email, username, and password");
  }

  const user = await User.create({ ...req.body });
  const token = user.createJWT();

  try {
    let transporter = nodemailer.createTransport({
      service: "Yahoo",
      auth: {
        user: EMAIL,
        pass: PASSWORD,
      },
    });

    let info = transporter.sendMail(
      {
        from: EMAIL,
        to: `<${email}>`,
        subject: "Welcome to Muscle Memory", //This will show on the subject of the email
        text: "Thanks for signing up for Muscle Memory", //for clients with plaintext support only
      },
      (err, res) => {
        if (err) {
          console.log("err", err);
        } else {
          console.log("res", res);
          res.status(200).send(info);
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }

  res.status(StatusCodes.CREATED).json({ user: { email: user.email }, token });
  console.log(`Registration for ${user.email} successful.`);
};

const login = async (req, res) => {
  const { email, password } = req.body;

  //  return console.log(req)

  if (!email || !password) {
    res.status(StatusCodes.NOT_FOUND).json("Please provide email and password");
  }
  const userEmail = await User.findOne({ email });

  if (!userEmail) {
   return res.status(StatusCodes.NOT_FOUND).json("Invalid Credentials, Email");
  }
  const isPasswordCorrect = await userEmail.comparePassword(password);
  if (!isPasswordCorrect) {
    return res.status(StatusCodes.NOT_FOUND).json("Invalid Credentials, Password");
  }
  const token = userEmail.createJWT();
  // console.log(token)
  res
    .status(StatusCodes.OK)
    .json({
      user: { email: userEmail.email, username: userEmail.username },
      token,
    });
  console.log(`Login for ${email} successful.`);
};

const logout = async (req, res) => {
  const { email } = req.body;

  const userEmail = await User.findOne({ email });

  const tokenReset = await userEmail.destroyJWT();

  res.status(StatusCodes.OK).json({ tokenReset });

  console.log(`Logout for ${email} successful.`);
};

module.exports = { test, register, login, logout };
