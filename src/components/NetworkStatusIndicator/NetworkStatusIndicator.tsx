/**
 * Network status indicator with monitoring
 */

import React from 'react';
import { usePerformanceMonitoring } from '../../monitoring/hooks/useMonitoring';
import { useNetworkStatus } from '../../hooks/useNetworkStatus';
import { logger } from '../../utils/logger';
import './NetworkStatusIndicator.css';

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
  const { isOnline, latency, connectionType } = useNetworkStatus();

  const statusText = isOnline ? 'Online' : 'Offline';
  const latencyText = `${latency}ms`;

  React.useEffect(() => {
    logger.info(`Network status changed: ${isOnline ? 'online' : 'offline'}`);
  }, [isOnline]);

  if (isOnline) return null;

  return (
    <div 
      className={`network-status network-status--${position} ${
        isOnline ? 'is-online' : 'is-offline'
      } ${className}`.trim()}
      role="status"
      aria-live="polite"
    >
      <div className="network-status__indicator" />
      <span className="network-status__text">
        {statusText}
        {showLatency && isOnline && (
          <span className="network-status__latency">
            {` - ${latencyText} (${connectionType})`}
          </span>
        )}
      </span>
    </div>
  );
};