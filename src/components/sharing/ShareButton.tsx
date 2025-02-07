import React from 'react';
import { useShareDialog } from '../../hooks/useShareDialog';
import { Button } from '../Button';
import { logger } from '../../utils/logger';
import type { IShareableContent } from './types';

interface IShareButtonProps {
  content: IShareableContent;
  className?: string;
}

export const ShareButton: React.FC<IShareButtonProps> = ({ content, className = '' }) => {
  const { openShare } = useShareDialog();

  const handleClick = () => {
    logger.info('Share button clicked', { contentType: content.type });
    openShare(content);
  };

  return (
    <Button
      onClick={handleClick}
      className={className}
      aria-label={`Share ${content.title}`}
    >
      Share
    </Button>
  );
}; 