import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { ShareButton } from '../ShareButton';
import { ShareSheet } from '../ShareSheet';
import { ErrorBoundary } from '../../ErrorBoundary';

describe('ShareButton Integration', () => {
  const mockContent = {
    type: 'url' as const,
    url: 'https://example.com',
    title: 'Test Content'
  };

  it('integrates with ShareSheet', () => {
    render(
      <ErrorBoundary>
        <ShareButton content={mockContent} />
        <ShareSheet 
          isOpen={false}
          content={mockContent}
          onClose={jest.fn()}
        />
      </ErrorBoundary>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Share');
  });

  it('handles errors gracefully', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    render(
      <ErrorBoundary>
        <ShareButton 
          content={{
            type: 'url',
            title: 'Invalid Content'
            // Missing required url field to trigger error
          }}
        />
      </ErrorBoundary>
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    consoleError.mockRestore();
  });
}); 