const { SalesOrder, SalesOrderItem } = require('../models/salesOrder.model');
const Product = require('../models/product.model');
const Customer = require('../models/customer.model');
const db = require('../models');
const { Op } = require('sequelize');

// Get all sales orders
exports.getAllSalesOrders = async (req, res) => {
  try {
    const salesOrders = await SalesOrder.findAll({
      include: [
        {
          model: SalesOrderItem,
          as: 'items',
          include: [
            {
              model: Product,
              attributes: ['id', 'name', 'sku']
            }
          ]
        },
        {
          model: Customer,
          attributes: ['id', 'name']
        }
      ],
      order: [['order_date', 'DESC']]
    });

    res.status(200).json(salesOrders);
  } catch (error) {
    console.error('Error fetching sales orders:', error);
    res.status(500).json({ message: 'Failed to fetch sales orders', error: error.message });
  }
};

// Get sales order by ID
exports.getSalesOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const salesOrder = await SalesOrder.findByPk(id, {
      include: [
        {
          model: SalesOrderItem,
          as: 'items',
          include: [
            {
              model: Product,
              attributes: ['id', 'name', 'sku', 'unit_price']
            }
          ]
        },
        {
          model: Customer,
          attributes: ['id', 'name']
        }
      ]
    });
    
    if (!salesOrder) {
      return res.status(404).json({ message: 'Sales order not found' });
    }
    
    res.status(200).json(salesOrder);
  } catch (error) {
    console.error('Error fetching sales order:', error);
    res.status(500).json({ message: 'Failed to fetch sales order', error: error.message });
  }
};

// Create new sales order
exports.createSalesOrder = async (req, res) => {
  const transaction = await db.sequelize.transaction();
  
  try {
    const {
      order_number, customer_id, order_date, expected_delivery_date,
      status, subtotal, tax_rate, tax_amount, total,
      shipping_address, billing_address, payment_terms, notes,
      items
    } = req.body;
    
    // Validate required fields
    if (!order_number || !customer_id || !items || items.length === 0) {
      await transaction.rollback();
      return res.status(400).json({ message: 'Order number, customer, and at least one item are required' });
    }
    
    const now = new Date();
    
    // Create sales order
    const salesOrder = await SalesOrder.create({
      order_number,
      customer_id,
      order_date,
      expected_delivery_date,
      status,
      subtotal,
      tax_rate,
      tax_amount,
      total,
      shipping_address,
      billing_address,
      payment_terms,
      notes
    }, { transaction });
    
    // Create sales order items
    const salesOrderItems = await Promise.all(
      items.map(item => 
        SalesOrderItem.create({
          sales_order_id: salesOrder.id,
          product_id: item.product_id,
          quantity: item.quantity,
          unit_price: item.unit_price,
          discount: item.discount || 0,
          total: item.total
        }, { transaction })
      )
    );
    
    await transaction.commit();
    
    res.status(201).json({
      message: 'Sales order created successfully',
      data: {
        ...salesOrder.toJSON(),
        items: salesOrderItems
      }
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Error creating sales order:', error);
    res.status(500).json({ message: 'Failed to create sales order', error: error.message });
  }
};

// Update sales order
exports.updateSalesOrder = async (req, res) => {
  const transaction = await db.sequelize.transaction();
  
  try {
    const { id } = req.params;
    const {
      order_number, customer_id, order_date, expected_delivery_date,
      status, subtotal, tax_rate, tax_amount, total,
      shipping_address, billing_address, payment_terms, notes,
      items
    } = req.body;
    
    // Check if sales order exists
    const salesOrder = await SalesOrder.findByPk(id);
    if (!salesOrder) {
      await transaction.rollback();
      return res.status(404).json({ message: 'Sales order not found' });
    }
    
    const now = new Date();
    
    // Update sales order
    await salesOrder.update({
      order_number,
      customer_id,
      order_date,
      expected_delivery_date,
      status,
      subtotal,
      tax_rate,
      tax_amount,
      total,
      shipping_address,
      billing_address,
      payment_terms,
      notes
    }, { transaction });
    
    // Delete existing items
    await SalesOrderItem.destroy({
      where: { sales_order_id: id },
      transaction
    });
    
    // Create new items
    const salesOrderItems = await Promise.all(
      items.map(item => 
        SalesOrderItem.create({
          sales_order_id: id,
          product_id: item.product_id,
          quantity: item.quantity,
          unit_price: item.unit_price,
          discount: item.discount || 0,
          total: item.total
        }, { transaction })
      )
    );
    
    await transaction.commit();
    
    res.status(200).json({
      message: 'Sales order updated successfully',
      data: {
        ...salesOrder.toJSON(),
        items: salesOrderItems
      }
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Error updating sales order:', error);
    res.status(500).json({ message: 'Failed to update sales order', error: error.message });
  }
};

// Delete sales order
exports.deleteSalesOrder = async (req, res) => {
  const transaction = await db.sequelize.transaction();
  
  try {
    const { id } = req.params;
    
    // Check if sales order exists
    const salesOrder = await SalesOrder.findByPk(id);
    if (!salesOrder) {
      await transaction.rollback();
      return res.status(404).json({ message: 'Sales order not found' });
    }
    
    // Delete the sales order (cascade will delete items)
    await salesOrder.destroy({ transaction });
    
    await transaction.commit();
    
    res.status(200).json({ message: 'Sales order deleted successfully' });
  } catch (error) {
    await transaction.rollback();
    console.error('Error deleting sales order:', error);
    res.status(500).json({ message: 'Failed to delete sales order', error: error.message });
  }
};

// Create user order (for regular users)
exports.createUserOrder = async (req, res) => {
  const transaction = await db.sequelize.transaction();
  
  try {
    const {
      customerId,
      orderDate,
      deliveryDate,
      status,
      totalAmount,
      notes,
      deliveryAddress,
      items
    } = req.body;
    
    console.log('Received order data:', req.body);
    
    // Validate required fields
    if (!customerId || !items || items.length === 0) {
      await transaction.rollback();
      return res.status(400).json({
        success: false,
        message: 'Customer ID and at least one item are required'
      });
    }
    
    // Validate delivery date
    if (!deliveryDate) {
      await transaction.rollback();
      return res.status(400).json({
        success: false,
        message: 'Delivery date is required'
      });
    }
    
    // Generate order number with current date
    const now = new Date();
    const orderNumber = `ORD-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
    
    // Create sales order
    const salesOrder = await SalesOrder.create({
      order_number: orderNumber,
      customer_id: customerId,
      order_date: orderDate || now,
      expected_delivery_date: deliveryDate,  // Maps deliveryDate to expected_delivery_date
      status: status || 'pending',
      subtotal: totalAmount,
      tax_rate: 0, // Can be customized if needed
      tax_amount: 0,
      total: totalAmount,
      shipping_address: deliveryAddress || 'Not provided',
      billing_address: deliveryAddress || 'Not provided', // Using same address for billing
      payment_terms: 'Standard',
      notes: notes || ''
    }, { transaction });
    
    // Create sales order items
    const salesOrderItems = await Promise.all(
      items.map(item => {
        return SalesOrderItem.create({
          sales_order_id: salesOrder.id,
          product_id: item.productId,
          quantity: item.quantity,
          unit_price: item.price,
          discount: 0,
          total: item.price * item.quantity
        }, { transaction });
      })
    );
    
    await transaction.commit();
    
    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      data: {
        orderId: salesOrder.id,
        orderNumber: salesOrder.order_number,
        total: salesOrder.total
      }
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Error creating user order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create order: ' + error.message,
      error: error.message
    });
  }
}; 