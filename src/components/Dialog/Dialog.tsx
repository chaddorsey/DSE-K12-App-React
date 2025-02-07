import React from 'react';
import './Dialog.css';

export interface IDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Dialog: React.FC<IDialogProps> = ({
  isOpen,
  onClose,
  title,
  children
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="dialog-overlay"
      onClick={onClose}
      role="presentation"
    >
      <div 
        className="dialog"
        role="dialog"
        aria-labelledby="dialog-title"
        onClick={e => e.stopPropagation()}
      >
        <header className="dialog__header">
          <h2 id="dialog-title" className="dialog__title">{title}</h2>
          <button 
            className="dialog__close"
            onClick={onClose}
            aria-label="Close dialog"
          >
            ×
          </button>
        </header>
        <div className="dialog__content">
          {children}
        </div>
      </div>
    </div>
  );
}; 