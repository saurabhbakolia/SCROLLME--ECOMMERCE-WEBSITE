"use strict";

const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Define routes
router.post("/register", userController.register);
router.post("/sign_in", userController.sign_in);
router.get("/user_profile", userController.profile);
router.post("/logout", userController.logOut);

module.exports = router;
