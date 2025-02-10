import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { NetworkStatusIndicator } from './components/NetworkStatusIndicator';
import { ErrorBoundary } from './components/ErrorBoundary';
import { AuthProvider, useAuth } from './features/auth/AuthContext';
import { NetworkProvider } from './features/network/NetworkProvider';
import { LoginForm } from './features/auth/LoginForm';
import { Dashboard } from './components/Dashboard';
import { ProtectedRoute } from './features/auth/ProtectedRoute';
import { usePerformanceMonitoring } from './monitoring/hooks/useMonitoring';
import { Header } from './features/auth/components/Header';

const AppContent: React.FC = () => {
  usePerformanceMonitoring('App');
  const { user, logout } = useAuth();

  return (
    <div className="App">
      <Header 
        user={user}
        onLogout={logout}
      />
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
          <Route 
            path="/" 
            element={<Navigate to="/dashboard" replace />} 
          />
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