const express = require("express");
const router = express.Router();

const {resetPassword, forgotPassword} = require("../controllers/passwordController");

router.post('/forgotPassword', forgotPassword)

router.route('/resetPassword/:token').patch(resetPassword)


module.exports = router