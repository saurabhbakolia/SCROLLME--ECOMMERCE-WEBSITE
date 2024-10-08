const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

// User Schema Object
const UserSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    required: 'Please enter your first name',
  },
  lastName: {
    type: String,
    trim: true,
    required: 'Please enter your last name',
  },
  username: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: 'Please enter a username',
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: 'Please enter your email address',
  },
  password: {
    type: String,
    required: 'Please enter a password',
  },
  roles: {
    type: [String],
    enum: ['user', 'admin', 'super_admin'],
    default: ['user'],
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (err) {
      next(err);
    }
  } else {
    return next();
  }
});

// Compare password method
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Generate access token
UserSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    { id: this._id, roles: this.roles },
    process.env.JWT_SECRET,
    { expiresIn: '1h' } // Access token expiration
  );
};

// Generate refresh token
UserSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    { id: this._id },
    process.env.JWT_SECRET,
    { expiresIn: '7d' } // Refresh token expiration
  );
};

// Create and export the User model
module.exports = mongoose.model('User', UserSchema);
