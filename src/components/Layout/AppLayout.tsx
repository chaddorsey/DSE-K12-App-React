import React from 'react';
import { NetworkStatusIndicator } from '../NetworkStatusIndicator/NetworkStatusIndicator';
import { networkMonitor } from '../../services/network';
import './AppLayout.css';

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="app-layout">
      <NetworkStatusIndicator 
        monitor={networkMonitor}
        position="top"
        showLatency={process.env.NODE_ENV === 'development'}
      />
      {children}
    </div>
  );
}; 