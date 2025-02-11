import { useRef, useCallback } from 'react';

export function useProgressiveFocus(containerRef: React.RefObject<HTMLElement>) {
  const lastFocusedId = useRef<string | null>(null);
  const lastFocusedIndex = useRef<number>(-1);

  const saveFocusedElement = useCallback(() => {
    if (!containerRef.current || !document.activeElement) return;

    const focusedElement = document.activeElement as HTMLElement;
    const userId = focusedElement.getAttribute('data-user-id');
    
    if (userId) {
      lastFocusedId.current = userId;
      const cells = Array.from(containerRef.current.querySelectorAll('[role="gridcell"]'));
      lastFocusedIndex.current = cells.indexOf(focusedElement);
    }
  }, [containerRef]);

  const restoreFocus = useCallback(() => {
    if (!containerRef.current || !lastFocusedId.current) return;

    const cells = Array.from(containerRef.current.querySelectorAll('[role="gridcell"]'));
    
    // Try to focus by ID first
    const elementById = containerRef.current.querySelector(
      `[data-user-id="${lastFocusedId.current}"]`
    ) as HTMLElement;

    if (elementById) {
      elementById.focus();
      return;
    }

    // If element not found, try to focus element at same index
    if (lastFocusedIndex.current >= 0) {
      const nextIndex = Math.min(lastFocusedIndex.current, cells.length - 1);
      (cells[nextIndex] as HTMLElement)?.focus();
    }
  }, [containerRef]);

  return {
    saveFocusedElement,
    restoreFocus
  };
} 