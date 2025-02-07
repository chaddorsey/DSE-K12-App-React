import { useState, useCallback } from 'react';
import { logger } from '../utils/logger';
import type { IShareableContent } from '../components/sharing/types';

/**
 * Hook for managing share dialog state and interactions
 */
export function useShareDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<IShareableContent | null>(null);

  const openShare = useCallback((shareContent: IShareableContent) => {
    logger.info('Opening share dialog', { content: shareContent });
    setContent(shareContent);
    setIsOpen(true);
  }, []);

  const closeShare = useCallback(() => {
    logger.info('Closing share dialog');
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