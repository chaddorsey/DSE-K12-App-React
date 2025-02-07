import { useState, useEffect } from 'react';
import { NetworkClient } from '../utils/NetworkClient';
import { NetworkMonitor } from '../utils/NetworkMonitor';
import { MonitoringService } from '../monitoring/MonitoringService';

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
    online: navigator.onLine,
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
        MonitoringService.getInstance().trackPerformance({
          type: 'network_status_change',
          totalTime: 0,
          metadata: { status: networkStatus.isOnline ? 'online' : 'offline' }
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
      MonitoringService.getInstance().trackPerformance({
        type: 'network_status_change',
        totalTime: 0,
        metadata: { status: newStatus.isOnline ? 'online' : 'offline' }
      });
    };

    window.addEventListener('online', () => handleStatusChange({ isOnline: true }));
    window.addEventListener('offline', () => handleStatusChange({ isOnline: false }));
    networkMonitor.subscribe(handleStatusChange);
    checkStatus();

    const interval = setInterval(checkStatus, 30000);

    return () => {
      clearInterval(interval);
      window.removeEventListener('online', () => handleStatusChange({ isOnline: true }));
      window.removeEventListener('offline', () => handleStatusChange({ isOnline: false }));
      networkMonitor.destroy();
    };
  }, []);

  return status;
}; 