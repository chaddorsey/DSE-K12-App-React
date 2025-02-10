import { renderHook, act } from '@testing-library/react';
import { useVirtualKeyboard } from '../useVirtualKeyboard';

describe('useVirtualKeyboard', () => {
  const mockVisualViewport = {
    height: 800,
    offsetTop: 0,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  };

  beforeEach(() => {
    // Mock visualViewport API
    Object.defineProperty(window, 'visualViewport', {
      value: mockVisualViewport,
      configurable: true
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('detects keyboard visibility changes', () => {
    const { result } = renderHook(() => useVirtualKeyboard());
    const mockResizeListener = mockVisualViewport.addEventListener.mock.calls[0][1];
    
    act(() => {
      // Simulate keyboard opening (viewport height decreases)
      Object.defineProperty(window.visualViewport!, 'height', { value: 500 });
      mockResizeListener(new Event('resize'));
    });

    expect(result.current.isKeyboardVisible).toBe(true);
    
    act(() => {
      // Simulate keyboard closing
      Object.defineProperty(window.visualViewport!, 'height', { value: 800 });
      mockResizeListener(new Event('resize'));
    });

    expect(result.current.isKeyboardVisible).toBe(false);
  });

  it('calculates keyboard height correctly', () => {
    const { result } = renderHook(() => useVirtualKeyboard());
    const mockResizeListener = mockVisualViewport.addEventListener.mock.calls[0][1];
    
    act(() => {
      // Simulate keyboard opening
      Object.defineProperty(window.visualViewport!, 'height', { value: 500 });
      mockResizeListener(new Event('resize'));
    });

    expect(result.current.keyboardHeight).toBe(300); // 800 - 500
  });

  it('handles viewport offset changes', () => {
    const { result } = renderHook(() => useVirtualKeyboard());
    const mockScrollListener = mockVisualViewport.addEventListener.mock.calls[1][1];
    
    act(() => {
      // Simulate scroll with keyboard open
      Object.defineProperty(window.visualViewport!, 'offsetTop', { value: 100 });
      mockScrollListener(new Event('scroll'));
    });

    expect(result.current.viewportOffset).toBe(100);
  });

  it('cleans up event listeners on unmount', () => {
    const { unmount } = renderHook(() => useVirtualKeyboard());
    unmount();

    expect(mockVisualViewport.removeEventListener).toHaveBeenCalledWith('resize', expect.any(Function));
    expect(mockVisualViewport.removeEventListener).toHaveBeenCalledWith('scroll', expect.any(Function));
  });
}); 