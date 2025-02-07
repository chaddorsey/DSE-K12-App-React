import React, { createContext, useContext } from 'react';
import { useShareDialog } from '../../hooks/useShareDialog';
import { ShareDialog } from './ShareDialog';
import type { IShareableContent } from './types';

interface IShareDialogContext {
  openShare: (content: IShareableContent) => void;
  closeShare: () => void;
}

const ShareDialogContext = createContext<IShareDialogContext | null>(null);

export const useShareDialogContext = () => {
  const context = useContext(ShareDialogContext);
  if (!context) {
    throw new Error('useShareDialogContext must be used within ShareDialogProvider');
  }
  return context;
};

export const ShareDialogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isOpen, content, openShare, closeShare } = useShareDialog();

  return (
    <ShareDialogContext.Provider value={{ openShare, closeShare }}>
      {children}
      {isOpen && content && (
        <ShareDialog
          isOpen={isOpen}
          content={content}
          onClose={closeShare}
        />
      )}
    </ShareDialogContext.Provider>
  );
}; 