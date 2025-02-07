import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { ShareSheet } from '../ShareSheet';
import { useShareMethods } from '../../../hooks/useShareMethods';
import { mockMonitoring } from '../../../hooks/testing/mockMonitoring';

jest.mock('../../../hooks/useShareMethods');

describe('ShareSheet', () => {
  const mockUseShareMethods = useShareMethods as jest.Mock;
  const mockContent = {
    type: 'url' as const,
    url: 'https://example.com',
    title: 'Example'
  };

  beforeEach(() => {
    mockUseShareMethods.mockReturnValue({
      availableMethods: [
        {
          id: 'native',
          label: 'Share',
          icon: 'share',
          isAvailable: async () => true,
          share: jest.fn()
        },
        {
          id: 'qr',
          label: 'Show QR Code',
          icon: 'qrcode',
          isAvailable: async () => true,
          share: jest.fn()
        }
      ],
      loading: false,
      error: null
    });
  });

  it('renders available share methods', async () => {
    render(
      <ShareSheet 
        isOpen={true}
        content={mockContent}
        onClose={jest.fn()}
      />
    );

    expect(screen.getByText('Share')).toBeInTheDocument();
    expect(screen.getByText('Show QR Code')).toBeInTheDocument();
  });

  it('handles share method selection', async () => {
    const onClose = jest.fn();
    const mockShare = jest.fn();
    
    mockUseShareMethods.mockReturnValue({
      availableMethods: [
        {
          id: 'native',
          label: 'Share',
          icon: 'share',
          isAvailable: async () => true,
          share: mockShare
        }
      ],
      loading: false,
      error: null
    });

    render(
      <ShareSheet 
        isOpen={true}
        content={mockContent}
        onClose={onClose}
      />
    );

    await act(async () => {
      fireEvent.click(screen.getByText('Share'));
    });

    expect(mockShare).toHaveBeenCalledWith(mockContent);
    expect(onClose).toHaveBeenCalled();
  });

  it('shows loading state while determining available methods', () => {
    mockUseShareMethods.mockReturnValue({
      availableMethods: [],
      loading: true,
      error: null
    });

    render(
      <ShareSheet 
        isOpen={true}
        content={mockContent}
        onClose={jest.fn()}
      />
    );

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('shows error state when methods fail to load', () => {
    mockUseShareMethods.mockReturnValue({
      availableMethods: [],
      loading: false,
      error: new Error('Failed to load share methods')
    });

    render(
      <ShareSheet 
        isOpen={true}
        content={mockContent}
        onClose={jest.fn()}
      />
    );

    expect(screen.getByRole('alert')).toHaveTextContent('Failed to load share methods');
  });

  it('tracks share method usage', async () => {
    const mockMonitors = mockMonitoring();
    const mockShare = jest.fn();
    
    mockUseShareMethods.mockReturnValue({
      availableMethods: [
        {
          id: 'native',
          label: 'Share',
          icon: 'share',
          isAvailable: async () => true,
          share: mockShare
        }
      ],
      loading: false,
      error: null
    });

    render(
      <ShareSheet 
        isOpen={true}
        content={mockContent}
        onClose={jest.fn()}
      />
    );

    await act(async () => {
      fireEvent.click(screen.getByText('Share'));
    });

    expect(mockMonitors.trackPerformance).toHaveBeenCalledWith({
      type: 'share_method_selected',
      metadata: {
        methodId: 'native',
        contentType: 'url'
      }
    });
  });
}); 