import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NetworkStatusIndicator } from './components/NetworkStatusIndicator';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ShareButton } from './components/sharing/ShareButton';
import { ShareDialogProvider } from './components/sharing/ShareDialogProvider';
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
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}; 