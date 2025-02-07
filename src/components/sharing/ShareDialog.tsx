import React from 'react';
import { Dialog } from '../Dialog';
import { QRCodeShare } from './QRCodeShare';
import { useNetworkStatus } from '../../hooks';
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

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={`Share ${content.title}`}
    >
      <div className="share-dialog">
        <QRCodeShare 
          content={content}
          includeCode={!isOnline}
          size={240}
        />
        
        {isOnline && navigator.share && (
          <button
            onClick={() => navigator.share({ 
              title: content.title,
              text: `Check out ${content.title}`,
              url: content.url
            })}
            className="share-dialog__native-btn"
          >
            Share...
          </button>
        )}
      </div>
    </Dialog>
  );
}; 