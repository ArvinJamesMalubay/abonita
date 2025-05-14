const { Sequelize } = require('sequelize');
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

// Load environment variables if .env exists
dotenv.config();

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'abonita_sales',
  port: 3306
};

console.log('Connection config:', {
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password ? '[HIDDEN]' : '',
  database: dbConfig.database,
  port: dbConfig.port
});

// First ensure database exists
async function ensureDatabase() {
  try {
    // Connect without database to create it if needed
    const connection = await mysql.createConnection({
      host: dbConfig.host,
      user: dbConfig.user,
      password: dbConfig.password,
      port: dbConfig.port
    });
    
    console.log('MySQL connection successful');
    
    // Create database if it doesn't exist
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbConfig.database}`);
    console.log(`Ensured database '${dbConfig.database}' exists`);
    
    await connection.end();
    
    // Test Sequelize connection
    const sequelize = new Sequelize(
      dbConfig.database,
      dbConfig.user,
      dbConfig.password,
      {
        host: dbConfig.host,
        dialect: 'mysql',
        port: dbConfig.port,
        logging: console.log
      }
    );
    
    await sequelize.authenticate();
    console.log('Sequelize connection has been established successfully.');
    
    await sequelize.close();
    
    console.log('Connection test completed successfully. Your database is ready to use.');
    return true;
  } catch (error) {
    console.error('Database connection error:', error.message);
    if (error.parent) {
      console.error('Details:', error.parent.message);
    }
    return false;
  }
}

// Run the function
ensureDatabase(); 