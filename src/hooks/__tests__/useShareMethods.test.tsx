import { renderHook, act } from '@testing-library/react';
import { useShareMethods } from '../useShareMethods';
import { mockMonitoring } from '../testing/mockMonitoring';

describe('useShareMethods', () => {
  beforeEach(() => {
    // Mock navigator.share
    global.navigator.share = jest.fn();
    // Mock navigator.clipboard
    global.navigator.clipboard = {
      writeText: jest.fn()
    };
  });

  it('initializes with loading state', () => {
    const { result } = renderHook(() => useShareMethods());
    
    expect(result.current.loading).toBe(true);
    expect(result.current.availableMethods).toHaveLength(0);
  });

  it('detects available share methods', async () => {
    const { result } = renderHook(() => useShareMethods());

    await act(async () => {
      // Wait for methods detection
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.availableMethods.length).toBeGreaterThan(0);
    expect(result.current.availableMethods.some(m => m.id === 'native')).toBe(true);
  });

  it('handles native share not available', async () => {
    delete global.navigator.share;

    const { result } = renderHook(() => useShareMethods());

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.availableMethods.some(m => m.id === 'native')).toBe(false);
    expect(result.current.availableMethods.some(m => m.id === 'qr')).toBe(true);
  });

  it('handles share method errors', async () => {
    const mockError = new Error('Share failed');
    global.navigator.share = jest.fn().mockRejectedValue(mockError);

    const { result } = renderHook(() => useShareMethods());

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    const nativeMethod = result.current.availableMethods.find(m => m.id === 'native');
    
    await act(async () => {
      try {
        await nativeMethod?.share({ type: 'url', url: 'https://example.com' });
      } catch (e) {
        expect(e).toBe(mockError);
      }
    });
  });

  it('tracks share method availability', async () => {
    const mockMonitors = mockMonitoring();
    
    const { result } = renderHook(() => useShareMethods());

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(mockMonitors.trackPerformance).toHaveBeenCalledWith({
      type: 'share_methods_detected',
      metadata: {
        availableMethods: expect.any(Array)
      }
    });
  });
}); 