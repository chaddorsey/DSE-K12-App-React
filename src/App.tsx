import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NetworkStatusIndicator } from './components/NetworkStatusIndicator';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorBoundary } from './components/ErrorBoundary';
import { usePerformanceMonitoring } from './monitoring/hooks/useMonitoring';
import { ShareButton } from './components/sharing/ShareButton';
import { Dashboard } from './components/Dashboard';
import { UserProfile } from './components/UserProfile';
import { Settings } from './components/Settings';

const testContent = {
  type: 'url' as const,
  title: 'Test Share',
  url: 'https://example.com'
};

export const App: React.FC = () => {
  usePerformanceMonitoring('App');

  return (
    <BrowserRouter>
      <ErrorBoundary>
        <NetworkStatusIndicator />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<div>404 - Not Found</div>} />
        </Routes>
        <ShareButton content={testContent} />
      </ErrorBoundary>
    </BrowserRouter>
  );
}; 