import { useState, useEffect } from 'react';
import { NetworkClient } from '../utils/NetworkClient';
import { NetworkMonitor } from '../utils/NetworkMonitor';
import { MonitoringService } from '../monitoring/MonitoringService';

export interface INetworkStatus {
  isOnline: boolean;
  latency: number;
  connectionType: string;
}

const networkMonitor = new NetworkMonitor();
const networkClient = new NetworkClient(networkMonitor);

export function useNetworkStatus(): INetworkStatus {
  const [status, setStatus] = useState<INetworkStatus>({
    isOnline: navigator.onLine,
    latency: 0,
    connectionType: ''
  });

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const networkStatus = await networkMonitor.checkConnection();
        setStatus({
          isOnline: networkStatus.isOnline,
          latency: networkStatus.latency,
          connectionType: networkStatus.connectionType
        });
        MonitoringService.getInstance().trackPerformance({
          type: 'network_status_change',
          totalTime: 0,
          metadata: { status: networkStatus.isOnline ? 'online' : 'offline' }
        });
      } catch (error) {
        setStatus({
          isOnline: false,
          latency: 0,
          connectionType: '',
          error: error as Error
        });
      }
    };

    const handleStatusChange = (newStatus: { isOnline: boolean }) => {
      setStatus(prev => ({
        ...prev,
        isOnline: newStatus.isOnline,
        latency: 0,
        connectionType: ''
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
} 