const Customer = require('../models/customer.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');

// Helper function to hash passwords
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Helper function to compare passwords
const comparePassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

// Register a new customer
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Additional validation
    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and password are required'
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

    // Check if email already exists
    const customerExists = await Customer.findOne({ 
      where: { email: email }
    });

    if (customerExists) {
      return res.status(400).json({
        success: false,
        message: 'Customer with that email already exists'
      });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create the customer
    const customer = await Customer.create({
      name,
      email,
      password: hashedPassword,
      status: 'active'
    });

    // Don't send back the password
    const customerData = { ...customer.get() };
    delete customerData.password;

    // Create a JWT token for immediate login
    const token = jwt.sign(
      { id: customer.id, type: 'customer' },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.status(201).json({
      success: true,
      message: 'Customer registered successfully',
      data: {
        customer: customerData,
        token
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to register customer',
      error: error.message
    });
  }
};

// Login customer
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt:', { email, passwordLength: password?.length });

    // Additional validation
    if (!email || !password) {
      console.log('Missing email or password');
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // Find the customer
    const customer = await Customer.findOne({ where: { email } });
    
    if (!customer) {
      console.log('No customer found with email:', email);
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    console.log('Customer found:', { id: customer.id, name: customer.name, hasPassword: !!customer.password });

    // Check if customer is active
    if (customer.status !== 'active') {
      console.log('Customer account not active:', customer.status);
      return res.status(401).json({
        success: false,
        message: 'Account is disabled. Please contact us for assistance.'
      });
    }

    // Verify password
    if (!customer.password) {
      console.log('Customer has no password set');
      return res.status(401).json({
        success: false,
        message: 'Account setup is incomplete. Please reset your password.'
      });
    }

    const isPasswordValid = await comparePassword(password, customer.password);
    console.log('Password validation result:', isPasswordValid);
    
    if (!isPasswordValid) {
      console.log('Invalid password');
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Generate JWT token - if rememberMe is true, set longer expiration
    const expiresIn = req.body.rememberMe ? '7d' : '24h';

    const token = jwt.sign(
      { id: customer.id, type: 'customer' },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn }
    );

    // Don't send back the password
    const customerData = { ...customer.get() };
    delete customerData.password;

    console.log('Login successful for customer:', { id: customer.id, name: customer.name });
    
    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        customer: customerData,
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

// Get current customer
exports.getCurrentCustomer = async (req, res) => {
  try {
    // The customer will be attached to req by the auth middleware
    const customer = await Customer.findByPk(req.customerId);

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found'
      });
    }

    // Don't send back the password
    const customerData = { ...customer.get() };
    delete customerData.password;

    res.status(200).json({
      success: true,
      data: customerData
    });
  } catch (error) {
    console.error('Get current customer error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get customer data',
      error: error.message
    });
  }
}; 