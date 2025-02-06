/**
 * Tests for ErrorBoundary component
 */

import React from 'react';
import { render, act } from '@testing-library/react';
import { ErrorBoundary } from '../ErrorBoundary';
import { mockMonitoring } from '../../hooks/testing/mockMonitoring';

describe('ErrorBoundary', () => {
  const mockMonitors = mockMonitoring();
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const ThrowError = ({ message }: { message: string }) => {
    throw new Error(message);
  };

  it('should catch and handle errors', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    const { getByText } = render(
      <ErrorBoundary>
        <ThrowError message="test error" />
      </ErrorBoundary>
    );

    expect(getByText('Something went wrong')).toBeInTheDocument();
    expect(mockMonitors.trackError).toHaveBeenCalledWith(
      expect.any(Error),
      expect.objectContaining({
        component: 'ErrorBoundary',
        handled: true
      })
    );

    consoleError.mockRestore();
  });

  it('should support custom fallback UI', () => {
    const fallback = <div>Custom Error UI</div>;
    
    const { getByText } = render(
      <ErrorBoundary fallback={fallback}>
        <ThrowError message="test error" />
      </ErrorBoundary>
    );

    expect(getByText('Custom Error UI')).toBeInTheDocument();
  });

  it('should support error recovery', async () => {
    const onReset = jest.fn();
    
    const { getByText } = render(
      <ErrorBoundary onReset={onReset}>
        <ThrowError message="test error" />
      </ErrorBoundary>
    );

    await act(async () => {
      getByText('Try Again').click();
    });

    expect(onReset).toHaveBeenCalled();
    expect(mockMonitors.trackPerformance).toHaveBeenCalledWith({
      operation: 'error_recovery',
      component: 'ErrorBoundary',
      success: true,
      totalTime: expect.any(Number)
    });
  });

  it('should render children when no error', () => {
    const { getByText } = render(
      <ErrorBoundary>
        <div>Normal Content</div>
      </ErrorBoundary>
    );

    expect(getByText('Normal Content')).toBeInTheDocument();
  });

  describe('error propagation', () => {
    it('should propagate errors to parent boundaries', () => {
      const parentError = jest.fn();
      const childError = jest.fn();
      
      render(
        <ErrorBoundary onError={parentError}>
          <ErrorBoundary onError={childError}>
            <ThrowError message="nested error" />
          </ErrorBoundary>
        </ErrorBoundary>
      );

      expect(childError).toHaveBeenCalled();
      expect(parentError).not.toHaveBeenCalled();
    });

    it('should handle multiple errors', () => {
      const onError = jest.fn();
      
      const { rerender } = render(
        <ErrorBoundary onError={onError}>
          <ThrowError message="error 1" />
        </ErrorBoundary>
      );

      rerender(
        <ErrorBoundary onError={onError}>
          <ThrowError message="error 2" />
        </ErrorBoundary>
      );

      expect(onError).toHaveBeenCalledTimes(2);
      expect(mockMonitors.trackError).toHaveBeenCalledTimes(2);
    });
  });

  describe('recovery behavior', () => {
    it('should reset error state after successful recovery', async () => {
      const onReset = jest.fn().mockResolvedValue(undefined);
      
      const { getByText, queryByText, rerender } = render(
        <ErrorBoundary onReset={onReset}>
          <ThrowError message="test error" />
        </ErrorBoundary>
      );

      expect(getByText('Something went wrong')).toBeInTheDocument();

      await act(async () => {
        await getByText('Try Again').click();
      });

      rerender(
        <ErrorBoundary onReset={onReset}>
          <div>Recovered Content</div>
        </ErrorBoundary>
      );

      expect(queryByText('Something went wrong')).not.toBeInTheDocument();
      expect(getByText('Recovered Content')).toBeInTheDocument();
    });

    it('should handle failed recovery attempts', async () => {
      const recoveryError = new Error('Recovery failed');
      const onReset = jest.fn().mockRejectedValue(recoveryError);
      
      const { getByText } = render(
        <ErrorBoundary onReset={onReset}>
          <ThrowError message="test error" />
        </ErrorBoundary>
      );

      await act(async () => {
        await getByText('Try Again').click();
      });

      expect(mockMonitors.trackError).toHaveBeenCalledWith(
        recoveryError,
        expect.objectContaining({
          operation: 'error_recovery',
          success: false
        })
      );
    });
  });

  describe('monitoring integration', () => {
    it('should track error context', () => {
      const error = new Error('test error');
      error.name = 'ValidationError';
      
      render(
        <ErrorBoundary>
          <ThrowError message={error.message} />
        </ErrorBoundary>
      );

      expect(mockMonitors.trackError).toHaveBeenCalledWith(
        error,
        expect.objectContaining({
          component: 'ErrorBoundary',
          errorType: 'ValidationError',
          handled: true
        })
      );
    });

    it('should track recovery performance', async () => {
      const startTime = Date.now();
      jest.spyOn(Date, 'now')
        .mockReturnValueOnce(startTime)
        .mockReturnValueOnce(startTime + 100);

      const { getByText } = render(
        <ErrorBoundary>
          <ThrowError message="test error" />
        </ErrorBoundary>
      );

      await act(async () => {
        await getByText('Try Again').click();
      });

      expect(mockMonitors.trackPerformance).toHaveBeenCalledWith({
        operation: 'error_recovery',
        component: 'ErrorBoundary',
        success: true,
        totalTime: 100
      });
    });
  });
}); 