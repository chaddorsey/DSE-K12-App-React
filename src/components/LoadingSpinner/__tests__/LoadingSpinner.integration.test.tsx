import React from 'react';
import { render, screen } from '@testing-library/react';
import { LoadingSpinner } from '../LoadingSpinner';
import { ErrorBoundary } from '../../ErrorBoundary/ErrorBoundary';

describe('LoadingSpinner Integration', () => {
  it('should work within error boundary', () => {
    render(
      <ErrorBoundary>
        <LoadingSpinner />
      </ErrorBoundary>
    );

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('should handle multiple instances', () => {
    render(
      <div>
        <LoadingSpinner size="small" aria-label="Loading data" />
        <LoadingSpinner size="large" aria-label="Processing" />
      </div>
    );

    const spinners = screen.getAllByRole('progressbar');
    expect(spinners).toHaveLength(2);
    expect(spinners[0]).toHaveClass('loading-spinner--small');
    expect(spinners[1]).toHaveClass('loading-spinner--large');
  });

  it('should work with dynamic visibility changes', () => {
    const { rerender } = render(
      <div>
        <LoadingSpinner visible={false} />
        <div>Content</div>
      </div>
    );

    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();

    rerender(
      <div>
        <LoadingSpinner visible={true} />
        <div>Content</div>
      </div>
    );

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
}); 