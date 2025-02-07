import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NetworkStatusIndicator } from './components/NetworkStatusIndicator';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorBoundary } from './components/ErrorBoundary';
import { usePerformanceMonitoring } from './monitoring/hooks/useMonitoring';
import { ShareButton } from './components/sharing/ShareButton';
import { ShareDialog } from './components/sharing/ShareDialog';
import { useShareDialog } from './hooks/useShareDialog';
import { Dashboard } from './components/Dashboard';
import { UserProfile } from './components/UserProfile';
import { Settings } from './components/Settings';

const testContent = {
  type: 'url' as const,
  title: 'Test Share',
  url: 'https://example.com',
  description: 'Test sharing functionality'
};

export const App: React.FC = () => {
  usePerformanceMonitoring('App');
  const { isOpen, content, closeShare } = useShareDialog();

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
        {isOpen && content && (
          <ShareDialog
            isOpen={isOpen}
            content={content}
            onClose={closeShare}
          />
        )}
      </ErrorBoundary>
    </BrowserRouter>
  );
}; 