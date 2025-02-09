import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NetworkStatusIndicator } from './components/NetworkStatusIndicator';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ShareButton } from './components/sharing/ShareButton';
import { ShareDialogProvider } from './components/sharing/ShareDialogProvider';
import { Dashboard } from './components/Dashboard';
import { UserProfile } from './components/UserProfile';
import { Settings } from './components/Settings';
import { AuthProvider } from './features/auth/context/AuthContext';
import { NetworkProvider } from './features/network/NetworkProvider';
import { usePerformanceMonitoring } from './monitoring/hooks/useMonitoring';

const testContent = {
  type: 'url' as const,
  title: 'Test Share',
  url: 'https://example.com',
  description: 'Test sharing functionality'
};

export const App: React.FC = () => {
  usePerformanceMonitoring('App');

  return (
    <BrowserRouter>
      <NetworkProvider>
        <AuthProvider>
          <ErrorBoundary>
            <ShareDialogProvider>
              <NetworkStatusIndicator />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<div>404 - Not Found</div>} />
              </Routes>
              <ShareButton content={testContent} />
            </ShareDialogProvider>
          </ErrorBoundary>
        </AuthProvider>
      </NetworkProvider>
    </BrowserRouter>
  );
}; 