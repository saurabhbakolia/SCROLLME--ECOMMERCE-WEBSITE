const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Define routes
router.get('/status', authController.checkAuthStatus);

module.exports = router;
