import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { usePerformanceMonitoring } from '../../monitoring/hooks/useMonitoring';
import { logger } from '../../utils/logger';
import type { IUser } from './types';

interface IProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: IUser['role'];
}

export const ProtectedRoute: React.FC<IProtectedRouteProps> = ({ children, requiredRole }) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();
  usePerformanceMonitoring('ProtectedRoute');

  if (!isAuthenticated) {
    logger.info('Unauthorized access attempt', { path: location.pathname });
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    logger.warn('Insufficient permissions', {
      path: location.pathname,
      userRole: user?.role,
      requiredRole
    });
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}; 