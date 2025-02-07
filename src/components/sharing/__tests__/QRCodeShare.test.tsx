import React from 'react';
import { render, screen } from '@testing-library/react';
import { QRCodeShare } from '../QRCodeShare';
import { generateShareCode } from '../../../utils/sharing';

// Mock the QR code library
jest.mock('qrcode.react', () => ({
  __esModule: true,
  default: () => <div data-testid="mock-qr-code">QR Code</div>
}));

// Mock share code generation
jest.mock('../../../utils/sharing', () => ({
  generateShareCode: jest.fn()
}));

describe('QRCodeShare', () => {
  const mockContent = {
    type: 'profile' as const,
    title: 'Test Profile',
    data: { id: '123', name: 'Test User' }
  };

  beforeEach(() => {
    (generateShareCode as jest.Mock).mockReturnValue('ABC123');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders QR code with content', () => {
    render(<QRCodeShare content={mockContent} />);
    
    expect(screen.getByTestId('mock-qr-code')).toBeInTheDocument();
  });

  it('shows share code when includeCode is true', () => {
    render(<QRCodeShare content={mockContent} includeCode />);
    
    expect(screen.getByText(/share code/i)).toBeInTheDocument();
    expect(screen.getByText('ABC123')).toBeInTheDocument();
  });

  it('does not show share code when includeCode is false', () => {
    render(<QRCodeShare content={mockContent} />);
    
    expect(screen.queryByText(/share code/i)).not.toBeInTheDocument();
  });

  it('uses custom size when provided', () => {
    const { container } = render(<QRCodeShare content={mockContent} size={300} />);
    
    const qrWrapper = container.querySelector('.qr-share');
    expect(qrWrapper).toHaveStyle({ width: '300px', height: '300px' });
  });
}); 