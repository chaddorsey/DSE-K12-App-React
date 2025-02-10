import { useState, useEffect, useCallback } from 'react';

interface VirtualKeyboardState {
  isKeyboardVisible: boolean;
  keyboardHeight: number;
  viewportOffset: number;
}

export const useVirtualKeyboard = (): VirtualKeyboardState => {
  const [state, setState] = useState<VirtualKeyboardState>({
    isKeyboardVisible: false,
    keyboardHeight: 0,
    viewportOffset: 0
  });

  const handleResize = useCallback(() => {
    const viewport = window.visualViewport;
    if (!viewport) return;

    const windowHeight = window.innerHeight;
    const viewportHeight = viewport.height;
    const keyboardHeight = Math.max(0, windowHeight - viewportHeight);
    
    setState(prev => ({
      ...prev,
      isKeyboardVisible: keyboardHeight > 100, // threshold to avoid false positives
      keyboardHeight,
    }));
  }, []);

  const handleScroll = useCallback(() => {
    const viewport = window.visualViewport;
    if (!viewport) return;
    
    setState(prev => ({
      ...prev,
      viewportOffset: viewport.offsetTop
    }));
  }, []);

  useEffect(() => {
    const viewport = window.visualViewport;
    if (!viewport) return;

    viewport.addEventListener('resize', handleResize);
    viewport.addEventListener('scroll', handleScroll);

    // Initial check
    handleResize();
    handleScroll();

    return () => {
      viewport.removeEventListener('resize', handleResize);
      viewport.removeEventListener('scroll', handleScroll);
    };
  }, [handleResize, handleScroll]);

  return state;
}; 