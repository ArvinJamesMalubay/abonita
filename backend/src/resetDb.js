const sequelize = require('./config/database');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

async function resetDatabase() {
  try {
    console.log('Starting database reset...');
    
    // Force sync - this will drop all tables and recreate them
    await sequelize.sync({ force: true });
    
    console.log('Database reset successful! All tables have been recreated.');
    process.exit(0);
  } catch (error) {
    console.error('Error resetting database:', error);
    process.exit(1);
  }
}

resetDatabase(); 