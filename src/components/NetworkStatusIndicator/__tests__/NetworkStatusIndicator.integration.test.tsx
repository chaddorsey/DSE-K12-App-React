import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { NetworkStatusIndicator } from '../NetworkStatusIndicator';
import { NetworkClient } from '../../../utils/NetworkClient';
import { NetworkMonitor } from '../../../utils/NetworkMonitor';
import type { INetworkStatus } from '../../../utils/NetworkMonitor';

// Mock the modules
jest.mock('../../../utils/NetworkClient');
jest.mock('../../../utils/NetworkMonitor');

// Create properly typed mock for NetworkMonitor
const mockNetworkMonitor = {
  getStatus: jest.fn().mockReturnValue({ isOnline: true } as INetworkStatus),
  detectPortalRedirect: jest.fn().mockReturnValue(false),
  subscribe: jest.fn(),
  checkConnection: jest.fn().mockResolvedValue({ isOnline: true } as INetworkStatus),
  destroy: jest.fn()
} as jest.Mocked<NetworkMonitor>;

// Create NetworkClient instance with mock
const mockNetworkClient = new NetworkClient(mockNetworkMonitor);

// Mock the NetworkClient constructor
(NetworkClient as jest.MockedClass<typeof NetworkClient>).mockImplementation(() => mockNetworkClient);

describe('NetworkStatusIndicator Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    // Reset the mock implementation
    (mockNetworkClient.get as jest.Mock).mockResolvedValue(true);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should update status based on network client', async () => {
    render(<NetworkStatusIndicator />);
    
    // Initial loading state
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    
    // Resolve network check
    await act(async () => {
      await jest.runAllTimersAsync();
    });
    
    expect(screen.getByRole('status')).toHaveTextContent(/online/i);
  });

  it('should handle network errors', async () => {
    (mockNetworkClient.get as jest.Mock).mockRejectedValueOnce(new Error('Network error'));
    
    render(<NetworkStatusIndicator />);
    
    await act(async () => {
      await jest.runAllTimersAsync();
    });
    
    expect(screen.getByRole('status')).toHaveTextContent(/offline/i);
    expect(screen.getByRole('alert')).toHaveTextContent(/network error/i);
  });

  it('should poll for status updates', async () => {
    (mockNetworkClient.get as jest.Mock)
      .mockResolvedValueOnce(true)
      .mockResolvedValueOnce(false)
      .mockResolvedValueOnce(true);
    
    render(<NetworkStatusIndicator />);
    
    // Initial check
    await act(async () => {
      await jest.runAllTimersAsync();
    });
    expect(screen.getByRole('status')).toHaveTextContent(/online/i);
    
    // Second check
    await act(async () => {
      jest.advanceTimersByTime(30000); // 30s polling interval
      await jest.runAllTimersAsync();
    });
    expect(screen.getByRole('status')).toHaveTextContent(/offline/i);
    
    // Third check
    await act(async () => {
      jest.advanceTimersByTime(30000);
      await jest.runAllTimersAsync();
    });
    expect(screen.getByRole('status')).toHaveTextContent(/online/i);
  });
}); 