/**
 * Provider component for authentication state and operations
 */

import React, { createContext, useCallback, useEffect, useState } from 'react';
import { MonitoringService } from '../monitoring/MonitoringService';
import { api } from '../api/authApi';

interface IUser {
  id: number;
  email: string;
}

interface ICredentials {
  email: string;
  password: string;
}

interface IAuthState {
  user: IUser | null;
  isLoading: boolean;
  error?: Error;
}

interface IAuthContext extends IAuthState {
  login: (credentials: ICredentials) => Promise<void>;
  logout: () => Promise<void>;
  signup: (data: ICredentials) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

export const AuthContext = createContext<IAuthContext | null>(null);

interface IAuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: IAuthProviderProps) {
  const monitoring = MonitoringService.getInstance();
  const [state, setState] = useState<IAuthState>({
    user: null,
    isLoading: true
  });

  // Restore session from storage
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      api.validateToken(token)
        .then(({ user }) => {
          setState({
            user,
            isLoading: false
          });
        })
        .catch(() => {
          localStorage.removeItem('auth_token');
          setState({ user: null, isLoading: false });
        });
    } else {
      setState({ user: null, isLoading: false });
    }
  }, []);

  const login = useCallback(async (credentials: ICredentials) => {
    const startTime = Date.now();
    setState(prev => ({ ...prev, isLoading: true }));

    try {
      const { user, token } = await api.login(credentials);
      localStorage.setItem('auth_token', token);
      setState({
        user,
        isLoading: false
      });

      monitoring.trackPerformance({
        type: 'auth_login',
        success: true,
        totalTime: Date.now() - startTime
      });
    } catch (error) {
      setState({
        user: null,
        isLoading: false,
        error: error as Error
      });

      monitoring.trackError(error as Error, {
        type: 'auth_error',
        operation: 'login'
      });

      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    const startTime = Date.now();
    setState(prev => ({ ...prev, isLoading: true }));

    try {
      await api.logout();
      localStorage.removeItem('auth_token');
      setState({
        user: null,
        isLoading: false
      });

      monitoring.trackPerformance({
        type: 'auth_logout',
        success: true,
        totalTime: Date.now() - startTime
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error as Error
      }));

      monitoring.trackError(error as Error, {
        type: 'auth_error',
        operation: 'logout'
      });

      throw error;
    }
  }, []);

  const signup = useCallback(async (data: ICredentials) => {
    const startTime = Date.now();
    setState(prev => ({ ...prev, isLoading: true }));

    try {
      const { user, token } = await api.signup(data);
      localStorage.setItem('auth_token', token);
      setState({
        user,
        isLoading: false
      });

      monitoring.trackPerformance({
        type: 'auth_signup',
        success: true,
        totalTime: Date.now() - startTime
      });
    } catch (error) {
      setState({
        user: null,
        isLoading: false,
        error: error as Error
      });

      monitoring.trackError(error as Error, {
        type: 'auth_error',
        operation: 'signup'
      });

      throw error;
    }
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    const startTime = Date.now();
    setState(prev => ({ ...prev, isLoading: true }));

    try {
      await api.resetPassword(email);
      setState(prev => ({ ...prev, isLoading: false }));

      monitoring.trackPerformance({
        type: 'auth_reset_password',
        success: true,
        totalTime: Date.now() - startTime
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error as Error
      }));

      monitoring.trackError(error as Error, {
        type: 'auth_error',
        operation: 'reset_password'
      });

      throw error;
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        signup,
        resetPassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
} 