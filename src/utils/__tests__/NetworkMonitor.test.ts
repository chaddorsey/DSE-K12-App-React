import { NetworkMonitor } from '../NetworkMonitor';

// Extend Jest's expect
import '@testing-library/jest-dom';

describe('NetworkMonitor', () => {
  let networkMonitor: NetworkMonitor;

  beforeEach(() => {
    networkMonitor = NetworkMonitor.getInstance();
  });

  afterEach(() => {
    networkMonitor.destroy();
  });

  it('should be a singleton', () => {
    const instance1 = NetworkMonitor.getInstance();
    const instance2 = NetworkMonitor.getInstance();
    expect(instance1).toBe(instance2);
  });

  it('should notify subscribers of status changes', () => {
    const callback = jest.fn();
    const unsubscribe = networkMonitor.subscribe(callback);

    // Should be called immediately with current status
    expect(callback).toHaveBeenCalledWith(expect.objectContaining({
      isOnline: expect.any(Boolean)
    }));

    networkMonitor.updateStatus({ isOnline: false });
    expect(callback).toHaveBeenLastCalledWith(expect.objectContaining({
      isOnline: false
    }));

    unsubscribe();
    networkMonitor.updateStatus({ isOnline: true });
    expect(callback).toHaveBeenCalledTimes(2); // No additional calls after unsubscribe
  });

  it('should maintain current status', () => {
    networkMonitor.updateStatus({ isOnline: true, connectionQuality: 'good' });
    expect(networkMonitor.getStatus()).toEqual({
      isOnline: true,
      connectionQuality: 'good'
    });

    networkMonitor.updateStatus({ connectionQuality: 'poor' });
    expect(networkMonitor.getStatus()).toEqual({
      isOnline: true,
      connectionQuality: 'poor'
    });
  });
}); 