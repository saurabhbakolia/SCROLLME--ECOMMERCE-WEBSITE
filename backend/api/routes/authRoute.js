const express = require("express");
const router = express.Router();
const {
	register,
	login,
	refreshToken,
} = require("../controllers/authController");
const verifyRefreshToken = require("../utils/verifyRefreshToken");
const {forgot}=require('../controllers/userController')

router.post("/register", register);
router.post("/login", login);
router.post("/refresh-token", verifyRefreshToken, refreshToken);
router.put('/updatepass',forgot)

module.exports = router;
