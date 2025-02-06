/**
 * Authentication context and provider
 */

import React from 'react';
import { MonitoringService } from '../../../monitoring/MonitoringService';
import { IUser } from '../types';

interface IAuthState {
  user: IUser | null;
  isLoading: boolean;
  error: Error | null;
}

interface IAuthContext extends IAuthState {
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (username: string, newPassword: string) => Promise<void>;
}

const AuthContext = React.createContext<IAuthContext | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = React.useState<IAuthState>({
    user: null,
    isLoading: false,
    error: null
  });

  const monitoring = MonitoringService.getInstance();

  const login = React.useCallback(async (username: string, password: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    monitoring.trackStateTransition({
      from: 'logged-out',
      to: 'logging-in',
      success: true,
      duration: 0,
      component: 'AuthProvider'
    });

    try {
      // Implementation will be added when we migrate the API layer
      setState(prev => ({ ...prev, isLoading: false }));
      monitoring.trackStateTransition({
        from: 'logging-in',
        to: 'logged-in',
        success: true,
        duration: 0,
        component: 'AuthProvider'
      });
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: error as Error 
      }));
      monitoring.trackStateTransition({
        from: 'logging-in',
        to: 'error',
        success: false,
        duration: 0,
        error: error as Error,
        component: 'AuthProvider'
      });
    }
  }, []);

  const logout = React.useCallback(async () => {
    // Implementation will be added
  }, []);

  const resetPassword = React.useCallback(async (username: string, newPassword: string) => {
    // Implementation will be added
  }, []);

  const value = React.useMemo(() => ({
    ...state,
    login,
    logout,
    resetPassword
  }), [state, login, logout, resetPassword]);

  return (
    <AuthContext.Provider value={value}>
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