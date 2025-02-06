import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorBoundary } from '../ErrorBoundary';
import { logger } from '../../../utils/logger';

// Mock logger
jest.mock('../../../utils/logger', () => ({
  logger: {
    error: jest.fn()
  }
}));

// Component that throws error
const BuggyComponent: React.FC<{ shouldThrow?: boolean }> = ({ shouldThrow }) => {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <div>Working component</div>;
};

describe('ErrorBoundary', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <div>Test content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('should render error display when error occurs', () => {
    const onError = jest.fn();
    
    render(
      <ErrorBoundary onError={onError}>
        <BuggyComponent shouldThrow />
      </ErrorBoundary>
    );

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(onError).toHaveBeenCalled();
    expect(logger.error).toHaveBeenCalled();
  });

  it('should render custom fallback when provided', () => {
    const fallback = <div>Custom error view</div>;
    
    render(
      <ErrorBoundary fallback={fallback}>
        <BuggyComponent shouldThrow />
      </ErrorBoundary>
    );

    expect(screen.getByText('Custom error view')).toBeInTheDocument();
  });

  it('should reset error state when children change', () => {
    const { rerender } = render(
      <ErrorBoundary resetOnChange>
        <BuggyComponent shouldThrow />
      </ErrorBoundary>
    );

    expect(screen.getByRole('alert')).toBeInTheDocument();

    rerender(
      <ErrorBoundary resetOnChange>
        <BuggyComponent shouldThrow={false} />
      </ErrorBoundary>
    );

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(screen.getByText('Working component')).toBeInTheDocument();
  });

  it('should allow manual error reset', () => {
    render(
      <ErrorBoundary>
        <BuggyComponent shouldThrow />
      </ErrorBoundary>
    );

    const resetButton = screen.getByRole('button');
    fireEvent.click(resetButton);

    // Error state should be cleared
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
}); 