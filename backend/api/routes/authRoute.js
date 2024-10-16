const express = require('express');
const router = express.Router();
const {
  register,
  login,
  logOut,
  refreshToken,
} = require('../controllers/authController');
const verifyRefreshToken = require('../utils/verifyRefreshToken');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logOut)
router.post('/refresh-token', verifyRefreshToken, refreshToken);

module.exports = router;
