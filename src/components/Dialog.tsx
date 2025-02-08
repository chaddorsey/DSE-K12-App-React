import { FC, ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { logger } from '../utils/logger';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  className?: string;
}

export const Dialog: FC<DialogProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className = ''
}): JSX.Element | null => {
  useEffect((): void => {
    if (isOpen) {
      logger.debug('Dialog opened', { title });
    }
  }, [isOpen, title]);

  if (!isOpen) return null;

  return createPortal(
    <div className={`dialog-overlay ${className}`}>
      <div className="dialog" role="dialog" aria-labelledby="dialog-title">
        <header className="dialog__header">
          <h2 id="dialog-title">{title}</h2>
          <button
            onClick={onClose}
            className="dialog__close"
            aria-label="Close dialog"
          >
            ×
          </button>
        </header>
        <div className="dialog__content">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}; 