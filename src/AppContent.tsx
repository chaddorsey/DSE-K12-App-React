import React from 'react';
import { useAuth } from './features/auth/AuthContext';
import { Header } from './components/Header';
import { logger } from './utils/logger';

export const AppContent: React.FC = () => {
  const { user } = useAuth();
  
  logger.info('AppContent render:', {
    hasUser: !!user,
    uid: user?.uid,
    email: user?.email
  });

  if (!user?.uid) {
    logger.error('AppContent: No user UID available');
    return null;
  }

  return (
    <>
      <Header />
      <main className="app-main">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Dashboard Cards */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Your Progress</h2>
              {/* Add progress content */}
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Connections</h2>
              {/* Add connections content */}
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              {/* Add quick actions */}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};