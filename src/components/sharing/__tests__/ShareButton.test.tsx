import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ShareButton } from '../ShareButton';
import { useShareDialog } from '../../../hooks';
import { mockMonitoring } from '../../../hooks/testing/mockMonitoring';

// Mock hooks
jest.mock('../../../hooks', () => ({
  useShareDialog: jest.fn()
}));
const mockUseShareDialog = useShareDialog as jest.Mock;

describe('ShareButton', () => {
  const mockContent = {
    type: 'profile' as const,
    title: 'Test Profile',
    data: { id: '123', name: 'Test User' }
  };

  const mockOpenShare = jest.fn();
  const mockOnShare = jest.fn();
  const mockMonitors = mockMonitoring();

  beforeEach(() => {
    mockUseShareDialog.mockReturnValue({ openShare: mockOpenShare });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders share button with correct label', () => {
    render(<ShareButton content={mockContent} />);
    
    const button = screen.getByRole('button', { name: /share test profile/i });
    expect(button).toBeInTheDocument();
  });

  it('opens share dialog when clicked', async () => {
    render(<ShareButton content={mockContent} onShare={mockOnShare} />);
    
    const button = screen.getByRole('button');
    await fireEvent.click(button);

    expect(mockOpenShare).toHaveBeenCalledWith(mockContent);
    expect(mockOnShare).toHaveBeenCalled();
  });

  it('tracks share button interactions', async () => {
    render(<ShareButton content={mockContent} />);
    
    const button = screen.getByRole('button');
    await fireEvent.click(button);

    expect(mockMonitors.trackInteraction).toHaveBeenCalledWith({
      type: 'share_initiated',
      metadata: {
        contentType: 'profile',
        title: 'Test Profile'
      }
    });
  });
}); 