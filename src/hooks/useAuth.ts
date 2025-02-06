/**
 * Hook for accessing authentication context and operations
 */

import { useContext } from 'react';
import { AuthContext } from '../components/AuthProvider';

/**
 * Hook for accessing authentication context and operations
 * 
 * @returns Authentication state and operations
 * @throws Error if used outside of AuthProvider
 */
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
} 