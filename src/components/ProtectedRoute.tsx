/**
 * Component for protecting routes with authentication and role-based access
 */

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../features/auth/context/AuthContext';
import { hasRole } from '../features/auth/utils/roles';

interface ProtectedRouteProps extends React.PropsWithChildren {
  requiredRole?: UserRole;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || (requiredRole && !hasRole(user, requiredRole))) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute; 