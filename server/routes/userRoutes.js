const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// @route   POST /api/users/register
// @desc    Register new user
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        success: false,
        message: 'User already exists with this email' 
      });
    }
    
    // Create new user
    const user = new User({ name, email, password });
    await user.save();
    
    // Generate JWT token (optional for now)
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '7d' }
    );
    
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        token
      }
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(400).json({ 
      success: false,
      message: 'Error registering user', 
      error: error.message 
    });
  }
});

// @route   POST /api/users/login
// @desc    Login user
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid email or password' 
      });
    }
    
    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid email or password' 
      });
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '7d' }
    );
    
    res.json({
      success: true,
      message: 'Login successful',
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        token
      }
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error logging in', 
      error: error.message 
    });
  }
});

// @route   GET /api/users/profile/:id
// @desc    Get user profile
// @access  Public (should be Private in production)
router.get('/profile/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }
    
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error fetching user profile', 
      error: error.message 
    });
  }
});

module.exports = router;