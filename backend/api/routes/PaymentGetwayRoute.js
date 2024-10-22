const express = require('express');
const router = express.Router();
const paymentGetway = require('../controllers/paymentGetway');

router.post('/pay', paymentGetway);

module.exports = router;  // Correct export
