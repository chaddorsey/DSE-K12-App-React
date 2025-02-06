import React from 'react';
import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from '../ErrorBoundary';
import { logger } from '../../../utils/logger';

// Mock logger
jest.mock('../../../utils/logger', () => ({
  logger: {
    error: jest.fn()
  }
}));

// Test component that throws
const ThrowError: React.FC<{ shouldThrow?: boolean }> = ({ shouldThrow }) => {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <div>Test content</div>;
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

  it('should render fallback when error occurs', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow />
      </ErrorBoundary>
    );

    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('should call onError when error occurs', () => {
    const onError = jest.fn();
    
    render(
      <ErrorBoundary onError={onError}>
        <ThrowError shouldThrow />
      </ErrorBoundary>
    );

    expect(onError).toHaveBeenCalled();
    expect(logger.error).toHaveBeenCalled();
  });
}); 