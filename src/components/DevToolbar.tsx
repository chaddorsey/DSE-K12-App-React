import React from 'react';
import { useAuth } from '../features/auth/AuthContext';
import './DevToolbar.css';

export const DevToolbar: React.FC = () => {
  const { authMode, switchAuthMode } = useAuth();

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="dev-toolbar">
      <div className="dev-toolbar-section">
        <span>Auth Mode: {authMode}</span>
        <button 
          onClick={() => switchAuthMode?.(authMode === 'real' ? 'dummy' : 'real')}
        >
          Switch to {authMode === 'real' ? 'Dummy' : 'Real'} Auth
        </button>
      </div>
    </div>
  );
}; 