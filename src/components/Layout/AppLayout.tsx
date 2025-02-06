import React from 'react';
import { NetworkStatusIndicator } from '../NetworkStatusIndicator/NetworkStatusIndicator';
import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';
import { networkMonitor } from '../../services/network';
import { logger } from '../../utils/logger';
import './AppLayout.css';

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const handleError = (error: Error, errorInfo: React.ErrorInfo): void => {
    logger.error('Application error:', error, {
      componentStack: errorInfo.componentStack
    });
  };

  return (
    <div className="app-layout">
      <NetworkStatusIndicator 
        monitor={networkMonitor}
        position="top"
        showLatency={process.env.NODE_ENV === 'development'}
      />
      <ErrorBoundary
        onError={handleError}
        resetOnChange
      >
        {children}
      </ErrorBoundary>
    </div>
  );
}; 