const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplier.controller');

// Get all suppliers
router.get('/', supplierController.getAllSuppliers);

// Get a single supplier by id
router.get('/:id', supplierController.getSupplierById);

// Create a new supplier
router.post('/', supplierController.createSupplier);

// Update a supplier
router.put('/:id', supplierController.updateSupplier);

// Delete a supplier
router.delete('/:id', supplierController.deleteSupplier);

module.exports = router; 