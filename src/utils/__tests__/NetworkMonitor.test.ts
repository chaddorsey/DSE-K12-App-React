import { NetworkMonitor } from '../NetworkMonitor';

// Extend Jest's expect
import '@testing-library/jest-dom';

describe('NetworkMonitor', () => {
  let monitor: NetworkMonitor;

  beforeEach(() => {
    monitor = new NetworkMonitor();
    global.fetch = jest.fn();
  });

  it('returns current online status', () => {
    const status = monitor.getStatus();
    expect(status).toHaveProperty('isOnline');
  });

  it('checks connection by making ping request', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({});
    const status = await monitor.checkConnection();
    expect(status.isOnline).toBe(true);
  });

  it('handles failed connection check', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error());
    const status = await monitor.checkConnection();
    expect(status.isOnline).toBe(false);
  });

  it('notifies subscribers of status changes', () => {
    const callback = jest.fn();
    monitor.subscribe(callback);
    const status = { isOnline: true };
    monitor['subscribers'][0](status);
    expect(callback).toHaveBeenCalledWith(status);
  });
}); 