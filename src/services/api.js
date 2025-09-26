import axios from 'axios';

// Base API configuration
const API_BASE_URL = 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.data || error.message);
    
    // Handle different error types
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout - please try again');
    }
    
    if (!error.response) {
      throw new Error('Network error - please check your connection');
    }
    
    const { status, data } = error.response;
    
    switch (status) {
      case 404:
        throw new Error('Resource not found');
      case 500:
        throw new Error('Server error - please try again later');
      default:
        throw new Error(data?.message || 'An unexpected error occurred');
    }
  }
);

// Generic CRUD operations
export const apiService = {
  // GET all items
  getAll: async (endpoint) => {
    const response = await api.get(`/${endpoint}`);
    return response.data;
  },

  // GET single item by ID
  getById: async (endpoint, id) => {
    const response = await api.get(`/${endpoint}/${id}`);
    return response.data;
  },

  // POST new item
  create: async (endpoint, data) => {
    const response = await api.post(`/${endpoint}`, data);
    return response.data;
  },

  // PUT update item
  update: async (endpoint, id, data) => {
    const response = await api.put(`/${endpoint}/${id}`, data);
    return response.data;
  },

  // DELETE item
  delete: async (endpoint, id) => {
    await api.delete(`/${endpoint}/${id}`);
    return id;
  },

  // PATCH partial update
  patch: async (endpoint, id, data) => {
    const response = await api.patch(`/${endpoint}/${id}`, data);
    return response.data;
  },
};

// Specific API endpoints
export const usersAPI = {
  getAll: () => apiService.getAll('users'),
  getById: (id) => apiService.getById('users', id),
  create: (data) => apiService.create('users', data),
  update: (id, data) => apiService.update('users', id, data),
  delete: (id) => apiService.delete('users', id),
};

export const vendorsAPI = {
  getAll: () => apiService.getAll('vendors'),
  getById: (id) => apiService.getById('vendors', id),
  create: (data) => apiService.create('vendors', data),
  update: (id, data) => apiService.update('vendors', id, data),
  delete: (id) => apiService.delete('vendors', id),
};

export const ordersAPI = {
  getAll: () => apiService.getAll('orders'),
  getById: (id) => apiService.getById('orders', id),
  create: (data) => apiService.create('orders', data),
  update: (id, data) => apiService.update('orders', id, data),
  delete: (id) => apiService.delete('orders', id),
};

export const deliveryPartnersAPI = {
  getAll: () => apiService.getAll('deliveryPartners'),
  getById: (id) => apiService.getById('deliveryPartners', id),
  create: (data) => apiService.create('deliveryPartners', data),
  update: (id, data) => apiService.update('deliveryPartners', id, data),
  delete: (id) => apiService.delete('deliveryPartners', id),
};

export default api;