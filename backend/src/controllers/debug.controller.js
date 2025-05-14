const sequelize = require('../config/database');
const db = require('../models');

// Test database connection
exports.testConnection = async (req, res) => {
  try {
    await sequelize.authenticate();
    
    // Get table information
    const [tables] = await sequelize.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = '${sequelize.config.database}'
    `);
    
    // Get database information
    const dbInfo = {
      dialect: sequelize.options.dialect,
      database: sequelize.config.database,
      host: sequelize.config.host,
      username: sequelize.config.username,
      port: sequelize.config.port,
      models: Object.keys(db),
      tables: tables.map(t => t.table_name || t.TABLE_NAME)
    };
    
    res.status(200).json({
      success: true,
      message: 'Database connection has been established successfully.',
      dbInfo
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    res.status(500).json({
      success: false,
      message: 'Unable to connect to the database',
      error: error.message,
      errorStack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

// Count records in each table
exports.countRecords = async (req, res) => {
  try {
    const counts = {};
    
    // Try to count customers
    try {
      counts.customers = await db.Customer.count();
    } catch (error) {
      counts.customers = { error: error.message };
    }
    
    // Try to count products
    try {
      counts.products = await db.Product.count();
    } catch (error) {
      counts.products = { error: error.message };
    }
    
    // Try to count suppliers
    try {
      counts.suppliers = await db.Supplier.count();
    } catch (error) {
      counts.suppliers = { error: error.message };
    }
    
    // Try to count quotations
    try {
      counts.quotations = await db.Quotation.count();
    } catch (error) {
      counts.quotations = { error: error.message };
    }
    
    // Try to count sales orders
    try {
      counts.salesOrders = await db.SalesOrder.count();
    } catch (error) {
      counts.salesOrders = { error: error.message };
    }
    
    res.status(200).json({
      success: true,
      counts
    });
  } catch (error) {
    console.error('Error counting records:', error);
    res.status(500).json({
      success: false,
      message: 'Error counting records',
      error: error.message
    });
  }
};

// Get table schemas
exports.getTableSchemas = async (req, res) => {
  try {
    const schemas = {};
    
    // Get schemas for main tables
    const tableNames = ['Customers', 'Suppliers', 'Products', 'Quotations', 'SalesOrders'];
    
    for (const tableName of tableNames) {
      try {
        const [schema] = await sequelize.query(`DESCRIBE ${tableName}`);
        schemas[tableName] = schema;
      } catch (error) {
        schemas[tableName] = { error: error.message };
      }
    }
    
    res.status(200).json({
      success: true,
      schemas
    });
  } catch (error) {
    console.error('Error getting table schemas:', error);
    res.status(500).json({
      success: false,
      message: 'Error getting table schemas',
      error: error.message
    });
  }
};

// Recreate the suppliers table with sample data
exports.recreateSuppliers = async (req, res) => {
  try {
    // Force sync the suppliers table
    await db.Supplier.sync({ force: true });
    
    // Create sample suppliers
    const sampleSuppliers = [
      {
        name: 'Acme Supplies',
        email: 'contact@acme.com',
        phone: '123-456-7890',
        address: '123 Supplier St, Supply City',
        city: 'Supply City',
        state: 'SC',
        zipCode: '12345',
        country: 'USA',
        status: 'active'
      },
      {
        name: 'Global Tech Components',
        email: 'info@gtcomponents.com',
        phone: '987-654-3210',
        address: '456 Tech Blvd, Innovation Valley',
        city: 'Innovation Valley',
        state: 'IV',
        zipCode: '54321',
        country: 'USA',
        status: 'active'
      },
      {
        name: 'Metro Industrial Supplies',
        email: 'sales@metroindustrial.com',
        phone: '555-123-4567',
        address: '789 Industrial Ave, Manufacturing District',
        city: 'Manufacturing District',
        state: 'MD',
        zipCode: '67890',
        country: 'USA',
        status: 'inactive'
      }
    ];
    
    // Create the suppliers
    const suppliers = await db.Supplier.bulkCreate(sampleSuppliers);
    
    res.status(200).json({
      success: true,
      message: 'Suppliers table recreated with sample data',
      suppliers
    });
  } catch (error) {
    console.error('Error recreating suppliers table:', error);
    res.status(500).json({
      success: false,
      message: 'Error recreating suppliers table',
      error: error.message
    });
  }
};

// Recreate the customers table with sample data
exports.recreateCustomers = async (req, res) => {
  try {
    // Force sync the customers table
    await db.Customer.sync({ force: true });
    
    // Create sample customers
    const sampleCustomers = [
      {
        name: 'Acme Corporation',
        email: 'contact@acme.com',
        phone: '123-456-7890',
        address: '123 Business Ave, Commerce City',
        status: 'active',
        notes: 'VIP customer'
      },
      {
        name: 'Global Enterprises',
        email: 'info@globalent.com',
        phone: '987-654-3210',
        address: '456 Commerce St, Business Town',
        status: 'active',
        notes: 'Requires special packaging'
      },
      {
        name: 'Metro Industries',
        email: 'sales@metroindustries.com',
        phone: '555-123-4567',
        address: '789 Industry Blvd, Factory City',
        status: 'inactive',
        notes: 'Seasonal customer'
      }
    ];
    
    // Create the customers
    const customers = await db.Customer.bulkCreate(sampleCustomers);
    
    res.status(200).json({
      success: true,
      message: 'Customers table recreated with sample data',
      customers
    });
  } catch (error) {
    console.error('Error recreating customers table:', error);
    res.status(500).json({
      success: false,
      message: 'Error recreating customers table',
      error: error.message
    });
  }
};

// Get dashboard data
exports.getDashboardData = async (req, res) => {
  try {
    const dashboardData = {
      counts: {},
      recentQuotations: [],
      recentOrders: []
    };
    
    // Get counts
    try {
      dashboardData.counts.customers = await db.Customer.count();
      dashboardData.counts.products = await db.Product.count();
      dashboardData.counts.suppliers = await db.Supplier.count();
      dashboardData.counts.quotations = await db.Quotation.count();
      dashboardData.counts.salesOrders = await db.SalesOrder.count();
    } catch (error) {
      console.error('Error getting counts:', error);
    }
    
    // Get recent quotations
    try {
      dashboardData.recentQuotations = await db.Quotation.findAll({
        limit: 5,
        order: [['createdAt', 'DESC']],
        include: [{
          model: db.Customer,
          as: 'Customer',
          attributes: ['name']
        }]
      });
    } catch (error) {
      console.error('Error getting recent quotations:', error);
    }
    
    // Get recent sales orders
    try {
      dashboardData.recentOrders = await db.SalesOrder.findAll({
        limit: 5,
        order: [['createdAt', 'DESC']],
        include: [{
          model: db.Customer,
          as: 'Customer',
          attributes: ['name']
        }]
      });
    } catch (error) {
      console.error('Error getting recent sales orders:', error);
    }
    
    res.status(200).json({
      success: true,
      data: dashboardData
    });
  } catch (error) {
    console.error('Error getting dashboard data:', error);
    res.status(500).json({
      success: false,
      message: 'Error getting dashboard data',
      error: error.message
    });
  }
}; 