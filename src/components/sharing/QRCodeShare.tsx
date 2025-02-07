import React from 'react';
import QRCode from 'react-qr-code';
import { logger } from '../../utils/logger';
import type { IShareableContent } from './types';
import './QRCodeShare.css';

interface IQRCodeShareProps {
  content: IShareableContent;
  size?: number;
}

export const QRCodeShare: React.FC<IQRCodeShareProps> = ({ 
  content,
  size = 200
}) => {
  if (!content.url) {
    logger.warn('QRCodeShare: No URL provided for content', { content });
    return null;
  }

  return (
    <div className="qr-code-share">
      <div className="qr-code-share__code">
        <QRCode
          value={content.url}
          size={size}
          level="H"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      <div className="qr-code-share__info">
        <h3 className="qr-code-share__title">{content.title}</h3>
        {content.description && (
          <p className="qr-code-share__description">{content.description}</p>
        )}
        <p className="qr-code-share__url">{content.url}</p>
      </div>
    </div>
  );
}; 