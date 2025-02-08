import React from 'react';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { AuthProvider } from '../features/auth/context/AuthContext';
import { NetworkProvider } from '../features/network/NetworkProvider';
import { PerformanceProvider } from '../monitoring/PerformanceProvider';
import { ShareDialogProvider } from '../features/sharing/ShareDialogProvider';
import { usePerformanceMonitoring } from '../monitoring/hooks/useMonitoring';

interface AppProvidersProps {
  children: React.ReactNode;
  initialAuth?: AuthState;
  networkConfig?: NetworkConfig;
}

export const AppProviders: React.FC<AppProvidersProps> = ({
  children,
  initialAuth,
  networkConfig
}) => {
  usePerformanceMonitoring('AppProviders');

  return (
    <ErrorBoundary>
      <AuthProvider initialState={initialAuth}>
        <NetworkProvider config={networkConfig}>
          <PerformanceProvider>
            <ShareDialogProvider>
              {children}
            </ShareDialogProvider>
          </PerformanceProvider>
        </NetworkProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}; 