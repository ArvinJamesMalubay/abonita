const express = require('express');
const router = express.Router();
const debugController = require('../controllers/debug.controller');

// Test database connection
router.get('/test-connection', debugController.testConnection);

// Count records in each table
router.get('/count-records', debugController.countRecords);

// Get dashboard data
router.get('/dashboard', debugController.getDashboardData);

// Get table schemas
router.get('/table-schemas', debugController.getTableSchemas);

// Recreate tables with sample data
router.post('/recreate-suppliers', debugController.recreateSuppliers);
router.post('/recreate-customers', debugController.recreateCustomers);

module.exports = router; 