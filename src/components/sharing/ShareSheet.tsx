import React from 'react';
import { logger } from '../../utils/logger';
import type { IShareableContent } from './types';
import './ShareSheet.css';

interface IShareSheetProps {
  content: IShareableContent;
  onShare?: () => void;
}

export const ShareSheet: React.FC<IShareSheetProps> = ({ content, onShare }) => {
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(content.url || '');
      logger.info('URL copied to clipboard');
      onShare?.();
    } catch (error) {
      logger.error('Failed to copy URL', error);
    }
  };

  return (
    <div className="share-sheet">
      <button 
        onClick={handleCopyLink}
        className="share-sheet__button"
      >
        Copy Link
      </button>
    </div>
  );
}; 