const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  sku: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  unit_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  unit: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'piece'
  },
  stock_quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true
  },
  supplier_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true
  },
  created_at: {
    type: DataTypes.TIME,
    allowNull: true
  },
  updated_at: {
    type: DataTypes.TIME,
    allowNull: true
  },
  image_data: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  // Add these options
  underscored: true,
  timestamps: true,
  tableName: 'products'
});

module.exports = Product; 