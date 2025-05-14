const db = require('../models');
const Customer = db.Customer;
const SalesOrder = db.SalesOrder;
const Quotation = db.Quotation;

// Get all customers
exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll();
    res.status(200).json(customers);
  } catch (error) {
    console.error('Error getting customers:', error);
    res.status(500).json({ 
      message: 'Error retrieving customers',
      error: error.message 
    });
  }
};

// Get a single customer by id
exports.getCustomerById = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findByPk(id);
    
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    
    res.status(200).json(customer);
  } catch (error) {
    console.error('Error getting customer:', error);
    res.status(500).json({ 
      message: 'Error retrieving customer',
      error: error.message 
    });
  }
};

// Create a new customer
exports.createCustomer = async (req, res) => {
  try {
    // Validate request
    if (!req.body.name || !req.body.email) {
      return res.status(400).json({ message: 'Name and email are required fields' });
    }
    
    // Create customer
    const customer = await Customer.create(req.body);
    res.status(201).json(customer);
  } catch (error) {
    console.error('Error creating customer:', error);
    res.status(500).json({ 
      message: 'Error creating customer',
      error: error.message 
    });
  }
};

// Update a customer
exports.updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Update customer
    const [updated] = await Customer.update(req.body, {
      where: { id }
    });
    
    if (updated === 0) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    
    // Get updated customer
    const updatedCustomer = await Customer.findByPk(id);
    res.status(200).json(updatedCustomer);
  } catch (error) {
    console.error('Error updating customer:', error);
    res.status(500).json({ 
      message: 'Error updating customer',
      error: error.message 
    });
  }
};

// Delete a customer
exports.deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if customer exists
    const customer = await Customer.findByPk(id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    
    // Check for related sales orders
    const salesOrders = await SalesOrder.count({ where: { customerId: id } });
    if (salesOrders > 0) {
      return res.status(400).json({ 
        message: 'Cannot delete customer with existing sales orders. Please delete the sales orders first.',
        error: `This customer has ${salesOrders} sales orders.`
      });
    }
    
    // Check for related quotations
    const quotations = await Quotation.count({ where: { customerId: id } });
    if (quotations > 0) {
      return res.status(400).json({
        message: 'Cannot delete customer with existing quotations. Please delete the quotations first.',
        error: `This customer has ${quotations} quotations.`
      });
    }
    
    // If no related records, proceed with deletion
    await customer.destroy();
    
    res.status(200).json({ message: 'Customer deleted successfully' });
  } catch (error) {
    console.error('Error deleting customer:', error);
    res.status(500).json({ 
      message: 'Error deleting customer',
      error: error.message 
    });
  }
}; 