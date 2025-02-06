/**
 * Network status indicator with monitoring
 */

import React from 'react';
import { usePerformanceMonitoring } from '../../monitoring/hooks/useMonitoring';
import { NetworkStatusView } from './NetworkStatusView';
import { useNetworkStatus } from '../../hooks/useNetworkStatus';
import { MonitoringService } from '../../monitoring/MonitoringService';

export interface INetworkStatusIndicatorProps {
  /** Position of the indicator */
  position?: 'top' | 'bottom';
  /** Whether to show latency information */
  showLatency?: boolean;
  /** Custom className */
  className?: string;
}

export const NetworkStatusIndicator: React.FC<INetworkStatusIndicatorProps> = ({
  position = 'top',
  showLatency = false,
  className = ''
}) => {
  usePerformanceMonitoring('NetworkStatusIndicator');
  const monitoring = MonitoringService.getInstance();
  
  const { 
    isOnline, 
    latency, 
    connectionType 
  } = useNetworkStatus();

  React.useEffect(() => {
    monitoring.trackStateTransition({
      from: 'unknown',
      to: isOnline ? 'online' : 'offline',
      success: true,
      duration: 0,
      component: 'NetworkStatusIndicator'
    });
  }, [isOnline]);

  return (
    <NetworkStatusView
      isOnline={isOnline}
      latency={latency}
      connectionType={connectionType}
      position={position}
      showLatency={showLatency}
      className={className}
    />
  );
}; 