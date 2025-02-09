import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { NetworkStatusIndicator } from './components/NetworkStatusIndicator';
import { ErrorBoundary } from './components/ErrorBoundary';
import { AuthProvider } from './features/auth/AuthContext';
import { NetworkProvider } from './features/network/NetworkProvider';
import { LoginForm } from './features/auth/LoginForm';
import { Dashboard } from './components/Dashboard';
import { ProtectedRoute } from './features/auth/ProtectedRoute';
import { usePerformanceMonitoring } from './monitoring/hooks/useMonitoring';

export const App: React.FC = () => {
  usePerformanceMonitoring('App');

  return (
    <BrowserRouter>
      <NetworkProvider>
        <AuthProvider>
          <ErrorBoundary>
            <div className="app">
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
          </ErrorBoundary>
        </AuthProvider>
      </NetworkProvider>
    </BrowserRouter>
  );
}; 