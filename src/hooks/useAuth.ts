/**
 * Hook for accessing authentication context and operations
 */

import { useState, useCallback } from 'react';
import { AuthContext } from '../components/AuthProvider';
import { MonitoringService } from '../monitoring/MonitoringService';

interface IAuthCredentials {
  email: string;
  password: string;
}

interface IUser {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

interface IUseAuthResult {
  user: IUser | null;
  isLoading: boolean;
  error: Error | null;
  signup: (credentials: IAuthCredentials) => Promise<void>;
  login: (credentials: IAuthCredentials) => Promise<void>;
  logout: () => Promise<void>;
}

/**
 * Hook for accessing authentication context and operations
 * 
 * @returns Authentication state and operations
 * @throws Error if used outside of AuthProvider
 */
export function useAuth(): IUseAuthResult {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const monitoring = MonitoringService.getInstance();

  const signup = useCallback(async (credentials: IAuthCredentials) => {
    setIsLoading(true);
    setError(null);

    try {
      monitoring.trackPerformance({
        type: 'api_call',
        name: 'signup',
        isInitial: true,
        timestamp: Date.now()
      });

      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUser({ id: '1', email: credentials.email });

      monitoring.trackPerformance({
        type: 'api_call',
        name: 'signup',
        success: true,
        timestamp: Date.now()
      });

    } catch (err) {
      const error = err as Error;
      setError(error);
      monitoring.trackPerformance({
        type: 'api_call',
        name: 'signup',
        success: false,
        error,
        timestamp: Date.now()
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(async (credentials: IAuthCredentials) => {
    setIsLoading(true);
    setError(null);

    try {
      monitoring.trackPerformance({
        type: 'api_call',
        name: 'login',
        isInitial: true,
        timestamp: Date.now()
      });

      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUser({ id: '1', email: credentials.email });

      monitoring.trackPerformance({
        type: 'api_call',
        name: 'login',
        success: true,
        timestamp: Date.now()
      });

    } catch (err) {
      const error = err as Error;
      setError(error);
      monitoring.trackPerformance({
        type: 'api_call',
        name: 'login',
        success: false,
        error,
        timestamp: Date.now()
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      monitoring.trackPerformance({
        type: 'api_call',
        name: 'logout',
        isInitial: true,
        timestamp: Date.now()
      });

      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUser(null);

      monitoring.trackPerformance({
        type: 'api_call',
        name: 'logout',
        success: true,
        timestamp: Date.now()
      });

    } catch (err) {
      const error = err as Error;
      setError(error);
      monitoring.trackPerformance({
        type: 'api_call',
        name: 'logout',
        success: false,
        error,
        timestamp: Date.now()
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    user,
    isLoading,
    error,
    signup,
    login,
    logout
  };
} 