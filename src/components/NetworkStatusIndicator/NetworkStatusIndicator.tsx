import React, { useEffect, useState } from 'react';
import { NetworkStatus } from '../../utils/NetworkMonitor';
import './NetworkStatusIndicator.css';

interface NetworkStatusIndicatorProps {
  position?: 'top' | 'bottom';
  showLatency?: boolean;
  monitor: {
    subscribe: (callback: (status: NetworkStatus) => void) => () => void;
  };
}

/**
 * NetworkStatusIndicator displays the current network connection status
 * and optionally shows connection latency. Designed for use in conference/hotel
 * environments with potentially unstable WiFi.
 */
export const NetworkStatusIndicator: React.FC<NetworkStatusIndicatorProps> = ({
  position = 'top',
  showLatency = false,
  monitor
}) => {
  const [status, setStatus] = useState<NetworkStatus>({
    isOnline: true,
    lastChecked: new Date()
  });

  useEffect(() => {
    // Subscribe to network status updates
    const unsubscribe = monitor.subscribe(setStatus);
    return () => unsubscribe();
  }, [monitor]);

  const getStatusClass = () => {
    if (!status.isOnline) return 'offline';
    if (status.connectionType === 'slow-2g' || status.connectionType === '2g') return 'poor';
    if (status.connectionType === '3g') return 'fair';
    return 'good';
  };

  const getStatusText = () => {
    if (!status.isOnline) return 'Offline';
    if (status.connectionType === 'slow-2g') return 'Very Slow Connection';
    if (status.connectionType === '2g') return 'Slow Connection';
    if (status.connectionType === '3g') return 'Fair Connection';
    return 'Good Connection';
  };

  return (
    <div 
      className={`network-status-indicator ${position} ${getStatusClass()}`}
      role="status"
      aria-live="polite"
    >
      <span className="status-text">{getStatusText()}</span>
      {showLatency && status.latency && (
        <span className="latency-text">
          ({Math.round(status.latency)}ms)
        </span>
      )}
    </div>
  );
}; 