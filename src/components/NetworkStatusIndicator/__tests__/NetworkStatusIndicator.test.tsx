import React from 'react';
import { render, screen } from '@testing-library/react';
import { NetworkStatusIndicator } from '../NetworkStatusIndicator';
import { NetworkStatus } from '../../../utils/NetworkMonitor';

describe('NetworkStatusIndicator', () => {
  const createMockMonitor = () => {
    let currentCallback: ((status: NetworkStatus) => void) | null = null;
    
    return {
      subscribe: jest.fn((cb: (status: NetworkStatus) => void) => {
        currentCallback = cb;
        return () => { currentCallback = null; };
      }),
      triggerStatusChange: (status: NetworkStatus) => {
        if (currentCallback) {
          currentCallback(status);
        }
      }
    };
  };

  it('renders offline status correctly', () => {
    const mockMonitor = createMockMonitor();
    
    render(
      <NetworkStatusIndicator 
        monitor={mockMonitor}
        position="top"
        showLatency={false}
      />
    );

    mockMonitor.triggerStatusChange({
      isOnline: false,
      lastChecked: new Date()
    });

    expect(screen.getByText('Offline')).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveClass('offline');
  });

  it('shows latency when enabled', () => {
    const mockMonitor = createMockMonitor();
    
    render(
      <NetworkStatusIndicator 
        monitor={mockMonitor}
        position="top"
        showLatency={true}
      />
    );

    mockMonitor.triggerStatusChange({
      isOnline: true,
      connectionType: '4g',
      latency: 100,
      lastChecked: new Date()
    });

    expect(screen.getByText('Good Connection')).toBeInTheDocument();
    expect(screen.getByText('(100ms)')).toBeInTheDocument();
  });

  it('unsubscribes on unmount', () => {
    const mockMonitor = createMockMonitor();
    const { unmount } = render(
      <NetworkStatusIndicator 
        monitor={mockMonitor}
        position="top"
        showLatency={false}
      />
    );

    unmount();
    expect(mockMonitor.subscribe).toHaveBeenCalled();
  });
}); 