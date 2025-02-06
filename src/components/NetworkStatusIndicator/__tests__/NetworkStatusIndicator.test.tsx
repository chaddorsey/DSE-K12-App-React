import React from 'react';
import { render, screen } from '@testing-library/react';
import { NetworkStatusIndicator } from '../NetworkStatusIndicator';
import { useNetworkStatus } from '../../../hooks/useNetworkStatus';

// Mock hooks and monitoring
jest.mock('../../../hooks/useNetworkStatus');
jest.mock('../../../monitoring/hooks/useMonitoring', () => ({
  usePerformanceMonitoring: jest.fn()
}));

describe('NetworkStatusIndicator', () => {
  const mockUseNetworkStatus = useNetworkStatus as jest.Mock;

  beforeEach(() => {
    mockUseNetworkStatus.mockReturnValue({
      isOnline: true,
      latency: 100,
      connectionType: '4g'
    });
  });

  it('should render online status', () => {
    render(<NetworkStatusIndicator />);
    
    expect(screen.getByText('Online')).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveClass('network-status--top');
  });

  it('should render offline status', () => {
    mockUseNetworkStatus.mockReturnValue({
      isOnline: false,
      latency: 0,
      connectionType: 'none'
    });

    render(<NetworkStatusIndicator />);
    
    expect(screen.getByText('Offline')).toBeInTheDocument();
  });

  it('should show latency when enabled', () => {
    render(<NetworkStatusIndicator showLatency />);
    
    expect(screen.getByText(/100ms/)).toBeInTheDocument();
    expect(screen.getByText(/4g/)).toBeInTheDocument();
  });

  it('should render at bottom position', () => {
    render(<NetworkStatusIndicator position="bottom" />);
    
    expect(screen.getByRole('status')).toHaveClass('network-status--bottom');
  });

  it('should apply custom className', () => {
    render(<NetworkStatusIndicator className="custom-class" />);
    
    expect(screen.getByRole('status')).toHaveClass('custom-class');
  });
}); 