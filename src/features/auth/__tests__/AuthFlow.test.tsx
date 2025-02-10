import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { App } from '../../../App';
import { act } from 'react-dom/test-utils';

describe('Authentication Flow', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const renderApp = (initialRoute = '/') => {
    return render(
      <MemoryRouter initialEntries={[initialRoute]}>
        <App />
      </MemoryRouter>
    );
  };

  it('redirects to login when accessing protected route while unauthenticated', async () => {
    renderApp('/dashboard');

    await waitFor(() => {
      expect(screen.getByText(/welcome back/i)).toBeInTheDocument();
      expect(window.location.pathname).toBe('/login');
    });
  });

  it('maintains authentication state after successful login', async () => {
    renderApp('/login');

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: 'test@example.com' }
      });
      fireEvent.change(screen.getByLabelText(/password/i), {
        target: { value: 'password123' }
      });
      fireEvent.click(screen.getByRole('button', { name: /login/i }));
    });

    await waitFor(() => {
      expect(window.location.pathname).toBe('/dashboard');
      expect(localStorage.getItem('auth_token')).toBeTruthy();
      expect(localStorage.getItem('user')).toBeTruthy();
    });

    // Refresh the page
    renderApp('/dashboard');

    await waitFor(() => {
      expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
      expect(window.location.pathname).toBe('/dashboard');
    });
  });

  it('clears authentication state on logout', async () => {
    // Start with authenticated state
    localStorage.setItem('auth_token', 'mock-token');
    localStorage.setItem('user', JSON.stringify({
      id: '1',
      name: 'Test User',
      email: 'test@example.com'
    }));

    renderApp('/dashboard');

    // Find and click logout button
    const logoutButton = screen.getByRole('button', { name: /logout/i });
    await act(async () => {
      fireEvent.click(logoutButton);
    });

    await waitFor(() => {
      expect(window.location.pathname).toBe('/login');
      expect(localStorage.getItem('auth_token')).toBeNull();
      expect(localStorage.getItem('user')).toBeNull();
    });
  });
}); 