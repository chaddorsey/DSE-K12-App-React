import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './features/auth/context/AuthContext';
import { NetworkProvider } from './features/network/NetworkProvider';
import { AppLayout } from './components/Layout/AppLayout';
import { AppRoutes } from './routes';
import { usePerformanceMonitoring } from './monitoring/hooks/useMonitoring';

export const App: React.FC = () => {
  usePerformanceMonitoring('App');

  return (
    <BrowserRouter>
      <NetworkProvider>
        <AuthProvider>
          <AppLayout>
            <AppRoutes />
          </AppLayout>
        </AuthProvider>
      </NetworkProvider>
    </BrowserRouter>
  );
}; 