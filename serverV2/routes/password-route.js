const express = require("express");
const router = express.Router();

const {resetPassword, forgotPassword} = require("../controllers/passwordController");

router.route('/').post(forgotPassword)

router.route('/:token').patch(resetPassword)


module.exports = router