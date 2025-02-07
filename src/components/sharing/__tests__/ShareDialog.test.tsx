import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ShareDialog } from '../ShareDialog';
import { useNetworkStatus } from '../../../hooks';

// Mock hooks
jest.mock('../../../hooks', () => ({
  useNetworkStatus: jest.fn()
}));

// Mock navigator.share
const mockShare = jest.fn();
Object.defineProperty(global.navigator, 'share', {
  value: mockShare,
  writable: true,
  configurable: true
});

describe('ShareDialog', () => {
  const mockContent = {
    type: 'profile' as const,
    title: 'Test Profile',
    data: { id: '123', name: 'Test User' },
    url: 'https://test.com/profile/123'
  };

  beforeEach(() => {
    (useNetworkStatus as jest.Mock).mockReturnValue({ isOnline: true });
    mockShare.mockReset();
  });

  it('renders dialog with content title', () => {
    render(
      <ShareDialog
        content={mockContent}
        isOpen={true}
        onClose={() => {}}
      />
    );

    expect(screen.getByText(/share test profile/i)).toBeInTheDocument();
  });

  it('shows QR code with share code when offline', () => {
    (useNetworkStatus as jest.Mock).mockReturnValue({ isOnline: false });

    render(
      <ShareDialog
        content={mockContent}
        isOpen={true}
        onClose={() => {}}
      />
    );

    expect(screen.getByTestId('mock-qr-code')).toBeInTheDocument();
    expect(screen.getByText(/share code/i)).toBeInTheDocument();
  });

  it('shows native share button when online and supported', async () => {
    render(
      <ShareDialog
        content={mockContent}
        isOpen={true}
        onClose={() => {}}
      />
    );

    const shareButton = screen.getByText(/share\.\.\./i);
    expect(shareButton).toBeInTheDocument();

    await fireEvent.click(shareButton);

    expect(mockShare).toHaveBeenCalledWith({
      title: mockContent.title,
      text: `Check out ${mockContent.title}`,
      url: mockContent.url
    });
  });

  it('does not show native share button when offline', () => {
    (useNetworkStatus as jest.Mock).mockReturnValue({ isOnline: false });

    render(
      <ShareDialog
        content={mockContent}
        isOpen={true}
        onClose={() => {}}
      />
    );

    expect(screen.queryByText(/share\.\.\./i)).not.toBeInTheDocument();
  });
}); 