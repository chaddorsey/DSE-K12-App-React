import { useEffect, useRef } from 'react';

interface KeyboardNavigationOptions {
  containerRef: React.RefObject<HTMLElement>;
  selector: string;
  onEscape?: () => void;
  wrap?: boolean;
  vertical?: boolean;
  horizontal?: boolean;
}

export const useKeyboardNavigation = ({
  containerRef,
  selector,
  onEscape,
  wrap = true,
  vertical = true,
  horizontal = true
}: KeyboardNavigationOptions) => {
  const currentFocusIndex = useRef(-1);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const elements = Array.from(container.querySelectorAll<HTMLElement>(selector));
      if (!elements.length) return;

      // Update current focus index based on active element
      const activeElement = document.activeElement;
      currentFocusIndex.current = elements.findIndex(el => el === activeElement);

      const handleDirectionalNavigation = (direction: 'next' | 'prev') => {
        e.preventDefault();
        const current = currentFocusIndex.current;
        let next = direction === 'next' ? current + 1 : current - 1;

        if (wrap) {
          next = (next + elements.length) % elements.length;
          if (next < 0) next = elements.length - 1;
        } else {
          next = Math.max(0, Math.min(next, elements.length - 1));
        }

        if (next !== current) {
          elements[next]?.focus();
          currentFocusIndex.current = next;
        }
      };

      switch (e.key) {
        case 'ArrowDown':
          if (vertical) handleDirectionalNavigation('next');
          break;
        case 'ArrowUp':
          if (vertical) handleDirectionalNavigation('prev');
          break;
        case 'ArrowRight':
          if (horizontal) handleDirectionalNavigation('next');
          break;
        case 'ArrowLeft':
          if (horizontal) handleDirectionalNavigation('prev');
          break;
        case 'Home':
          e.preventDefault();
          elements[0]?.focus();
          currentFocusIndex.current = 0;
          break;
        case 'End':
          e.preventDefault();
          elements[elements.length - 1]?.focus();
          currentFocusIndex.current = elements.length - 1;
          break;
        case 'Escape':
          if (onEscape) {
            e.preventDefault();
            onEscape();
          }
          break;
      }
    };

    container.addEventListener('keydown', handleKeyDown);
    return () => container.removeEventListener('keydown', handleKeyDown);
  }, [containerRef, selector, onEscape, wrap, vertical, horizontal]);
}; 