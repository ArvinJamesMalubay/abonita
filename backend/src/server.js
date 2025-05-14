const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const db = require('./models');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Get environment
const isDevelopment = process.env.NODE_ENV !== 'production';

// Enhanced CORS configuration with more flexibility for development
const corsOptions = {
  origin: isDevelopment
    ? ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:5173', 'http://localhost:5174', 'http://localhost:8080']
    : process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ['http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Allow cookies for authentication
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Log all requests in development
if (isDevelopment) {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });
}

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/customer-auth', require('./routes/customer.auth.routes'));
app.use('/api/customers', require('./routes/customer.routes'));
app.use('/api/products', require('./routes/product.routes'));
app.use('/api/quotations', require('./routes/quotation.routes'));
app.use('/api/sales-orders', require('./routes/salesOrder.routes'));
app.use('/api/suppliers', require('./routes/supplier.routes'));
app.use('/api/debug', require('./routes/debug.routes'));
app.use('/api', require('./routes/user.routes'));

// API test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Welcome to Abonita Sales Application API.' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Sync database and start server
const PORT = process.env.PORT || 5000;

// In development, we can use { force: true } to reset the database
const dbForceReset = process.env.DB_FORCE_RESET === 'true';

sequelize.sync({ force: dbForceReset })
  .then(() => {
    console.log('Database synced successfully' + (dbForceReset ? ' (tables recreated)' : ''));
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`API available at http://localhost:${PORT}/api`);
      if (isDevelopment) {
        console.log('Running in development mode with CORS enabled for:');
        console.log(corsOptions.origin);
      }
    });
  })
  .catch(err => {
    console.error('Failed to sync database:', err);
  }); 