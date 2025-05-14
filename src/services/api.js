/**
 * API Service for ConnectPlum
 * Handles all API requests to the backend server
 */

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

/**
 * Make a request to the API
 * @param {string} endpoint - API endpoint
 * @param {Object} options - Fetch options
 * @returns {Promise<any>} - Response data
 */
async function apiRequest(endpoint, options = {}) {
  try {
    const url = `${API_URL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    // Add auth token if available
    const token = localStorage.getItem('auth_token');
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    // Handle non-JSON responses
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.detail || 'API request failed');
      }
      
      return data;
    }
    
    // Handle non-JSON responses
    if (!response.ok) {
      const text = await response.text();
      throw new Error(text || 'API request failed');
    }
    
    return await response.text();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

/**
 * User related API calls
 */
export const userApi = {
  /**
   * Get a paginated list of random users
   * @param {number} limit
   * @param {number} offset
   * @returns {Promise<Object>} List of users
   */
  randomUsers: (limit = 10, offset = 0) => apiRequest(`/api/users/random?limit=${limit}&offset=${offset}`),
  /**
   * Get the current user profile
   * @returns {Promise<Object>} User profile
   */
  getCurrentUser: () => apiRequest('/api/users/me'),
  
  /**
   * Update wallet addresses
   * @param {string} evmAddress - EVM wallet address
   * @param {string} phantomAddress - Phantom wallet address
   * @returns {Promise<Object>} Result object
   */
  updateWalletAddresses: (evmAddress, phantomAddress) => apiRequest('/api/users/wallet', {
    method: 'POST',
    body: JSON.stringify({ evm_wallet_address: evmAddress, phantom_wallet_address: phantomAddress }),
  }),
};

/**
 * Authentication related API calls
 */
export const authApi = {
  /**
   * Twitter authentication
   * @param {string} redirectUri - Redirect URI after authentication
   * @returns {Promise<Object>} Auth URL object
   */
  twitterAuth: (redirectUri) => apiRequest('/api/auth/twitter', {
    method: 'POST',
    body: JSON.stringify({ redirect_uri: redirectUri }),
  }),
  
  /**
   * Check authentication status
   * @returns {Promise<Object>} Auth status object
   */
  checkAuthStatus: () => apiRequest('/api/auth/status'),
};

/**
 * Call related API calls
 */
export const callApi = {
  /**
   * Start a new call
   * @param {string} userId - User ID
   * @returns {Promise<Object>} Call object
   */
  startCall: (userId) => apiRequest('/api/calls/start', {
    method: 'POST',
    body: JSON.stringify({ user_id: userId }),
  }),
};

export default {
  user: userApi,
  auth: authApi,
  call: callApi,
};
