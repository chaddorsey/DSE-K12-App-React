import React from 'react';
import { FirebaseConnectionStatus } from './FirebaseConnectionStatus';

export const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 p-2 bg-white/80 backdrop-blur-sm border-t flex justify-start items-center space-x-4 px-4">
      <FirebaseConnectionStatus />
    </footer>
  );
}; 