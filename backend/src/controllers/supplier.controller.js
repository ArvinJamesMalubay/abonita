const db = require('../models');
const Supplier = db.Supplier;

// Get all suppliers
exports.getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.findAll();
    res.status(200).json(suppliers);
  } catch (error) {
    console.error('Error getting suppliers:', error);
    res.status(500).json({ 
      message: 'Error retrieving suppliers',
      error: error.message 
    });
  }
};

// Get a single supplier by id
exports.getSupplierById = async (req, res) => {
  try {
    const { id } = req.params;
    const supplier = await Supplier.findByPk(id);
    
    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }
    
    res.status(200).json(supplier);
  } catch (error) {
    console.error('Error getting supplier:', error);
    res.status(500).json({ 
      message: 'Error retrieving supplier',
      error: error.message 
    });
  }
};

// Create a new supplier
exports.createSupplier = async (req, res) => {
  try {
    // Validate request
    if (!req.body.name || !req.body.email) {
      return res.status(400).json({ message: 'Name and email are required fields' });
    }
    
    // Create supplier
    const supplier = await Supplier.create(req.body);
    res.status(201).json(supplier);
  } catch (error) {
    console.error('Error creating supplier:', error);
    res.status(500).json({ 
      message: 'Error creating supplier',
      error: error.message 
    });
  }
};

// Update a supplier
exports.updateSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Update supplier
    const [updated] = await Supplier.update(req.body, {
      where: { id }
    });
    
    if (updated === 0) {
      return res.status(404).json({ message: 'Supplier not found' });
    }
    
    // Get updated supplier
    const updatedSupplier = await Supplier.findByPk(id);
    res.status(200).json(updatedSupplier);
  } catch (error) {
    console.error('Error updating supplier:', error);
    res.status(500).json({ 
      message: 'Error updating supplier',
      error: error.message 
    });
  }
};

// Delete a supplier
exports.deleteSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Delete supplier
    const deleted = await Supplier.destroy({
      where: { id }
    });
    
    if (deleted === 0) {
      return res.status(404).json({ message: 'Supplier not found' });
    }
    
    res.status(200).json({ message: 'Supplier deleted successfully' });
  } catch (error) {
    console.error('Error deleting supplier:', error);
    res.status(500).json({ 
      message: 'Error deleting supplier',
      error: error.message 
    });
  }
}; 