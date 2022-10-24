const { StatusCodes } = require("http-status-codes");
const nodemailer = require("nodemailer");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { EMAIL, PASSWORD, CLIENT_URL } = process.env;

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const userEmail = await User.findOne({ email });


  if (!userEmail) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ err: `Account with email: ${email} does not exist` });
  }

  const token = jwt.sign(
    { _id: userEmail._id },
    process.env.RESET_PASSWORD_KEY,
    { expiresIn: "20m" }
  );

  await userEmail.updateOne({ resetLink: token });

  try {
    let transporter = nodemailer.createTransport({
      service: "Yahoo",
      auth: {
        user: EMAIL,
        pass: PASSWORD,
      },
    });

    let link = `${CLIENT_URL}/reset-Password/${token}`;

    let info = transporter.sendMail(
      {
        from: EMAIL, //This will show up when you go into the email
        to: `<${email}>`,
        subject: "Muscle Memory Password Reset", //This will show on the subject of the email
        html: `<h2>Please click the link to reset your password</h2>
                <p>
                <a href=${link}>Reset Password</a>
                </p>`,
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

  res.status(StatusCodes.OK).json({ token: token });
};

const resetPassword = async (req, res) => {
  const {token} = req.params
  const { newPassword } = req.body;


  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).send("Unauthorized");
  }
  jwt.verify(token, process.env.RESET_PASSWORD_KEY, (err, decodedData) => {
    if (err) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: "Incorrect or expired Token" });
    }
  });

  const user = await User.findOne({ token });
  if (!user) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ err: `Account does not exist` });
  }

  console.log(user);

  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(newPassword, salt);

  await user.updateOne({ password: password });

  res.status(StatusCodes.OK).send("Password Reset");
};

module.exports = { resetPassword, forgotPassword };
