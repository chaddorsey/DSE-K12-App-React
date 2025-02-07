import React from 'react';
import { Dialog } from '../Dialog';
import { QRCodeShare } from './QRCodeShare';
import { ShareSheet } from './ShareSheet';
import { useNetworkStatus } from '../../hooks/useNetworkStatus';
import { logger } from '../../utils/logger';
import type { IShareableContent } from './types';
import './ShareDialog.css';

interface IShareDialogProps {
  content: IShareableContent;
  onClose: () => void;
  isOpen: boolean;
}

export const ShareDialog: React.FC<IShareDialogProps> = ({
  content,
  onClose,
  isOpen
}) => {
  const { isOnline } = useNetworkStatus();

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: content.title,
          text: content.description || content.title,
          url: content.url
        });
        logger.info('Content shared successfully');
        onClose();
      }
    } catch (error) {
      logger.error('Share failed', error);
    }
  };

  const canUseNativeShare = isOnline && typeof navigator.share === 'function';

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Share"
      className="share-dialog"
    >
      <div className="share-dialog__content">
        <QRCodeShare content={content} />
        {canUseNativeShare && (
          <button
            onClick={handleShare}
            className="share-dialog__native-btn"
          >
            Use System Share...
          </button>
        )}
        <ShareSheet content={content} onShare={onClose} />
      </div>
    </Dialog>
  );
}; 