import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { logger } from '../../../utils/logger';

export const ProtectedRoute: React.FC = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  logger.info('ProtectedRoute render:', {
    loading,
    hasUser: !!user,
    path: location.pathname
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    logger.info('No user, redirecting to login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  logger.info('User authenticated, rendering protected content');
  return <Outlet />;
}; 