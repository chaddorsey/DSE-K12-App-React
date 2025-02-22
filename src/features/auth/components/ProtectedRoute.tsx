import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { logger } from '@/utils/logger';
import { LoadingSpinner } from '@/components/LoadingSpinner';

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  logger.info('ProtectedRoute render:', {
    loading,
    hasUser: !!user,
    uid: user?.uid,
    path: location.pathname
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user?.uid) {
    logger.info('No user or incomplete user data, redirecting to login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Simply render the protected content - no onboarding redirect
  logger.info('User authenticated, rendering protected content');
  return <>{children}</>;
}; 