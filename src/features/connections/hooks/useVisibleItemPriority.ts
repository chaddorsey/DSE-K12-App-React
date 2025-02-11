import { useEffect, useRef, useCallback } from 'react';
import type { User } from '../types/user';

interface UseVisibleItemPriorityProps {
  users: User[];
  containerRef: React.RefObject<HTMLElement>;
  onPriorityChange: (visibleIds: string[]) => void;
}

export function useVisibleItemPriority({
  users,
  containerRef,
  onPriorityChange
}: UseVisibleItemPriorityProps) {
  const visibleItems = useRef(new Set<string>());

  const handleVisibilityChange = useCallback((entries: IntersectionObserverEntry[]) => {
    let hasChanges = false;

    entries.forEach(entry => {
      const userId = entry.target.getAttribute('data-user-id');
      if (!userId) return;

      if (entry.isIntersecting) {
        if (!visibleItems.current.has(userId)) {
          visibleItems.current.add(userId);
          hasChanges = true;
        }
      } else {
        if (visibleItems.current.has(userId)) {
          visibleItems.current.delete(userId);
          hasChanges = true;
        }
      }
    });

    if (hasChanges) {
      onPriorityChange(Array.from(visibleItems.current));
    }
  }, [onPriorityChange]);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(handleVisibilityChange, {
      root: containerRef.current,
      rootMargin: '50px', // Start loading items slightly before they become visible
      threshold: 0.1 // Trigger when even a small part of the item is visible
    });

    // Observe all user items
    containerRef.current.querySelectorAll('[data-user-id]').forEach(element => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
      visibleItems.current.clear();
    };
  }, [containerRef, handleVisibilityChange, users]);
} 