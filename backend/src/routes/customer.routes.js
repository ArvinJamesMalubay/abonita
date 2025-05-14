const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customer.controller');

// Get all customers
router.get('/', customerController.getAllCustomers);

// Get a single customer by id
router.get('/:id', customerController.getCustomerById);

// Create a new customer
router.post('/', customerController.createCustomer);

// Update a customer
router.put('/:id', customerController.updateCustomer);

// Delete a customer
router.delete('/:id', customerController.deleteCustomer);

module.exports = router; 