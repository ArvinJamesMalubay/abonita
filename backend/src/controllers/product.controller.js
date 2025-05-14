const db = require('../models');
const Product = db.Product;
const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const { Op } = require('sequelize');

// Process image file and convert to base64
const processImageFile = async (req) => {
  // Check if there's a file upload
  if (!req.file) return null;
  
  try {
    // Read the file data
    const imageBuffer = await readFile(req.file.path);
    
    // Convert to base64
    const base64Image = imageBuffer.toString('base64');
    
    // Clean up the temp file
    fs.unlink(req.file.path, (err) => {
      if (err) console.error('Error deleting temp file:', err);
    });
    
    return base64Image;
  } catch (error) {
    console.error('Error processing image:', error);
    return null;
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [{ model: db.Supplier, as: 'Supplier' }]
    });
    
    // Return in a consistent format with a success flag
    res.status(200).json({
      success: true,
      data: products,
      message: 'Products retrieved successfully'
    });
  } catch (error) {
    console.error('Error getting products:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error retrieving products',
      error: error.message 
    });
  }
};

// Get a single product by id
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id, {
      include: [{ model: db.Supplier, as: 'Supplier' }]
    });
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.status(200).json(product);
  } catch (error) {
    console.error('Error getting product:', error);
    res.status(500).json({ 
      message: 'Error retrieving product',
      error: error.message 
    });
  }
};

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    // Validate request
    if (!req.body.name || !req.body.sku) {
      return res.status(400).json({ message: 'Name and SKU are required fields' });
    }
    
    // Process image if uploaded
    let productData = { ...req.body };
    
    if (req.file) {
      const base64Image = await processImageFile(req);
      if (base64Image) {
        productData.image_data = base64Image;
      }
    }
    
    // Create product
    const product = await Product.create(productData);
    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ 
      message: 'Error creating product',
      error: error.message 
    });
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Process image if uploaded
    let updateData = { ...req.body };
    
    if (req.file) {
      const base64Image = await processImageFile(req);
      if (base64Image) {
        updateData.image_data = base64Image;
      }
    }
    
    // Update product
    const [updated] = await Product.update(updateData, {
      where: { id }
    });
    
    if (updated === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    // Get updated product
    const updatedProduct = await Product.findByPk(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ 
      message: 'Error updating product',
      error: error.message 
    });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Delete product
    const deleted = await Product.destroy({
      where: { id }
    });
    
    if (deleted === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ 
      message: 'Error deleting product',
      error: error.message 
    });
  }
}; 