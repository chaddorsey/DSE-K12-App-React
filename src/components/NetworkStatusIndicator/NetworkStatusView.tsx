/**
 * Presenter component for network status
 */

import React from 'react';
import './NetworkStatusIndicator.css';

export interface INetworkStatusViewProps {
  isOnline: boolean;
  latency: number;
  connectionType: string;
  position: 'top' | 'bottom';
  showLatency: boolean;
  className: string;
}

export const NetworkStatusView: React.FC<INetworkStatusViewProps> = ({
  isOnline,
  latency,
  connectionType,
  position,
  showLatency,
  className
}) => {
  const statusText = isOnline ? 'Online' : 'Offline';
  const latencyText = showLatency ? `${latency}ms` : '';
  
  return (
    <div 
      className={`network-status network-status--${position} ${className}`}
      role="status"
      aria-live="polite"
    >
      <div className={`network-status__indicator ${isOnline ? 'is-online' : 'is-offline'}`} />
      <span className="network-status__text">
        {statusText}
        {showLatency && (
          <span className="network-status__latency">
            {` - ${latencyText} (${connectionType})`}
          </span>
        )}
      </span>
    </div>
  );
}; 