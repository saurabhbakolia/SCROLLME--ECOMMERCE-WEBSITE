'use strict';

const express = require('express');
const router = express.Router();
const refreshTokenController = require('../controllers/refreshTokenController');

// Define routes
router.post('/', refreshTokenController.newAccessToken);

module.exports = router;