import React from 'react';
import { NetworkStatusIndicator } from '../NetworkStatusIndicator/NetworkStatusIndicator';
import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';
import { useAuth } from '../../features/auth/AuthContext';
import { networkMonitor } from '../../services/network';
import { logger } from '../../utils/logger';
import './AppLayout.css';

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, logout } = useAuth();
  
  const handleError = (error: Error, errorInfo: React.ErrorInfo): void => {
    logger.error('App Error', { error, errorInfo });
    networkMonitor.checkConnection();
  };

  const handleLogout = async (): Promise<void> => {
    try {
      await logout();
    } catch (error) {
      logger.error('Logout failed', { error });
    }
  };

  return (
    <div className="app-layout">
      <header className="app-header">
        <NetworkStatusIndicator />
        {isAuthenticated && (
          <button 
            onClick={handleLogout}
            className="logout-button"
            aria-label="Logout"
          >
            Logout
          </button>
        )}
      </header>
      <ErrorBoundary
        onError={handleError}
        resetOnChange
      >
        {children}
      </ErrorBoundary>
    </div>
  );
}; 