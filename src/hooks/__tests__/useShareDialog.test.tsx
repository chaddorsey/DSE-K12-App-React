import { renderHook, act } from '@testing-library/react';
import { useShareDialog } from '../useShareDialog';

describe('useShareDialog', () => {
  const mockContent = {
    type: 'profile' as const,
    title: 'Test Profile',
    data: { id: '123', name: 'Test User' }
  };

  it('initializes with closed state', () => {
    const { result } = renderHook(() => useShareDialog());
    expect(result.current.isOpen).toBe(false);
    expect(result.current.content).toBeNull();
  });

  it('opens dialog with content', () => {
    const { result } = renderHook(() => useShareDialog());

    act(() => {
      result.current.openShare(mockContent);
    });

    expect(result.current.isOpen).toBe(true);
    expect(result.current.content).toEqual(mockContent);
  });

  it('closes dialog and clears content', () => {
    const { result } = renderHook(() => useShareDialog());

    act(() => {
      result.current.openShare(mockContent);
    });

    act(() => {
      result.current.closeShare();
    });

    expect(result.current.isOpen).toBe(false);
    expect(result.current.content).toBeNull();
  });
}); 