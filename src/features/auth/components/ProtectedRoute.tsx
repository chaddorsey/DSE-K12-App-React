import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireRole?: 'user' | 'manager' | 'admin';  // Make role requirement optional
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children,
  requireRole 
}) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  // If no specific role is required, allow any authenticated user
  if (!requireRole) {
    return <>{children}</>;
  }

  // If a specific role is required, check for it
  if (user.role !== requireRole) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}; 