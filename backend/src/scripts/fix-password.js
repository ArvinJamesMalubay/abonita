const bcrypt = require('bcryptjs');
const sequelize = require('../config/database');

const EMAIL = 'arvin.james.malubay@gmail.com';
const PASSWORD = '123456';

// Wait for database to connect
sequelize.authenticate()
  .then(() => {
    console.log('Connected to database');
    
    // Find customer
    return sequelize.query(
      `SELECT * FROM customers WHERE email = '${EMAIL}'`,
      { type: sequelize.QueryTypes.SELECT }
    );
  })
  .then(customers => {
    if (!customers || customers.length === 0) {
      console.log(`No customer found with email: ${EMAIL}`);
      return null;
    }
    
    const customer = customers[0];
    console.log('Customer found:', { 
      id: customer.id,
      name: customer.name,
      email: customer.email,
      hasPassword: !!customer.password
    });
    
    // Create new password hash
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(PASSWORD, salt);
    console.log('New password hash:', hashedPassword);
    
    // Update customer with new password
    return sequelize.query(
      `UPDATE customers SET password = '${hashedPassword}' WHERE id = ${customer.id}`
    );
  })
  .then(result => {
    if (result) {
      console.log('Password updated successfully!');
    }
    process.exit(0);
  })
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  }); 