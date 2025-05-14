const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');

// Register a new user
exports.register = async (req, res) => {
  try {
    const { username, email, password, fullName, name, role, companyName } = req.body;

    // Additional validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }

    if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    // Check if username or email already exists
    const userExists = await User.findOne({ 
      where: {
        [Op.or]: [
          { username: username || name || email.split('@')[0] },
          { email: email }
        ]
      }
    });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User with that username or email already exists'
      });
    }

    // Create the user
    const user = await User.create({
      username: username || name || email.split('@')[0], // Use name as username if provided
      email,
      password, // Will be hashed by the model hook
      fullName: fullName || name || '', // Use name as fullName if provided
      companyName: companyName || '',
      role: role || 'user' // Use provided role or default to 'user'
    });

    // Don't send back the password
    const userData = { ...user.get() };
    delete userData.password;

    // Create a JWT token for immediate login (optional)
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: userData,
        token
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to register user',
      error: error.message
    });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Additional validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // Find the user
    const user = await User.findOne({ where: { email } });
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Account is disabled. Please contact an administrator.'
      });
    }

    // Verify password
    const isPasswordValid = await user.validatePassword(password);
    
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Generate JWT token - if rememberMe is true, set longer expiration
    const expiresIn = req.body.rememberMe ? '7d' : '24h';

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn }
    );

    // Don't send back the password
    const userData = { ...user.get() };
    delete userData.password;

    // Update last login timestamp
    await user.update({ lastLogin: new Date() });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: userData,
        token
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to login',
      error: error.message
    });
  }
};

// Get current user
exports.getCurrentUser = async (req, res) => {
  try {
    // The user will be attached to req by the auth middleware
    const user = await User.findByPk(req.userId, {
      attributes: { exclude: ['password'] }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get user data',
      error: error.message
    });
  }
}; 