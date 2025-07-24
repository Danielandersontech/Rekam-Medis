// Authentication utility functions

export const authUtils = {
  // Get current logged in user
  getCurrentUser() {
    try {
      const userString = localStorage.getItem('user');
      return userString ? JSON.parse(userString) : null;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  },

  // Check if user is logged in
  isLoggedIn() {
    return this.getCurrentUser() !== null;
  },

  // Check if user has specific role
  hasRole(role) {
    const user = this.getCurrentUser();
    return user && user.role === role;
  },

  // Check if user is admin
  isAdmin() {
    return this.hasRole('admin');
  },

  // Logout user
  logout() {
    localStorage.removeItem('user');
    // Redirect to login page
    window.location.href = '/login';
  },

  // Get user's display name
  getUserDisplayName() {
    const user = this.getCurrentUser();
    return user ? user.nama : '';
  },

  // Get user's role
  getUserRole() {
    const user = this.getCurrentUser();
    return user ? user.role : '';
  },

  // Set user session
  setUserSession(userData) {
    localStorage.setItem('user', JSON.stringify(userData));
  },

  // Check if session is valid (you can extend this with token expiration logic)
  isSessionValid() {
    const user = this.getCurrentUser();
    if (!user) return false;
    
    // Add any additional session validation logic here
    // For example, check token expiration if you implement JWT tokens
    
    return true;
  }
};

// Simple authentication check function
export const requireAuth = () => {
  const isAuthenticated = authUtils.isLoggedIn();
  if (!isAuthenticated) {
    window.location.href = '/login';
    return false;
  }
  return true;
};

// Simple role check function
export const requireRole = (requiredRole) => {
  const user = authUtils.getCurrentUser();
  if (!user) {
    window.location.href = '/login';
    return false;
  }
  return user.role === requiredRole;
};