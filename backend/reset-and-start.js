const { spawn } = require('child_process');
const path = require('path');

console.log('Starting database reset and server...');

// Set environment variable to force reset
process.env.DB_FORCE_RESET = 'true';

// Start the server with the force reset flag
const serverProcess = spawn('node', [path.join(__dirname, 'src', 'server.js')], {
  env: { ...process.env, DB_FORCE_RESET: 'true' },
  stdio: 'inherit'
});

serverProcess.on('error', (error) => {
  console.error('Failed to start server:', error);
});

// Reset the flag after 5 seconds to prevent future resets
setTimeout(() => {
  process.env.DB_FORCE_RESET = 'false';
  console.log('Reset flag turned off for future restarts');
}, 5000); 