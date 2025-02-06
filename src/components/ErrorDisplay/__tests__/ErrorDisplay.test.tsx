import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorDisplay } from '../ErrorDisplay';
import { errorMessages } from '../../../errors/errorMessages';

describe('ErrorDisplay', () => {
  it('should display error title and message', () => {
    render(
      <ErrorDisplay 
        error={errorMessages.OFFLINE}
      />
    );

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText(errorMessages.OFFLINE.title)).toBeInTheDocument();
    expect(screen.getByText(errorMessages.OFFLINE.message)).toBeInTheDocument();
  });

  it('should display action button when onAction provided', () => {
    const handleAction = jest.fn();
    render(
      <ErrorDisplay 
        error={errorMessages.OFFLINE}
        onAction={handleAction}
      />
    );

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent(errorMessages.OFFLINE.action!);

    fireEvent.click(button);
    expect(handleAction).toHaveBeenCalled();
  });

  it('should not display action button when no onAction', () => {
    render(
      <ErrorDisplay 
        error={errorMessages.OFFLINE}
      />
    );

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('should handle HTTP errors with status', () => {
    const httpError = {
      ...errorMessages.HTTP_ERROR,
      message: errorMessages.HTTP_ERROR.message.replace('{status}', '404')
    };

    render(
      <ErrorDisplay 
        error={httpError}
      />
    );

    expect(screen.getByText(/404/)).toBeInTheDocument();
  });
}); 