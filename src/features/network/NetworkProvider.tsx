import React, { createContext, useContext, useEffect, useState } from 'react';
import type { NetworkConfig } from '../../providers/types';
import { NetworkMonitor, INetworkStatus } from '../../utils/NetworkMonitor';
import { usePerformanceMonitoring } from '../../monitoring/hooks/useMonitoring';

interface INetworkContext {
  isOnline: boolean;
  connectionQuality: 'good' | 'poor' | 'offline';
}

const NetworkContext = createContext<INetworkContext | null>(null);

interface NetworkProviderProps {
  children: React.ReactNode;
  config?: NetworkConfig;
}

export const NetworkProvider: React.FC<NetworkProviderProps> = ({
  children,
  config
}) => {
  usePerformanceMonitoring('NetworkProvider');
  
  const [status, setStatus] = useState<INetworkStatus>(() => 
    NetworkMonitor.getInstance().getStatus()
  );

  useEffect(() => {
    const networkMonitor = NetworkMonitor.getInstance();
    
    // Subscribe to network status changes
    const unsubscribe = networkMonitor.subscribe((newStatus) => {
      setStatus(newStatus);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const value = React.useMemo(() => ({
    isOnline: status.isOnline,
    connectionQuality: status.connectionQuality || 'good'
  }), [status]);

  return (
    <NetworkContext.Provider value={value}>
      {children}
    </NetworkContext.Provider>
  );
};

export const useNetwork = () => {
  const context = useContext(NetworkContext);
  if (!context) {
    throw new Error('useNetwork must be used within NetworkProvider');
  }
  return context;
}; 