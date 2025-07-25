// Production configuration for deployment
export const PRODUCTION_CONFIG = {
  // Replace 'yourdomain.com' with your actual Hostinger domain
  API_BASE_URL: 'https://yourdomain.com/api',
  
  // Environment detection
  IS_PRODUCTION: import.meta.env.PROD,
  IS_DEVELOPMENT: import.meta.env.DEV,
  
  // Fallback to development URL if in dev mode
  getApiUrl: () => {
    if (import.meta.env.PROD) {
      return 'https://yourdomain.com/api';
    }
    return 'http://localhost:5000/api';
  }
};