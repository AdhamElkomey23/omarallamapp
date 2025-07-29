// Production configuration for deployment
export const PRODUCTION_CONFIG = {
  // Using relative URLs for better compatibility
  API_BASE_URL: '/api',
  
  // Environment detection
  IS_PRODUCTION: import.meta.env.PROD,
  IS_DEVELOPMENT: import.meta.env.DEV,
  
  // Use relative URLs in production, localhost in development
  getApiUrl: () => {
    if (import.meta.env.PROD) {
      return '/api';
    }
    return 'http://localhost:5000/api';
  }
};