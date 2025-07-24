// Production configuration for PHP backend deployment
// Replace 'yourdomain.com' with your actual domain

const PRODUCTION_CONFIG = {
  // API Base URL for your Hostinger domain
  API_BASE_URL: 'https://yourdomain.com/api',
  
  // Database connection for Hostinger MySQL
  DATABASE: {
    host: 'localhost',
    database: 'yourusername_fertilizer',
    username: 'yourusername_dbuser', 
    password: 'your_secure_password'
  },
  
  // CORS settings (already configured in PHP files)
  CORS: {
    origin: ['https://yourdomain.com', 'https://www.yourdomain.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    headers: ['Content-Type', 'Authorization']
  }
};

// Instructions for deployment:
// 1. Replace 'yourdomain.com' with your actual domain
// 2. Update database credentials with your Hostinger MySQL details
// 3. Build the React app with: npm run build
// 4. Upload php-backend files to public_html/
// 5. Upload dist/ contents to public_html/
// 6. Import schema.sql to your MySQL database

export default PRODUCTION_CONFIG;