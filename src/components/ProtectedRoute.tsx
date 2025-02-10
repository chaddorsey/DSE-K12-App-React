/**
 * Component for protecting routes with authentication and role-based access
 */

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthContext';
import { MonitoringService } from '../monitoring/MonitoringService';
import { logger } from '../utils/logger';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const monitoring = MonitoringService.getInstance();
  const location = useLocation();

  React.useEffect(() => {
    logger.info('ProtectedRoute check', { 
      isAuthenticated, 
      path: location.pathname 
    });
  }, [isAuthenticated, location]);

  if (!isAuthenticated) {
    logger.info('Redirecting to login', { from: location.pathname });
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}; 