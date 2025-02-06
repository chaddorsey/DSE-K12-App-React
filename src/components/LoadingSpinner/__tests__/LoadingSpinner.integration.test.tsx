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

  it('should work with dynamic loading states', () => {
    const TestComponent = () => {
      const [loading, setLoading] = React.useState(true);

      React.useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 100);
        return () => clearTimeout(timer);
      }, []);

      return <LoadingSpinner visible={loading} />;
    };

    render(<TestComponent />);
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
}); 