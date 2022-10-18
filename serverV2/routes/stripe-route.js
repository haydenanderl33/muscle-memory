const express = require('express')
const router = express.Router();

const payment = require('../controllers/stripeController')

router.route('/').post(payment)

module.exports = router;
