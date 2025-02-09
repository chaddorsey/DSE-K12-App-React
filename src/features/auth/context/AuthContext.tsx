/**
 * Authentication context and provider
 */

import React, { createContext, useCallback, useEffect, useState } from 'react';
import { MonitoringService } from '../../../monitoring/MonitoringService';
import { apiClient } from '../../../services/api';
import { logger } from '../../../utils/logger';
import type { IUser } from '../types';

interface IAuthContext {
  user: IUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: Error | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (userData: Partial<IUser>) => Promise<void>;
}

const AuthContext = createContext<IAuthContext | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const login = useCallback(async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await apiClient.post<IUser>('auth.login', { email, password });
      setUser(response);
      MonitoringService.getInstance().trackEvent('auth_login_success');
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Login failed'));
      MonitoringService.getInstance().trackError('auth_login_failed', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await apiClient.post('auth.logout');
      setUser(null);
      MonitoringService.getInstance().trackEvent('auth_logout_success');
    } catch (err) {
      logger.error('Logout failed', err);
      MonitoringService.getInstance().trackError('auth_logout_failed', err);
    }
  }, []);

  const signup = useCallback(async (userData: Partial<IUser>) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await apiClient.post<IUser>('auth.signup', userData);
      setUser(response);
      MonitoringService.getInstance().trackEvent('auth_signup_success');
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Signup failed'));
      MonitoringService.getInstance().trackError('auth_signup_failed', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await apiClient.get<IUser>('auth.check');
        setUser(user);
      } catch (err) {
        logger.error('Auth check failed', err);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider 
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        error,
        login,
        logout,
        signup
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): IAuthContext => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext; 