const bcrypt = require('bcryptjs');
const { Sequelize } = require('sequelize');
const Customer = require('../models/customer.model');
const config = require('../config/database');

// Email and password to test
const EMAIL = 'arvin.james.malubay@gmail.com';
const PASSWORD = '123456';

async function testPassword() {
  try {
    console.log('Testing password for:', EMAIL);

    // Connect to database
    const sequelize = new Sequelize(config);
    await sequelize.authenticate();
    console.log('Connected to database');

    // Find the customer
    const customer = await Customer.findOne({ where: { email: EMAIL } });
    
    if (!customer) {
      console.error(`No customer found with email: ${EMAIL}`);
      process.exit(1);
    }

    console.log('Customer found:', {
      id: customer.id,
      email: customer.email,
      name: customer.name,
      hasPassword: !!customer.password,
      passwordHash: customer.password
    });

    // Test password
    const isValid = await bcrypt.compare(PASSWORD, customer.password);
    console.log(`Password validation result: ${isValid ? 'SUCCESS' : 'FAILED'}`);

    // If password is not valid, create a new hash and update it
    if (!isValid) {
      console.log('Creating new password hash...');
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(PASSWORD, salt);
      console.log('New password hash:', hashedPassword);
      
      await customer.update({ password: hashedPassword });
      console.log('Customer password updated successfully.');

      // Verify the new password
      const newIsValid = await bcrypt.compare(PASSWORD, hashedPassword);
      console.log(`New password validation: ${newIsValid ? 'SUCCESS' : 'FAILED'}`);
    }

    process.exit(0);
  } catch (error) {
    console.error('Password test failed:', error);
    process.exit(1);
  }
}

// Run the script
testPassword(); 