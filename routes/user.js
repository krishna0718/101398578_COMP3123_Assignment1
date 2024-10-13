const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const router = express.Router();

// Signup Route
router.post('/signup', [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').isLength({ min: 6 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body;
  
  try {
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ message: 'User created successfully.', user_id: user._id });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid Username and password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid Username and password' });

    res.status(200).json({ message: 'Login successful.' });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
});

module.exports = router;
