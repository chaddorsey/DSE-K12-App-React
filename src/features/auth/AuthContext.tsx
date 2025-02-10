import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { usePerformanceMonitoring } from '../../monitoring/hooks/useMonitoring';
import { apiClient } from '../../services/api';
import { logger } from '../../utils/logger';
import { refreshAuthToken, setupTokenRefresh } from './tokenRefresh';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'user';
const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const storedUser = localStorage.getItem(USER_KEY);
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      logger.error('Failed to parse stored user', { error });
      return null;
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    return !!token;
  });

  usePerformanceMonitoring('AuthProvider');
  
  useEffect(() => {
    if (user) {
      const stopRefresh = setupTokenRefresh(async () => {
        try {
          await refreshAuthToken();
          logger.info('Token refresh cycle completed');
        } catch (error) {
          logger.error('Token refresh cycle failed', { error });
          logout();
        }
      });

      return () => {
        stopRefresh();
      };
    }
  }, [user]);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const response = await apiClient.post<{ token: string; user: User }>('auth/login', {
        email,
        password
      });

      localStorage.setItem(TOKEN_KEY, response.token);
      localStorage.setItem(USER_KEY, JSON.stringify(response.user));
      setUser(response.user);
      setIsAuthenticated(true);

      logger.info('User logged in successfully', { email });
    } catch (error) {
      logger.error('Login failed', { error, email });
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await apiClient.post('auth/logout');
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      setUser(null);
      setIsAuthenticated(false);

      logger.info('User logged out successfully');
    } catch (error) {
      logger.error('Logout failed', { error });
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      setUser(null);
      setIsAuthenticated(false);
    }
  }, []);

  const value = {
    user,
    login,
    logout,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 