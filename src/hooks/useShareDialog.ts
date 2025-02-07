import { useState, useCallback } from 'react';
import type { IShareableContent } from '../components/sharing/types';

/**
 * Hook for managing share dialog state and interactions
 */
export function useShareDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<IShareableContent | null>(null);

  const openShare = useCallback((shareContent: IShareableContent) => {
    setContent(shareContent);
    setIsOpen(true);
  }, []);

  const closeShare = useCallback(() => {
    setIsOpen(false);
    setContent(null);
  }, []);

  return {
    isOpen,
    content,
    openShare,
    closeShare
  };
} 