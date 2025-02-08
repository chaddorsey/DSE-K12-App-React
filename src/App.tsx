import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import { NetworkStatusIndicator } from './components/NetworkStatusIndicator';
import { AppProviders } from './providers/AppProviders';
import { Dashboard } from './components/Dashboard';
import { UserProfile } from './components/UserProfile';
import { Settings } from './components/Settings';
import { usePerformanceMonitoring } from './monitoring/hooks/useMonitoring';

export const App: React.FC = () => {
  usePerformanceMonitoring('App');

  return (
    <ErrorBoundary>
      <AppProviders>
        <div className="app">
          <NetworkStatusIndicator />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </AppProviders>
    </ErrorBoundary>
  );
};

export default App; 