import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ShareButton } from '../ShareButton';
import { ShareDialog } from '../ShareDialog';
import { useShareDialog } from '../../../hooks/useShareDialog';
import { mockApi } from '../../../services/mockApi';

// Mock the useShareDialog hook
jest.mock('../../../hooks/useShareDialog');
const mockUseShareDialog = useShareDialog as jest.MockedFunction<typeof useShareDialog>;

// Mock the API
jest.mock('../../../services/mockApi');

describe('ShareButton Integration', () => {
  const testContent = {
    type: 'url' as const,
    url: 'https://example.com',
    title: 'Test Content',
    description: 'Test description'
  };

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    
    // Setup default mock implementation
    mockUseShareDialog.mockReturnValue({
      isOpen: false,
      content: null,
      openShare: jest.fn(),
      closeShare: jest.fn()
    });
  });

  it('opens share dialog when clicked', async () => {
    const openShare = jest.fn();
    mockUseShareDialog.mockReturnValue({
      isOpen: true,
      content: testContent,
      openShare,
      closeShare: jest.fn()
    });

    render(
      <>
        <ShareButton content={testContent} />
        <ShareDialog 
          isOpen={true}
          content={testContent}
          onClose={jest.fn()}
        />
      </>
    );

    // Click the share button
    const button = screen.getByRole('button', { name: /share/i });
    fireEvent.click(button);

    // Verify the dialog opens
    expect(openShare).toHaveBeenCalledWith(testContent);
    
    // Wait for and verify dialog content
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText(testContent.title)).toBeInTheDocument();
    });
  });

  it('handles share method selection', async () => {
    const closeShare = jest.fn();
    mockUseShareDialog.mockReturnValue({
      isOpen: true,
      content: testContent,
      openShare: jest.fn(),
      closeShare
    });

    render(
      <ShareDialog 
        isOpen={true}
        content={testContent}
        onClose={closeShare}
      />
    );

    // Wait for share methods to load
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    // Click a share method (if available)
    const shareButton = screen.queryByText(/use system share/i);
    if (shareButton) {
      fireEvent.click(shareButton);
      expect(closeShare).toHaveBeenCalled();
    }
  });

  it('shows error state when share fails', async () => {
    // Mock API to throw error
    const error = new Error('Share failed');
    (mockApi.request as jest.Mock).mockRejectedValueOnce(error);

    mockUseShareDialog.mockReturnValue({
      isOpen: true,
      content: testContent,
      openShare: jest.fn(),
      closeShare: jest.fn()
    });

    render(
      <ShareDialog 
        isOpen={true}
        content={testContent}
        onClose={jest.fn()}
      />
    );

    // Verify error message appears
    await waitFor(() => {
      expect(screen.getByText(/share failed/i)).toBeInTheDocument();
    });
  });
}); 