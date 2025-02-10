import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { NetworkStatusIndicator } from './components/NetworkStatusIndicator';
import { ErrorBoundary } from './components/ErrorBoundary';
import { AuthProvider } from './features/auth/AuthContext';
import { NetworkProvider } from './features/network/NetworkProvider';
import { LoginForm } from './features/auth/LoginForm';
import { Dashboard } from './components/Dashboard';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Header } from './components/Header';
import { usePerformanceMonitoring } from './monitoring/hooks/useMonitoring';
import { logger } from './utils/logger';

const AppContent: React.FC = () => {
  usePerformanceMonitoring('App');
  const location = useLocation();

  React.useEffect(() => {
    logger.info('Route changed', { path: location.pathname });
  }, [location]);

  return (
    <div className="App">
      <Header />
      <div className="app-content">
        <NetworkStatusIndicator />
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <NetworkProvider>
        <AuthProvider>
          <ErrorBoundary>
            <AppContent />
          </ErrorBoundary>
        </AuthProvider>
      </NetworkProvider>
    </BrowserRouter>
  );
}; 