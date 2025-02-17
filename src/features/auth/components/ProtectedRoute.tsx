import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import type { UserRole } from '../types/auth';
import { logger } from '../../../utils/logger';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedRoles = ['user', 'admin'] 
}) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  logger.debug('ProtectedRoute check:', { 
    userRole: user?.role,
    allowedRoles,
    isLoading: loading,
    isAuthenticated: !!user,
    user: user
  });

  if (loading) {
    logger.debug('ProtectedRoute: Still loading');
    return <div>Loading...</div>;
  }

  if (!user) {
    logger.info('User not authenticated, redirecting to login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const hasRequiredRole = allowedRoles.includes(user.role);
  logger.debug('Role check:', {
    userRole: user.role,
    allowedRoles,
    hasRequiredRole
  });

  if (!hasRequiredRole) {
    logger.info('User not authorized:', { 
      userRole: user.role, 
      requiredRoles: allowedRoles 
    });
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}; 