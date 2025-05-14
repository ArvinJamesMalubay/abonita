const bcrypt = require('bcryptjs');
const sequelize = require('../config/database');

const EMAIL = 'arvin.james.malubay@gmail.com';
const PASSWORD = '123456';

async function updatePassword() {
  try {
    // Generate a simple hash with lower cost for testing
    const salt = bcrypt.genSaltSync(8); // Lower cost factor
    const hashedPassword = bcrypt.hashSync(PASSWORD, salt);
    
    console.log('Generated hash:', hashedPassword);
    console.log('Password to hash:', PASSWORD);
    
    // Verify the hash works
    const testVerify = bcrypt.compareSync(PASSWORD, hashedPassword);
    console.log('Test verification result:', testVerify);
    
    // Update the password directly in the database
    const updateQuery = `UPDATE customers SET password = ? WHERE email = ?`;
    const result = await sequelize.query(updateQuery, {
      replacements: [hashedPassword, EMAIL],
      type: sequelize.QueryTypes.UPDATE
    });
    
    console.log('Update result:', result);
    console.log('Password updated successfully');
    
    // Verify the updated password in the database
    const selectQuery = `SELECT password FROM customers WHERE email = ?`;
    const rows = await sequelize.query(selectQuery, {
      replacements: [EMAIL],
      type: sequelize.QueryTypes.SELECT
    });
    
    if (rows && rows.length > 0) {
      const storedHash = rows[0].password;
      console.log('Stored hash in DB:', storedHash);
      
      // Verify stored hash
      const finalVerify = bcrypt.compareSync(PASSWORD, storedHash);
      console.log('Final verification result:', finalVerify);
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error updating password:', error);
    process.exit(1);
  }
}

updatePassword(); 