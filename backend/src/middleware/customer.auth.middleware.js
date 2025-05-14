const jwt = require('jsonwebtoken');

exports.authenticateCustomerJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No token provided.'
    });
  }

  try {
    // Format: "Bearer TOKEN"
    const token = authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. Invalid token format.'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    
    // Check if token is for a customer
    if (decoded.type !== 'customer') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Invalid token type.'
      });
    }
    
    // Add customer data to request
    req.customerId = decoded.id;
    
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(403).json({
      success: false,
      message: 'Invalid token.',
      error: error.message
    });
  }
}; 