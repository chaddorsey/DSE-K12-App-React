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
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
  initialUser?: User | null;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ 
  children, 
  initialUser = null 
}) => {
  usePerformanceMonitoring('AuthProvider');
  
  const [user, setUser] = useState<User | null>(() => {
    if (initialUser) return initialUser;
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

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
      const response = await apiClient.post<{ token: string; user: User }>('auth.login', {
        email,
        password
      });

      localStorage.setItem(TOKEN_KEY, response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      setUser(response.user);

      logger.info('User logged in successfully', { email });
    } catch (error) {
      logger.error('Login failed', { error, email });
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await apiClient.post('auth.logout');
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem('user');
      setUser(null);

      logger.info('User logged out successfully');
    } catch (error) {
      logger.error('Logout failed', { error });
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem('user');
      setUser(null);
    }
  }, []);

  const value = {
    user,
    login,
    logout,
    isAuthenticated: user !== null,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 