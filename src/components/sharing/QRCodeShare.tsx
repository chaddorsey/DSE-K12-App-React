import React, { useMemo } from 'react';
import QRCodeReact from 'qrcode.react';
import { generateShareCode } from '../../utils/sharing';
import type { IShareableContent } from './types';
import './QRCodeShare.css';

interface IQRCodeShareProps {
  content: IShareableContent;
  size?: number;
  includeCode?: boolean;
}

export const QRCodeShare: React.FC<IQRCodeShareProps> = ({
  content,
  size = 200,
  includeCode = false
}) => {
  const shareCode = useMemo(() => generateShareCode(), []);
  const qrData = useMemo(() => JSON.stringify({ ...content, code: shareCode }), [content, shareCode]);

  return (
    <div className="qr-share" style={{ width: size, height: size }}>
      <QRCodeReact 
        value={qrData}
        size={size}
        level="M"
        renderAs="svg"
      />
      {includeCode && (
        <div className="qr-share__code">
          <span>Share code: {shareCode}</span>
        </div>
      )}
    </div>
  );
}; 