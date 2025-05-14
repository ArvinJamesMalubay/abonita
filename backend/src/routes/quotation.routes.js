const express = require('express');
const router = express.Router();
const quotationController = require('../controllers/quotation.controller');

// Get all quotations
router.get('/', quotationController.getAllQuotations);

// Get a single quotation by ID
router.get('/:id', quotationController.getQuotationById);

// Create a new quotation
router.post('/', quotationController.createQuotation);

// Update a quotation
router.put('/:id', quotationController.updateQuotation);

// Delete a quotation
router.delete('/:id', quotationController.deleteQuotation);

// Convert a quotation to a sales order
router.post('/:id/convert', quotationController.convertToOrder);

module.exports = router; 