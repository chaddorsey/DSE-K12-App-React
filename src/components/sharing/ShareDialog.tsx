import React from 'react';
import { Dialog } from '../Dialog';
import type { IShareableContent } from './types';

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
  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={`Share ${content.title}`}
    >
      <div className="share-dialog">
        {content.title}
      </div>
    </Dialog>
  );
}; 