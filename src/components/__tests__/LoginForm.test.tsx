/**
 * Tests for LoginForm component
 */

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { LoginForm } from '../LoginForm';
import { useAuth } from '../../hooks/useAuth';
import { mockMonitoring } from '../../hooks/testing/mockMonitoring';

// Mock useAuth hook
jest.mock('../../hooks/useAuth');

describe('LoginForm', () => {
  const mockLogin = jest.fn();
  const mockMonitors = mockMonitoring();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuth as jest.Mock).mockImplementation(() => ({
      login: mockLogin,
      isLoading: false
    }));
  });

  it('should handle successful login', async () => {
    const onSuccess = jest.fn();
    const { getByLabelText, getByRole } = render(
      <LoginForm onSuccess={onSuccess} />
    );

    fireEvent.change(getByLabelText('Email'), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(getByLabelText('Password'), {
      target: { value: 'password123' }
    });

    fireEvent.click(getByRole('button', { name: 'Log In' }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123'
      });
      expect(onSuccess).toHaveBeenCalled();
    });
  });

  it('should validate form fields', async () => {
    const { getByRole, getByText } = render(<LoginForm />);

    fireEvent.click(getByRole('button', { name: 'Log In' }));

    expect(getByText('Email is required')).toBeInTheDocument();
    expect(getByText('Password is required')).toBeInTheDocument();
    expect(mockLogin).not.toHaveBeenCalled();
  });

  it('should handle login errors', async () => {
    const error = new Error('Invalid credentials');
    mockLogin.mockRejectedValueOnce(error);

    const { getByLabelText, getByRole, getByText } = render(<LoginForm />);

    fireEvent.change(getByLabelText('Email'), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(getByLabelText('Password'), {
      target: { value: 'wrong' }
    });

    fireEvent.click(getByRole('button', { name: 'Log In' }));

    await waitFor(() => {
      expect(getByText('Invalid credentials')).toBeInTheDocument();
      expect(mockMonitors.trackError).toHaveBeenCalledWith(
        error,
        expect.objectContaining({
          type: 'form_error',
          operation: 'login'
        })
      );
    });
  });

  it('should show loading state', () => {
    (useAuth as jest.Mock).mockImplementation(() => ({
      login: mockLogin,
      isLoading: true
    }));

    const { getByRole } = render(<LoginForm />);
    expect(getByRole('button', { name: 'Logging in...' })).toBeDisabled();
  });
}); 