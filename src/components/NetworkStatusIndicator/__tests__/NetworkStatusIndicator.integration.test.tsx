import React from 'react';
import { render, screen } from '@testing-library/react';
import { NetworkStatusIndicator } from '../NetworkStatusIndicator';
import { ErrorBoundary } from '../../ErrorBoundary/ErrorBoundary';

describe('NetworkStatusIndicator Integration', () => {
  it('should work within error boundary', () => {
    render(
      <ErrorBoundary>
        <NetworkStatusIndicator />
      </ErrorBoundary>
    );

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('should handle network status changes', () => {
    const { rerender } = render(<NetworkStatusIndicator />);
    
    // Initial state
    expect(screen.getByRole('status')).toHaveClass('is-online');

    // Update network status through hook
    jest.spyOn(window.navigator, 'onLine', 'get').mockReturnValue(false);
    window.dispatchEvent(new Event('offline'));
    
    expect(screen.getByRole('status')).toHaveClass('is-offline');
  });
}); 