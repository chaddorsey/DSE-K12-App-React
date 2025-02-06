/**
 * Component for protecting routes with authentication and role-based access
 */

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { MonitoringService } from '../monitoring/MonitoringService';

interface IProtectedRouteProps {
  children?: React.ReactNode;
  requiredRoles?: string[];
  redirectTo?: string;
}

export function ProtectedRoute({ 
  children, 
  requiredRoles = [], 
  redirectTo = '/login' 
}: IProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  const monitoring = MonitoringService.getInstance();

  // Track access attempt
  React.useEffect(() => {
    monitoring.trackInteraction({
      type: 'route_access_attempt',
      success: !!user,
      metadata: {
        path: location.pathname
      }
    });
  }, [location.pathname]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  if (requiredRoles.length > 0 && !requiredRoles.some(role => user.roles?.includes(role))) {
    monitoring.trackError(new Error('Unauthorized access attempt'), {
      type: 'auth_error',
      operation: 'role_check',
      metadata: {
        path: location.pathname,
        requiredRoles,
        userRoles: user.roles
      }
    });
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
} 