const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { z } = require('zod');

exports.register = async (req, res) => {
  const requiredBody = z.object({
    username: z
      .string()
      .min(3, 'username is too small')
      .max(30, 'username is too big'),
    password: z
      .string()
      .min(6, 'password must be atleast 12 characters long')
      .max(64, 'password is too long')
      .regex(/[A-Z]/, 'password must contain atleast one uppercase character.')
      .regex(/[a-z]/, 'password must contain atleast one lowercase character.')
      .regex(/[0-9]/, 'password must contain atleast one numeric character.')
      .regex(
        /[\W_]/,
        'password must contain atleast one special character (e.g., ! @ # $ % ^ & *).'
      ),
  });

  const parsedBody = requiredBody.safeParse(req.body);
  if (!parsedBody.success) return res.status(400).json(parsedBody.error.errors);

  try {
    const { firstName, lastName, username, email, password } = req.body;

    // Check if user with the same email or username exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser)
      return res
        .status(400)
        .send('User with the same email or username already exists');

    const user = new User({ firstName, lastName, username, email, password });
    await user.save();

    const accessToken = user.generateAuthToken();
    const refreshToken = user.generateRefreshToken();

    // Set cookies
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Only use 'secure' in production
      sameSite: 'Strict',
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Only use 'secure' in production
      sameSite: 'Strict',
    });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);

    if (error.code && error.code === 11000) {
      // MongoDB duplicate key error
      const field = Object.keys(error.keyPattern)[0];
      return res
        .status(400)
        .json({ message: `An account with that ${field} already exists.` });
    }

    // General server error
    res
      .status(500)
      .json({ message: 'Internal server error', error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(400).send('Invalid username or password');

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).send('Invalid username or password');

    const accessToken = user.generateAuthToken();
    const refreshToken = user.generateRefreshToken();

    // Set cookies
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
    });

    res.status(200).json({ message: 'Logged in successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
};

exports.refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(401).send('No refresh token provided');

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) return res.status(401).send('Invalid refresh token');

    // Generate new tokens
    const accessToken = user.generateAuthToken();
    const newRefreshToken = user.generateRefreshToken();

    // Set new cookies
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
    });
    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
    });

    res.status(200).json({ message: 'Tokens refreshed' });
  } catch (error) {
    console.error('Refresh token error:', error);
    res
      .status(500)
      .json({ message: 'Internal server error', error: error.message });
  }
};

exports.checkAuthStatus = async (req, res) => {
  try {
    // Extract tokens from cookies
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    if (!accessToken || !refreshToken) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    // Verify the access token
    jwt.verify(accessToken, process.env.JWT_SECRET, async (err, decoded) => {
      if (err && err.name === 'TokenExpiredError') {
        // Access token has expired, verify the refresh token
        try {
          const refreshDecoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
          console.log(refreshDecoded);
          const user = await User.findById(refreshDecoded.id);

          if (!user) {
            return res.status(401).json({ message: 'Invalid refresh token' });
          }

          // Generate new access and refresh tokens
          const newAccessToken = user.generateAuthToken();
          const newRefreshToken = user.generateRefreshToken();

          // Set new tokens in cookies
          res.cookie('accessToken', newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
          });
          res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
          });

          return res.status(200).json({ message: 'New tokens issued', user: { id: user._id, username: user.username, email: user.email } });
        } catch (refreshError) {
          console.error('Refresh token error:', refreshError);
          return res.status(401).json({ message: 'Invalid or expired refresh token' });
        }
      } else if (err) {
        return res.status(401).json({ message: 'Invalid access token' });
      } else {
        // If access token is valid, proceed
        const user = await User.findById(decoded.id);
        if (!user) {
          return res.status(401).json({ message: 'User not found' });
        }

        return res.status(200).json({ message: 'Authenticated', user: { id: user._id, username: user.username, email: user.email } });
      }
    });
  } catch (error) {
    console.error('Auth status error:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
