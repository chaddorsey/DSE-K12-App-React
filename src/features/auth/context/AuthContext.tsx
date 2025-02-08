/**
 * Authentication context and provider
 */

import React, { createContext, useContext, useState, useCallback, useMemo, useRef } from 'react';
import type { AuthState } from '../../../providers/types';
import { MonitoringService } from '../../../monitoring/MonitoringService';
import type { IStateTransition } from '../../../monitoring/types';
import { usePerformanceMonitoring } from '../../../monitoring/hooks/useMonitoring';

export interface IAuthContext {
  isAuthenticated: boolean;
  user: NonNullable<AuthState['user']> | null;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<IAuthContext | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
  initialState?: AuthState;
}

const defaultAuthState: AuthState = {
  isAuthenticated: false,
  user: null
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ 
  children,
  initialState 
}) => {
  usePerformanceMonitoring('AuthProvider');
  
  const [state, setState] = useState<AuthState>(() => 
    initialState || defaultAuthState
  );

  // Use ref to avoid dependency issues with monitoring service
  const monitoringRef = useRef(MonitoringService.getInstance());

  const trackTransition = useCallback((transition: Omit<IStateTransition, 'timestamp' | 'component'>) => {
    monitoringRef.current.trackStateTransition({
      ...transition,
      component: 'AuthProvider'
    });
  }, []); // Empty deps since we're using ref

  const login = useCallback(async (credentials: { email: string; password: string }) => {
    const startTime = Date.now();
    try {
      trackTransition({
        from: 'unauthenticated',
        to: 'authenticating',
        metadata: { email: credentials.email }
      });

      const newState: AuthState = {
        isAuthenticated: true,
        user: {
          id: '1',
          email: credentials.email,
          roles: ['user']
        }
      };

      setState(newState);

      trackTransition({
        from: 'authenticating',
        to: 'authenticated',
        success: true,
        duration: Date.now() - startTime
      });
    } catch (error) {
      if (error instanceof Error) {
        trackTransition({
          from: 'authenticating',
          to: 'unauthenticated',
          success: false,
          error,
          duration: Date.now() - startTime
        });
      }
      throw error;
    }
  }, [trackTransition]);

  const logout = useCallback(async () => {
    const startTime = Date.now();
    try {
      trackTransition({
        from: 'authenticated',
        to: 'unauthenticating'
      });

      setState(defaultAuthState);

      trackTransition({
        from: 'unauthenticating',
        to: 'unauthenticated',
        success: true,
        duration: Date.now() - startTime
      });
    } catch (error) {
      if (error instanceof Error) {
        trackTransition({
          from: 'unauthenticating',
          to: 'authenticated',
          success: false,
          error,
          duration: Date.now() - startTime
        });
      }
      throw error;
    }
  }, [trackTransition]);

  const value = useMemo(() => ({
    isAuthenticated: state.isAuthenticated,
    user: state.user,
    login,
    logout
  }), [state, login, logout]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}; 