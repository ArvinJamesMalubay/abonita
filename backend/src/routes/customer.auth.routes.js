const express = require('express');
const router = express.Router();
const customerAuthController = require('../controllers/customer.auth.controller');
const { authenticateCustomerJWT } = require('../middleware/customer.auth.middleware');

// Register a new customer
router.post('/register', customerAuthController.register);

// Login customer
router.post('/login', customerAuthController.login);

// Get current customer (protected route)
router.get('/me', authenticateCustomerJWT, customerAuthController.getCurrentCustomer);

module.exports = router; 