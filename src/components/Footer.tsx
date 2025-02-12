import React from 'react';
import { Link } from 'react-router-dom';
import { FirebaseConnectionStatus } from './FirebaseConnectionStatus';

export const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 p-2 bg-white/80 backdrop-blur-sm border-t flex justify-between items-center px-4">
      <div className="flex items-center space-x-4">
        <FirebaseConnectionStatus />
      </div>
      <div className="text-xs text-gray-500 hover:text-gray-700">
        <Link to="/visualizations">Visualize Data</Link>
      </div>
    </footer>
  );
}; 