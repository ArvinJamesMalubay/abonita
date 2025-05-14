const sequelize = require('../config/database');
const Customer = require('./customer.model');
const Product = require('./product.model');
const { Quotation, QuotationItem } = require('./quotation.model');
const { SalesOrder, SalesOrderItem } = require('./salesOrder.model');
const Supplier = require('./supplier.model');

// Define associations
Customer.hasMany(Quotation, {
  foreignKey: 'customerId',
  as: 'quotations'
});

Quotation.belongsTo(Customer, {
  foreignKey: 'customerId',
  as: 'Customer'
});

Quotation.hasOne(SalesOrder, {
  foreignKey: 'quotationId'
});
SalesOrder.belongsTo(Quotation, {
  foreignKey: 'quotationId'
});

// Product associations
Product.hasMany(QuotationItem, {
  foreignKey: 'productId',
  as: 'quotationItems'
});

QuotationItem.belongsTo(Product, {
  foreignKey: 'productId',
  as: 'Product'
});

Product.hasMany(SalesOrderItem, {
  foreignKey: 'productId'
});
SalesOrderItem.belongsTo(Product, {
  foreignKey: 'productId'
});

// Customer - SalesOrder relationship
Customer.hasMany(SalesOrder, {
  foreignKey: 'customerId'
});
SalesOrder.belongsTo(Customer, {
  foreignKey: 'customerId'
});

// Supplier - Product relationship
Supplier.hasMany(Product, {
  foreignKey: 'supplierId'
});
Product.belongsTo(Supplier, {
  foreignKey: 'supplierId'
});

// Export models and sequelize
module.exports = {
  sequelize,
  Customer,
  Product,
  Quotation,
  QuotationItem,
  SalesOrder,
  SalesOrderItem,
  Supplier
}; 