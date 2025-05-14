const { Sequelize } = require('sequelize');
const bcrypt = require('bcryptjs');
const config = require('../config/database');
const Customer = require('../models/customer.model');

// Email and new password to set
const EMAIL = 'arvin.james.malubay@gmail.com';
const NEW_PASSWORD = '123456'; // Change this to your desired password

async function updateCustomerPassword() {
  try {
    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(NEW_PASSWORD, salt);
    
    // Find the customer by email
    const customer = await Customer.findOne({ where: { email: EMAIL } });
    
    if (!customer) {
      console.error(`No customer found with email: ${EMAIL}`);
      process.exit(1);
    }
    
    // Update the password
    await customer.update({ password: hashedPassword });
    
    console.log(`Password updated successfully for customer: ${customer.name} (${EMAIL})`);
    process.exit(0);
  } catch (error) {
    console.error('Failed to update password:', error);
    process.exit(1);
  }
}

// Run the script
updateCustomerPassword(); 