import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NetworkStatusIndicator } from './components/NetworkStatusIndicator';
import { LoadingSpinner } from './components/LoadingSpinner';

// Lazy load route components
const UserProfile = React.lazy(() => import('./components/UserProfile/UserProfile'));
const Settings = React.lazy(() => import('./components/Settings/Settings'));
const Dashboard = React.lazy(() => import('./components/Dashboard/Dashboard'));

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <NetworkStatusIndicator />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}; 