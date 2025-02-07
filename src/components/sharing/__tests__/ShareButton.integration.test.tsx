import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ShareButton } from '../ShareButton';
import { ShareDialog } from '../ShareDialog';
import { ErrorBoundary } from '../../ErrorBoundary';

describe('ShareButton Integration', () => {
  const mockContent = {
    type: 'profile' as const,
    title: 'Test Profile',
    data: { id: '123', name: 'Test User' }
  };

  beforeEach(() => {
    // Mock navigator.share
    Object.defineProperty(global.navigator, 'share', {
      value: jest.fn(),
      writable: true
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('opens share dialog with content', async () => {
    render(
      <ErrorBoundary>
        <ShareDialog isOpen={false} onClose={() => {}} content={mockContent} />
        <ShareButton content={mockContent} />
      </ErrorBoundary>
    );

    const button = screen.getByRole('button');
    await fireEvent.click(button);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(/test profile/i)).toBeInTheDocument();
  });

  it('handles errors gracefully', async () => {
    const mockError = new Error('Share failed');
    jest.spyOn(navigator, 'share').mockRejectedValueOnce(mockError);

    render(
      <ErrorBoundary>
        <ShareButton content={mockContent} />
      </ErrorBoundary>
    );

    const button = screen.getByRole('button');
    await fireEvent.click(button);

    expect(screen.getByRole('alert')).toBeInTheDocument();
  });
}); 