import { renderHook, act } from '@testing-library/react';
import { useShareStatus } from '../useShareStatus';
import { mockMonitoring } from '../testing/mockMonitoring';

describe('useShareStatus', () => {
  const mockMonitors = mockMonitoring();

  it('initializes with empty state', () => {
    const { result } = renderHook(() => useShareStatus());
    
    expect(result.current.activeShares).toHaveLength(0);
    expect(result.current.totalProgress).toBe(0);
    expect(result.current.hasActiveShares).toBe(false);
  });

  it('tracks new share operations', () => {
    const { result } = renderHook(() => useShareStatus());

    act(() => {
      result.current.trackShare({
        id: '1',
        title: 'Test Share',
        content: { type: 'profile', title: 'Test', data: {} }
      });
    });

    expect(result.current.activeShares).toHaveLength(1);
    expect(result.current.hasActiveShares).toBe(true);
    expect(result.current.activeShares[0]).toMatchObject({
      id: '1',
      title: 'Test Share',
      progress: 0,
      status: 'pending'
    });
  });

  it('updates share progress', () => {
    const { result } = renderHook(() => useShareStatus());

    act(() => {
      result.current.trackShare({ id: '1', title: 'Test Share', content: { type: 'profile', title: 'Test', data: {} } });
      result.current.updateProgress('1', 50);
    });

    expect(result.current.activeShares[0].progress).toBe(50);
    expect(result.current.totalProgress).toBe(50);
  });

  it('handles share completion', () => {
    const { result } = renderHook(() => useShareStatus());

    act(() => {
      result.current.trackShare({ id: '1', title: 'Test Share', content: { type: 'profile', title: 'Test', data: {} } });
      result.current.completeShare('1');
    });

    expect(result.current.activeShares).toHaveLength(0);
    expect(result.current.hasActiveShares).toBe(false);
    
    expect(mockMonitors.trackPerformance).toHaveBeenCalledWith({
      type: 'share_complete',
      success: true,
      metadata: {
        shareId: '1'
      }
    });
  });

  it('handles share errors', () => {
    const { result } = renderHook(() => useShareStatus());
    const error = new Error('Network error');

    act(() => {
      result.current.trackShare({ id: '1', title: 'Test Share', content: { type: 'profile', title: 'Test', data: {} } });
      result.current.setShareError('1', error);
    });

    expect(result.current.activeShares[0].status).toBe('error');
    expect(result.current.activeShares[0].error).toBe(error);
    
    expect(mockMonitors.trackPerformance).toHaveBeenCalledWith({
      type: 'share_error',
      error,
      metadata: {
        shareId: '1'
      }
    });
  });

  it('retries failed shares', async () => {
    const { result } = renderHook(() => useShareStatus());
    const error = new Error('Network error');

    act(() => {
      result.current.trackShare({ id: '1', title: 'Test Share', content: { type: 'profile', title: 'Test', data: {} } });
      result.current.setShareError('1', error);
    });

    await act(async () => {
      await result.current.retryShare('1');
    });

    expect(result.current.activeShares[0].status).toBe('in_progress');
    expect(result.current.activeShares[0].error).toBeUndefined();
  });
}); 