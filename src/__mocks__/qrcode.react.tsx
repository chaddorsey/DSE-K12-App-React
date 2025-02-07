import React from 'react';

interface IQRCodeProps {
  value: string;
  size?: number;
  level?: string;
  renderAs?: string;
}

const QRCode: React.FC<IQRCodeProps> = () => (
  <div data-testid="mock-qr-code">QR Code</div>
);

export default QRCode; 