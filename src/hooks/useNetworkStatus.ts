import { useState, useEffect } from 'react';
import { NetworkClient } from '../utils/NetworkClient';
import { NetworkMonitor } from '../utils/NetworkMonitor';

export interface NetworkStatus {
  online: boolean;
  loading: boolean;
  lastChecked: string;
  error?: Error;
}

const networkMonitor = new NetworkMonitor();
const networkClient = new NetworkClient(networkMonitor);

export const useNetworkStatus = (): NetworkStatus => {
  const [status, setStatus] = useState<NetworkStatus>({
    online: networkMonitor.getStatus().isOnline,
    loading: true,
    lastChecked: new Date().toISOString()
  });

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const networkStatus = await networkMonitor.checkConnection();
        setStatus({
          online: networkStatus.isOnline,
          loading: false,
          lastChecked: new Date().toISOString()
        });
      } catch (error) {
        setStatus({
          online: false,
          loading: false,
          lastChecked: new Date().toISOString(),
          error: error as Error
        });
      }
    };

    const handleStatusChange = (newStatus: { isOnline: boolean }) => {
      setStatus(prev => ({
        ...prev,
        online: newStatus.isOnline,
        lastChecked: new Date().toISOString()
      }));
    };

    networkMonitor.subscribe(handleStatusChange);
    checkStatus();

    const interval = setInterval(checkStatus, 30000);

    return () => {
      clearInterval(interval);
      networkMonitor.destroy();
    };
  }, []);

  return status;
}; 