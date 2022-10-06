const jwt = require("jsonwebtoken");
const {StatusCodes} = require('http-status-codes')

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  console.log(authHeader)

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    console.log("Authentication Invalid");
  }
  const token = authHeader.split(" ")[1];
  // console.log(token)

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(payload)

    req.user = { userId: payload.userId };

    next();
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED)
    throw new Error("Authentication Invalid line 20");
  }
};

module.exports = auth;