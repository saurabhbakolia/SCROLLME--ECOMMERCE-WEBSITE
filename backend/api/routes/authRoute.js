const express = require("express");
const router = express.Router();
const {
  register,
  login,
  refreshToken,
  checkAuthStatus,
} = require("../controllers/authController");
const verifyRefreshToken = require("../utils/verifyRefreshToken");

router.post("/user/register", register);
router.post("/user/sign_in", login);
router.post("/refresh-token", verifyRefreshToken, refreshToken);
router.get("/check", checkAuthStatus);
module.exports = router;
