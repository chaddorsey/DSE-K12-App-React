/**
 * Tests for ResetPasswordForm component
 */

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { ResetPasswordForm } from '../ResetPasswordForm';
import { useAuth } from '../../hooks/useAuth';
import { mockMonitoring } from '../../hooks/testing/mockMonitoring';

// Mock useAuth hook
jest.mock('../../hooks/useAuth');

describe('ResetPasswordForm', () => {
  const mockResetPassword = jest.fn();
  const mockMonitors = mockMonitoring();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuth as jest.Mock).mockImplementation(() => ({
      resetPassword: mockResetPassword,
      isLoading: false
    }));
  });

  it('should handle successful password reset request', async () => {
    const onSuccess = jest.fn();
    const { getByLabelText, getByRole } = render(
      <ResetPasswordForm onSuccess={onSuccess} />
    );

    fireEvent.change(getByLabelText('Email'), {
      target: { value: 'test@example.com' }
    });

    fireEvent.click(getByRole('button', { name: 'Reset Password' }));

    await waitFor(() => {
      expect(mockResetPassword).toHaveBeenCalledWith('test@example.com');
      expect(onSuccess).toHaveBeenCalled();
    });
  });

  it('should validate email format', async () => {
    const { getByLabelText, getByRole, getByText } = render(<ResetPasswordForm />);

    fireEvent.change(getByLabelText('Email'), {
      target: { value: 'invalid-email' }
    });
    fireEvent.blur(getByLabelText('Email'));

    expect(getByText('Invalid email')).toBeInTheDocument();
    expect(mockResetPassword).not.toHaveBeenCalled();
  });

  it('should handle reset errors', async () => {
    const error = new Error('User not found');
    mockResetPassword.mockRejectedValueOnce(error);

    const { getByLabelText, getByRole, getByText } = render(<ResetPasswordForm />);

    fireEvent.change(getByLabelText('Email'), {
      target: { value: 'test@example.com' }
    });

    fireEvent.click(getByRole('button', { name: 'Reset Password' }));

    await waitFor(() => {
      expect(getByText('User not found')).toBeInTheDocument();
      expect(mockMonitors.trackError).toHaveBeenCalledWith(
        error,
        expect.objectContaining({
          type: 'form_error',
          operation: 'reset_password'
        })
      );
    });
  });

  it('should show loading state', () => {
    (useAuth as jest.Mock).mockImplementation(() => ({
      resetPassword: mockResetPassword,
      isLoading: true
    }));

    const { getByRole } = render(<ResetPasswordForm />);
    expect(getByRole('button', { name: 'Sending...' })).toBeDisabled();
  });

  it('should show success message', async () => {
    const { getByLabelText, getByRole, getByText } = render(<ResetPasswordForm />);

    fireEvent.change(getByLabelText('Email'), {
      target: { value: 'test@example.com' }
    });

    fireEvent.click(getByRole('button', { name: 'Reset Password' }));

    await waitFor(() => {
      expect(getByText('Check your email for reset instructions')).toBeInTheDocument();
    });
  });
}); 