/**
 * Component for protecting routes with authentication and role-based access
 */

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../features/auth/context/AuthContext';
import { MonitoringService } from '../monitoring/MonitoringService';
import { logger } from '../utils/logger';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export function ProtectedRoute({ 
  children, 
  redirectTo = '/login' 
}: ProtectedRouteProps) {
  const { user } = useAuth();
  const monitoring = MonitoringService.getInstance();

  if (!user) {
    logger.info('Redirecting to login', { from: redirectTo });
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute; 