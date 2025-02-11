import { useCallback } from 'react';

interface UseKeyboardNavigationProps {
  containerRef: React.RefObject<HTMLElement>;
  itemSelector: string;
  onSelect?: (element: HTMLElement) => void;
}

export function useKeyboardNavigation({
  containerRef,
  itemSelector,
  onSelect
}: UseKeyboardNavigationProps) {
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (!containerRef.current) return;

    const currentElement = document.activeElement as HTMLElement;
    const items = Array.from(containerRef.current.querySelectorAll(itemSelector)) as HTMLElement[];
    const currentIndex = items.indexOf(currentElement);

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown': {
        event.preventDefault();
        const nextIndex = (currentIndex + 1) % items.length;
        items[nextIndex]?.focus();
        break;
      }
      case 'ArrowLeft':
      case 'ArrowUp': {
        event.preventDefault();
        const prevIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
        items[prevIndex]?.focus();
        break;
      }
      case 'Home': {
        event.preventDefault();
        items[0]?.focus();
        break;
      }
      case 'End': {
        event.preventDefault();
        items[items.length - 1]?.focus();
        break;
      }
      case ' ':
      case 'Enter': {
        event.preventDefault();
        if (currentElement && onSelect) {
          onSelect(currentElement);
        }
        break;
      }
    }
  }, [containerRef, itemSelector, onSelect]);

  return { handleKeyDown };
} 