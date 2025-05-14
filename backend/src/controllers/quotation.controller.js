const { Quotation, QuotationItem } = require('../models/quotation.model');
const Customer = require('../models/customer.model');
const Product = require('../models/product.model');
const sequelize = require('../config/database');

// Get all quotations
exports.getAllQuotations = async (req, res) => {
  try {
    const quotations = await Quotation.findAll({
      include: [
        {
          model: Customer,
          as: 'Customer',
          attributes: ['id', 'name', 'email']
        },
        {
          model: QuotationItem,
          as: 'items',
          include: [
            {
              model: Product,
              as: 'Product',
              attributes: ['id', 'name', 'sku']
            }
          ]
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json(quotations);
  } catch (error) {
    console.error('Error retrieving quotations:', error);
    res.status(500).json({
      message: 'Error retrieving quotations',
      error: error.message
    });
  }
};

// Get a single quotation by ID
exports.getQuotationById = async (req, res) => {
  try {
    const quotation = await Quotation.findByPk(req.params.id, {
      include: [
        {
          model: Customer,
          as: 'Customer',
          attributes: ['id', 'name', 'email', 'phone', 'address']
        },
        {
          model: QuotationItem,
          as: 'items',
          include: [
            {
              model: Product,
              as: 'Product',
              attributes: ['id', 'name', 'sku', 'description', 'unit_price', 'unit']
            }
          ]
        }
      ]
    });

    if (!quotation) {
      return res.status(404).json({ message: 'Quotation not found' });
    }

    res.status(200).json(quotation);
  } catch (error) {
    console.error('Error retrieving quotation:', error);
    res.status(500).json({
      message: 'Error retrieving quotation',
      error: error.message
    });
  }
};

// Create a new quotation
exports.createQuotation = async (req, res) => {
  const t = await sequelize.transaction();
  
  try {
    const {
      quotationNumber,
      customerId,
      issueDate,
      expiryDate,
      status,
      subtotal,
      taxRate,
      taxAmount,
      total,
      notes,
      termsAndConditions,
      items
    } = req.body;

    // Validate required fields
    if (!quotationNumber || !customerId || !issueDate || !expiryDate || !items || items.length === 0) {
      return res.status(400).json({
        message: 'Missing required fields'
      });
    }

    // Check if quotation number already exists
    const existingQuotation = await Quotation.findOne({
      where: { quotationNumber }
    });

    if (existingQuotation) {
      return res.status(400).json({
        message: 'Quotation number already exists'
      });
    }

    // Create quotation
    const quotation = await Quotation.create({
      quotationNumber,
      customerId,
      issueDate,
      expiryDate,
      status,
      subtotal,
      taxRate,
      taxAmount,
      total,
      notes,
      termsAndConditions
    }, { transaction: t });

    // Create quotation items
    const quotationItems = items.map(item => ({
      quotationId: quotation.id,
      productId: item.productId,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      discount: item.discount,
      total: item.total
    }));

    await QuotationItem.bulkCreate(quotationItems, { transaction: t });

    await t.commit();

    // Fetch the newly created quotation with all associations
    const newQuotation = await Quotation.findByPk(quotation.id, {
      include: [
        {
          model: Customer,
          as: 'Customer',
          attributes: ['id', 'name', 'email']
        },
        {
          model: QuotationItem,
          as: 'items',
          include: [
            {
              model: Product,
              as: 'Product',
              attributes: ['id', 'name', 'sku']
            }
          ]
        }
      ]
    });

    res.status(201).json(newQuotation);
  } catch (error) {
    await t.rollback();
    console.error('Error creating quotation:', error);
    res.status(500).json({
      message: 'Error creating quotation',
      error: error.message
    });
  }
};

// Update a quotation
exports.updateQuotation = async (req, res) => {
  const t = await sequelize.transaction();
  
  try {
    const quotationId = req.params.id;
    const {
      customerId,
      issueDate,
      expiryDate,
      status,
      subtotal,
      taxRate,
      taxAmount,
      total,
      notes,
      termsAndConditions,
      items
    } = req.body;

    // Check if quotation exists
    const quotation = await Quotation.findByPk(quotationId);
    if (!quotation) {
      return res.status(404).json({ message: 'Quotation not found' });
    }

    // Update quotation
    await quotation.update({
      customerId,
      issueDate,
      expiryDate,
      status,
      subtotal,
      taxRate,
      taxAmount,
      total,
      notes,
      termsAndConditions
    }, { transaction: t });

    // Delete existing items
    await QuotationItem.destroy({
      where: { quotationId },
      transaction: t
    });

    // Create new items
    if (items && items.length > 0) {
      const quotationItems = items.map(item => ({
        quotationId,
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        discount: item.discount,
        total: item.total
      }));

      await QuotationItem.bulkCreate(quotationItems, { transaction: t });
    }

    await t.commit();

    // Fetch updated quotation with associations
    const updatedQuotation = await Quotation.findByPk(quotationId, {
      include: [
        {
          model: Customer,
          as: 'Customer',
          attributes: ['id', 'name', 'email']
        },
        {
          model: QuotationItem,
          as: 'items',
          include: [
            {
              model: Product,
              as: 'Product',
              attributes: ['id', 'name', 'sku']
            }
          ]
        }
      ]
    });

    res.status(200).json(updatedQuotation);
  } catch (error) {
    await t.rollback();
    console.error('Error updating quotation:', error);
    res.status(500).json({
      message: 'Error updating quotation',
      error: error.message
    });
  }
};

// Delete a quotation
exports.deleteQuotation = async (req, res) => {
  const t = await sequelize.transaction();
  
  try {
    const quotationId = req.params.id;

    // Check if quotation exists
    const quotation = await Quotation.findByPk(quotationId);
    if (!quotation) {
      return res.status(404).json({ message: 'Quotation not found' });
    }

    // Delete quotation (cascade delete will handle items)
    await quotation.destroy({ transaction: t });

    await t.commit();

    res.status(200).json({ message: 'Quotation deleted successfully' });
  } catch (error) {
    await t.rollback();
    console.error('Error deleting quotation:', error);
    res.status(500).json({
      message: 'Error deleting quotation',
      error: error.message
    });
  }
};

// Convert quotation to sales order
exports.convertToOrder = async (req, res) => {
  try {
    const quotationId = req.params.id;

    // Check if quotation exists
    const quotation = await Quotation.findByPk(quotationId, {
      include: [
        {
          model: QuotationItem,
          as: 'items',
        }
      ]
    });

    if (!quotation) {
      return res.status(404).json({ message: 'Quotation not found' });
    }

    // Check if quotation is in accepted status
    if (quotation.status !== 'accepted') {
      return res.status(400).json({
        message: 'Only accepted quotations can be converted to sales orders'
      });
    }

    // TODO: Implement conversion to sales order
    // This would typically:
    // 1. Create a new sales order record
    // 2. Copy items from quotation to sales order
    // 3. Mark the quotation as converted
    // 4. Return the new sales order

    // For now, just update the quotation status
    await quotation.update({ status: 'converted' });

    res.status(200).json({
      message: 'Quotation marked as converted',
      quotationId: quotation.id
    });
  } catch (error) {
    console.error('Error converting quotation to order:', error);
    res.status(500).json({
      message: 'Error converting quotation to order',
      error: error.message
    });
  }
}; 