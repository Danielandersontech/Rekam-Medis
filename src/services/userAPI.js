import axios from "axios";

const API_URL = "https://znhejugzzdxpiufabkea.supabase.co/rest/v1/users";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpuaGVqdWd6emR4cGl1ZmFia2VhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMzMTc5OTAsImV4cCI6MjA2ODg5Mzk5MH0.XS21EZHK5eiLeeXrBAjyC7pnCc01ibacaxfH0xoX9Ko";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
  "Prefer": "return=representation"
};

export const userAPI = {
  // Login user by username and password
  async loginUser(username, password) {
    try {
      const response = await axios.get(`${API_URL}?username=eq.${username}&password=eq.${password}`, { 
        headers,
        params: {
          select: 'id,username,nama,role,created_at'
        }
      });
      
      if (response.data.length === 0) {
        throw new Error('Invalid username or password');
      }
      
      return response.data[0];
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Login failed');
      }
      throw error;
    }
  },

  // Register new user
  async registerUser(userData) {
    try {
      const newUser = {
        username: userData.username,
        password: userData.password,
        nama: userData.nama,
        role: userData.role || 'admin'
      };
      
      const response = await axios.post(API_URL, newUser, { headers });
      return response.data[0];
    } catch (error) {
      if (error.response?.status === 409) {
        throw new Error('Username already exists');
      }
      if (error.response) {
        throw new Error(error.response.data.message || 'Registration failed');
      }
      throw error;
    }
  },

  // Check if username already exists
  async checkUniqueUsername(username) {
    try {
      const response = await axios.get(`${API_URL}?username=eq.${username}`, { 
        headers,
        params: {
          select: 'id'
        }
      });
      return response.data.length > 0;
    } catch (error) {
      console.error('Error checking username:', error);
      return false;
    }
  },

  // Get user by username (for password reset)
  async getUserByUsername(username) {
    try {
      const response = await axios.get(`${API_URL}?username=eq.${username}`, { 
        headers,
        params: {
          select: 'id,username,nama'
        }
      });
      
      if (response.data.length === 0) {
        throw new Error('User not found');
      }
      
      return response.data[0];
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || 'User not found');
      }
      throw error;
    }
  },

  // Update user password (for password reset)
  async updatePassword(username, newPassword) {
    try {
      const response = await axios.patch(
        `${API_URL}?username=eq.${username}`, 
        { password: newPassword }, 
        { headers }
      );
      return response.data[0];
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Password update failed');
      }
      throw error;
    }
  }
};