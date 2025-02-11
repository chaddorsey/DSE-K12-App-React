import { renderHook, act } from '@testing-library/react-hooks';
import { useVisibleItemPriority } from '../useVisibleItemPriority';

describe('useVisibleItemPriority', () => {
  const mockUsers = [
    { id: '1', name: 'Alice', avatar: '/avatars/1.jpg' },
    { id: '2', name: 'Bob', avatar: '/avatars/2.jpg' },
    { id: '3', name: 'Charlie', avatar: '/avatars/3.jpg' },
    { id: '4', name: 'David', avatar: '/avatars/4.jpg' },
  ];

  const createIntersectionObserverMock = (entries: IntersectionObserverEntry[]) => {
    return function(callback: IntersectionObserverCallback) {
      callback(entries, {} as IntersectionObserver);
      return {
        observe: jest.fn(),
        unobserve: jest.fn(),
        disconnect: jest.fn(),
      };
    };
  };

  beforeEach(() => {
    // Reset loading states between tests
    jest.clearAllMocks();
  });

  it('prioritizes visible items for loading', () => {
    const onPriorityChange = jest.fn();
    const containerRef = { current: document.createElement('div') };

    // Mock intersection observer with some visible items
    const mockEntries = [
      { target: { dataset: { userId: '1' } }, isIntersecting: true },
      { target: { dataset: { userId: '2' } }, isIntersecting: true },
      { target: { dataset: { userId: '3' } }, isIntersecting: false },
    ] as unknown as IntersectionObserverEntry[];

    window.IntersectionObserver = jest.fn(createIntersectionObserverMock(mockEntries));

    const { result } = renderHook(() => useVisibleItemPriority({
      users: mockUsers,
      containerRef,
      onPriorityChange
    }));

    expect(onPriorityChange).toHaveBeenCalledWith(['1', '2']);
  });

  it('updates priorities when visibility changes', () => {
    const onPriorityChange = jest.fn();
    const containerRef = { current: document.createElement('div') };
    let observerCallback: IntersectionObserverCallback;

    window.IntersectionObserver = jest.fn((callback) => {
      observerCallback = callback;
      return {
        observe: jest.fn(),
        unobserve: jest.fn(),
        disconnect: jest.fn(),
      };
    });

    renderHook(() => useVisibleItemPriority({
      users: mockUsers,
      containerRef,
      onPriorityChange
    }));

    // Simulate scroll causing visibility changes
    act(() => {
      observerCallback(
        [
          { target: { dataset: { userId: '3' } }, isIntersecting: true },
          { target: { dataset: { userId: '4' } }, isIntersecting: true },
        ] as unknown as IntersectionObserverEntry[],
        {} as IntersectionObserver
      );
    });

    expect(onPriorityChange).toHaveBeenLastCalledWith(['3', '4']);
  });

  it('handles items entering and leaving viewport', () => {
    const onPriorityChange = jest.fn();
    const containerRef = { current: document.createElement('div') };
    let observerCallback: IntersectionObserverCallback;

    window.IntersectionObserver = jest.fn((callback) => {
      observerCallback = callback;
      return {
        observe: jest.fn(),
        unobserve: jest.fn(),
        disconnect: jest.fn(),
      };
    });

    renderHook(() => useVisibleItemPriority({
      users: mockUsers,
      containerRef,
      onPriorityChange
    }));

    // Simulate item entering viewport
    act(() => {
      observerCallback(
        [{ target: { dataset: { userId: '1' } }, isIntersecting: true }] as unknown as IntersectionObserverEntry[],
        {} as IntersectionObserver
      );
    });

    // Simulate same item leaving viewport
    act(() => {
      observerCallback(
        [{ target: { dataset: { userId: '1' } }, isIntersecting: false }] as unknown as IntersectionObserverEntry[],
        {} as IntersectionObserver
      );
    });

    expect(onPriorityChange).toHaveBeenCalledTimes(2);
    expect(onPriorityChange).toHaveBeenLastCalledWith([]);
  });

  it('cleans up observer on unmount', () => {
    const disconnect = jest.fn();
    window.IntersectionObserver = jest.fn(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect
    }));

    const { unmount } = renderHook(() => useVisibleItemPriority({
      users: mockUsers,
      containerRef: { current: document.createElement('div') },
      onPriorityChange: jest.fn()
    }));

    unmount();
    expect(disconnect).toHaveBeenCalled();
  });
}); 