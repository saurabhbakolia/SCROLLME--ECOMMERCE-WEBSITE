'use strict';

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Define routes
router.post("/register", userController.register);
router.post("/sign_in", userController.sign_in);
router.get("/user_profile", userController.profile);
router.get("/logout", userController.logOut);


module.exports = router;
