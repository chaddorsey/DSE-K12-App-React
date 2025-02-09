import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { usePerformanceMonitoring } from '../../monitoring/hooks/useMonitoring';
import { apiClient } from '../../services/api';
import { logger } from '../../utils/logger';
import type { IUser } from './types';
import { refreshAuthToken, setupTokenRefresh } from './tokenRefresh';

interface IAuthContext {
  user: IUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<IAuthContext | null>(null);

interface IAuthProviderProps {
  children: React.ReactNode;
  initialUser?: IUser | null;
}

const TOKEN_KEY = 'auth_token';

export function AuthProvider({ children, initialUser = null }: IAuthProviderProps) {
  usePerformanceMonitoring('AuthProvider');
  const [user, setUser] = useState<IUser | null>(initialUser);

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
      const response = await apiClient.post<{ token: string; user: IUser }>('auth.login', {
        email,
        password
      });

      localStorage.setItem(TOKEN_KEY, response.token);
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
      setUser(null);

      logger.info('User logged out successfully');
    } catch (error) {
      logger.error('Logout failed', { error });
      localStorage.removeItem(TOKEN_KEY);
      setUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: user !== null,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): IAuthContext {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 