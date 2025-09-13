import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000'; // Use environment variable for API URL

const api = {
  login: async (credentials) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, credentials);
      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Login failed');
      } else {
        throw new Error('Network error');
      }
    }
  },
  register: async (userData) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/register`, userData);
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Registration failed');
      } else {
        throw new Error('Network error');
      }
    }
  },
  getTransactions: async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${apiUrl}/transactions`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('token');
        throw new Error('Unauthorized. Please login again.');
      }
      throw new Error('Failed to fetch transactions');
    }
  },
  addTransaction: async (transactionData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${apiUrl}/transactions`, transactionData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to add transaction');
    }
  },
  getBudget: async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${apiUrl}/budget`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('token');
        throw new Error('Unauthorized. Please login again.');
      }
      throw new Error('Failed to fetch budget');
    }
  },
  updateBudget: async (budget) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${apiUrl}/budget`, budget, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to update budget');
    }
  },

};

export default api;