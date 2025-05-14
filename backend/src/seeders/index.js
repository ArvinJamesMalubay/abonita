const sequelize = require('../config/database');
const seedProducts = require('./product.seed');

async function runSeeders() {
  try {
    console.log('Starting database seeding...');
    
    // Make sure the database connection is established
    await sequelize.authenticate();
    console.log('Database connection established');
    
    // Run seeders in sequence
    await seedProducts();
    
    console.log('All seeders executed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error running seeders:', error);
    process.exit(1);
  }
}

// Run the seeders if this script is called directly
if (require.main === module) {
  runSeeders();
}

module.exports = runSeeders; 