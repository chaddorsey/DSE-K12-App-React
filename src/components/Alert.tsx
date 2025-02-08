import { FC, useEffect } from 'react';
import { logger } from '../utils/logger';

interface AlertProps {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  onClose?: () => void;
  autoClose?: number;
}

export const Alert: FC<AlertProps> = ({
  type,
  message,
  onClose,
  autoClose
}): JSX.Element => {
  useEffect((): (() => void) | void => {
    logger.debug('Alert displayed', { type, message });

    if (autoClose && onClose) {
      const timer = setTimeout(onClose, autoClose);
      return (): void => clearTimeout(timer);
    }
  }, [type, message, autoClose, onClose]);

  return (
    <div className={`alert alert--${type}`} role="alert">
      <span className="alert__message">{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="alert__close"
          aria-label="Close alert"
        >
          ×
        </button>
      )}
    </div>
  );
}; 