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

  // Check if Web Share API is available
  const canUseNativeShare = isOnline && 'share' in navigator;

  const handleShare = async () => {
    try {
      if (canUseNativeShare) {
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

  logger.info('Rendering ShareDialog', { content, isOpen });

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Share"
      className="share-dialog"
    >
      <div className="share-dialog__content">
        <div className="share-dialog__qr-section">
          <h3>Scan QR Code</h3>
          <QRCodeShare content={content} />
        </div>
        
        <div className="share-dialog__options">
          {canUseNativeShare && (
            <button
              onClick={handleShare}
              className="share-dialog__native-btn"
            >
              Use System Share...
            </button>
          )}
          <div className="share-dialog__share-methods">
            <h3>Other Share Options</h3>
            <ShareSheet content={content} onShare={onClose} />
          </div>
        </div>
      </div>
    </Dialog>
  );
}; 