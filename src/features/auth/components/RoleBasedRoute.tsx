import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { ROUTE_PERMISSIONS } from '../types/auth';

interface RoleBasedRouteProps {
  children: React.ReactNode;
  path: string;
}

export const RoleBasedRoute: React.FC<RoleBasedRouteProps> = ({ children, path }) => {
  const { user, initialLoadComplete } = useAuth();
  const location = useLocation();
  const permissions = ROUTE_PERMISSIONS[path];

  if (!initialLoadComplete) {
    return null;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check role permission
  const hasRequiredRole = permissions.allowedRoles.includes(user.role);
  if (!hasRequiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Check email verification if required
  const meetsVerificationRequirement = !permissions.requiresVerification || user.emailVerified;
  if (!meetsVerificationRequirement) {
    return <Navigate to="/verify-email" replace />;
  }

  return <>{children}</>;
}; 