const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { validate, validationSchemas } = require('../middleware/validation');
const { sendTokenResponse } = require('../utils/jwt');
const { protect } = require('../middleware/auth');

// Register
router.post('/register', validate(validationSchemas.registerSchema), async (req, res) => {
  try {
    const { name, email, password, phone } = req.validatedData;

    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    user = await User.create({
      name,
      email,
      password,
      phone,
    });

    sendTokenResponse(user, 201, res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login
router.post('/login', validate(validationSchemas.loginSchema), async (req, res) => {
  try {
    const { email, password } = req.validatedData;

    // Check if user exists
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    sendTokenResponse(user, 200, res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get current user
router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Logout
router.post('/logout', (req, res) => {
  res.json({ message: 'Logged out successfully' });
});

module.exports = router;
