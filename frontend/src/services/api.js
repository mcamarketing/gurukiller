import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const paymentAPI = {
  // Create checkout session
  createCheckoutSession: async (packageId) => {
    const originUrl = window.location.origin;
    const response = await apiClient.post('/checkout/session', {
      package_id: packageId,
      origin_url: originUrl
    });
    return response.data;
  },

  // Check payment status
  checkPaymentStatus: async (sessionId) => {
    const response = await apiClient.get(`/checkout/status/${sessionId}`);
    return response.data;
  },

  // Get public stats
  getPublicStats: async () => {
    const response = await apiClient.get('/stats/public');
    return response.data;
  },

  // Get available packages
  getPackages: async () => {
    const response = await apiClient.get('/packages');
    return response.data;
  },

  // Generate downloads
  generateDownloads: async (email, sessionId, packageType) => {
    const response = await apiClient.post('/downloads/generate', {
      email,
      session_id: sessionId,
      package_type: packageType
    });
    return response.data;
  },

  // Get existing downloads
  getDownloads: async (sessionId) => {
    const response = await apiClient.get(`/downloads/${sessionId}`);
    return response.data;
  }
};

// Polling utility for payment status
export const pollPaymentStatus = async (sessionId, maxAttempts = 10, interval = 2000) => {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      const status = await paymentAPI.checkPaymentStatus(sessionId);
      
      if (status.payment_status === 'paid') {
        return { success: true, status };
      } else if (status.status === 'expired') {
        return { success: false, status, error: 'Payment session expired' };
      }
      
      // If still pending, wait before next attempt
      if (attempt < maxAttempts - 1) {
        await new Promise(resolve => setTimeout(resolve, interval));
      }
    } catch (error) {
      console.error(`Payment status check attempt ${attempt + 1} failed:`, error);
      if (attempt === maxAttempts - 1) {
        return { success: false, error: 'Failed to check payment status' };
      }
    }
  }
  
  return { success: false, error: 'Payment status check timed out' };
};

export default apiClient;