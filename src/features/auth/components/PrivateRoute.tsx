import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, initialLoadComplete } = useAuth();
  const location = useLocation();

  // Don't redirect until we've completed the initial auth check
  if (!initialLoadComplete) {
    return null;
  }

  if (!user) {
    // Save the attempted URL for redirecting after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}; 