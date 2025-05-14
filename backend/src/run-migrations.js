const path = require('path');
const Sequelize = require('sequelize');
const config = require('./config/database');
const addPasswordToCustomers = require('./migrations/add-password-to-customers');

async function runMigrations() {
  console.log('Running migrations...');
  
  try {
    // Connect to database
    const sequelize = new Sequelize(config);
    await sequelize.authenticate();
    console.log('Connected to database');
    
    // Run migrations
    await addPasswordToCustomers.up(sequelize.getQueryInterface(), Sequelize);
    
    console.log('Migrations completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Migrations failed:', error);
    process.exit(1);
  }
}

runMigrations(); 