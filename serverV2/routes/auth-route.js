const express = require("express");
const router = express.Router();

const {test, register, login, logout}  = require("../controllers/authController");

router.get("/test", test);
router.post("/register", register).post('/login',login).post('/logout', logout)


module.exports = router;