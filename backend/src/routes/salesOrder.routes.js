const express = require('express');
const router = express.Router();
const salesOrderController = require('../controllers/salesOrder.controller');
const { authenticateJWT } = require('../middleware/auth.middleware');

// Apply authentication middleware to all routes
router.use(authenticateJWT);

// Route to get all sales orders
router.get('/', salesOrderController.getAllSalesOrders);

// Route to get a single sales order by ID
router.get('/:id', salesOrderController.getSalesOrderById);

// Route to create a new sales order
router.post('/', salesOrderController.createSalesOrder);

// Route for user orders (regular users)
router.post('/user-order', salesOrderController.createUserOrder);

// Route to update a sales order
router.put('/:id', salesOrderController.updateSalesOrder);

// Route to delete a sales order
router.delete('/:id', salesOrderController.deleteSalesOrder);

module.exports = router; 