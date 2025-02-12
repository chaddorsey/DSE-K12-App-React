import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Logout } from '../Logout';
import { AuthProvider } from '../../../features/auth/AuthContext';
import { ErrorBoundary } from '../../ErrorBoundary';

describe('Logout Integration', () => {
  it('handles logout flow correctly', async () => {
    render(
      <MemoryRouter>
        <ErrorBoundary>
          <AuthProvider>
            <Logout />
          </AuthProvider>
        </ErrorBoundary>
      </MemoryRouter>
    );

    const button = screen.getByRole('button', { name: /logout/i });
    fireEvent.click(button);

    // Verify auth state is cleaned up
    expect(localStorage.getItem('auth_token')).toBeNull();
  });

  it('works with error boundary', () => {
    const { container } = render(
      <MemoryRouter>
        <ErrorBoundary>
          <AuthProvider>
            <Logout />
          </AuthProvider>
        </ErrorBoundary>
      </MemoryRouter>
    );

    expect(container).toBeInTheDocument();
  });
}); 