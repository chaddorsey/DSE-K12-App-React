import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorBoundary } from '../ErrorBoundary';
import { LoadingSpinner } from '../../LoadingSpinner';
import { ThrowError } from './ErrorBoundary.test';

describe('ErrorBoundary Integration', () => {
  it('should work with nested components', () => {
    const NestedComponent = () => {
      throw new Error('Nested error');
    };

    render(
      <ErrorBoundary>
        <div>
          <LoadingSpinner />
          <NestedComponent />
        </div>
      </ErrorBoundary>
    );

    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('should handle error recovery', async () => {
    const onReset = jest.fn();
    
    render(
      <ErrorBoundary onReset={onReset}>
        <ThrowError shouldThrow />
      </ErrorBoundary>
    );

    fireEvent.click(screen.getByText('Try Again'));
    
    expect(onReset).toHaveBeenCalled();
  });
}); 