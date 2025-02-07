import { renderHook, act } from '@testing-library/react';
import { useNetworkStatus } from '../useNetworkStatus';
import { NetworkMonitor } from '../../utils/NetworkMonitor';

// Mock NetworkMonitor
jest.mock('../../utils/NetworkMonitor', () => ({
  NetworkMonitor: jest.fn().mockImplementation(() => ({
    getStatus: () => ({ isOnline: true }),
    checkConnection: jest.fn().mockResolvedValue({ isOnline: true }),
    subscribe: jest.fn(),
    destroy: jest.fn()
  }))
}));

describe('useNetworkStatus', () => {
  const mockNavigator = { onLine: true };
  let onlineCallback: EventListener;
  let offlineCallback: EventListener;

  beforeAll(() => {
    Object.defineProperty(window, 'navigator', {
      value: mockNavigator,
      writable: true
    });
  });

  beforeEach(() => {
    window.addEventListener = jest.fn((event, cb) => {
      if (event === 'online') onlineCallback = cb;
      if (event === 'offline') offlineCallback = cb;
    });
    window.removeEventListener = jest.fn();
    jest.clearAllMocks();
  });

  it('initializes with current online status', () => {
    const { result } = renderHook(() => useNetworkStatus());
    expect(result.current.online).toBe(true);
    expect(result.current.loading).toBe(true);
  });

  it('updates when network status changes', () => {
    const { result } = renderHook(() => useNetworkStatus());

    act(() => {
      if (offlineCallback) {
        offlineCallback(new Event('offline'));
      }
    });
    expect(result.current.online).toBe(false);

    act(() => {
      if (onlineCallback) {
        onlineCallback(new Event('online'));
      }
    });
    expect(result.current.online).toBe(true);
  });

  it('cleans up event listeners on unmount', () => {
    const { unmount } = renderHook(() => useNetworkStatus());
    unmount();
    expect(window.removeEventListener).toHaveBeenCalledTimes(2);
  });
}); 