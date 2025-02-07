import React from 'react';
import { useNetworkStatus } from '../../hooks/useNetworkStatus';

export const NetworkStatusIndicator: React.FC = () => {
  const { online } = useNetworkStatus();

  if (online) return null;

  return (
    <div className="network-status-indicator">
      You are currently offline
    </div>
  );
}; 