'use strict';

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Define routes
router.get('/check', authController.checkAuthStatus);

module.exports = router;