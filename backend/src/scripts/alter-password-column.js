const sequelize = require('../config/database');

async function alterPasswordColumn() {
  try {
    console.log('Altering password column size...');
    
    // Alter the column size to VARCHAR(255)
    const query = `ALTER TABLE customers MODIFY COLUMN password VARCHAR(255);`;
    
    await sequelize.query(query);
    console.log('Password column size updated successfully to VARCHAR(255)');
    
    // Update the password with a working hash
    const EMAIL = 'arvin.james.malubay@gmail.com';
    const PASSWORD_HASH = '$2a$10$F/VzaXoGGTlhNNw/nUYW8uAZFBJCIvIUFOEZJMGbL88WJqJzr9P92'; // "123456"
    
    const updateQuery = `UPDATE customers SET password = ? WHERE email = ?`;
    await sequelize.query(updateQuery, {
      replacements: [PASSWORD_HASH, EMAIL],
      type: sequelize.QueryTypes.UPDATE
    });
    
    console.log('Password has been updated with a known working hash for "123456"');
    process.exit(0);
  } catch (error) {
    console.error('Error altering password column:', error);
    process.exit(1);
  }
}

alterPasswordColumn(); 