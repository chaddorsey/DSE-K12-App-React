/**
 * Tests for SignupForm component
 */

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { SignupForm } from '../SignupForm';
import { useAuth } from '../../hooks/useAuth';
import { mockMonitoring } from '../../hooks/testing/mockMonitoring';

// Mock useAuth hook
jest.mock('../../hooks/useAuth');

describe('SignupForm', () => {
  const mockSignup = jest.fn();
  const mockMonitors = mockMonitoring();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuth as jest.Mock).mockImplementation(() => ({
      signup: mockSignup,
      isLoading: false
    }));
  });

  it('should handle successful signup', async () => {
    const onSuccess = jest.fn();
    const { getByLabelText, getByRole } = render(
      <SignupForm onSuccess={onSuccess} />
    );

    fireEvent.change(getByLabelText('Email'), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(getByLabelText('Password'), {
      target: { value: 'Password123!' }
    });
    fireEvent.change(getByLabelText('Confirm Password'), {
      target: { value: 'Password123!' }
    });

    fireEvent.click(getByRole('button', { name: 'Sign Up' }));

    await waitFor(() => {
      expect(mockSignup).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'Password123!'
      });
      expect(onSuccess).toHaveBeenCalled();
    });
  });

  it('should validate password requirements', async () => {
    const { getByLabelText, getByRole, getByText } = render(<SignupForm />);

    fireEvent.change(getByLabelText('Password'), {
      target: { value: 'weak' }
    });
    fireEvent.blur(getByLabelText('Password'));

    expect(getByText('Password must be at least 8 characters')).toBeInTheDocument();
    expect(getByText('Password must contain at least one number')).toBeInTheDocument();
    expect(mockSignup).not.toHaveBeenCalled();
  });

  it('should validate password confirmation', async () => {
    const { getByLabelText, getByRole, getByText } = render(<SignupForm />);

    fireEvent.change(getByLabelText('Password'), {
      target: { value: 'Password123!' }
    });
    fireEvent.change(getByLabelText('Confirm Password'), {
      target: { value: 'different' }
    });
    fireEvent.blur(getByLabelText('Confirm Password'));

    expect(getByText('Passwords must match')).toBeInTheDocument();
    expect(mockSignup).not.toHaveBeenCalled();
  });

  it('should handle signup errors', async () => {
    const error = new Error('Email already exists');
    mockSignup.mockRejectedValueOnce(error);

    const { getByLabelText, getByRole, getByText } = render(<SignupForm />);

    fireEvent.change(getByLabelText('Email'), {
      target: { value: 'existing@example.com' }
    });
    fireEvent.change(getByLabelText('Password'), {
      target: { value: 'Password123!' }
    });
    fireEvent.change(getByLabelText('Confirm Password'), {
      target: { value: 'Password123!' }
    });

    fireEvent.click(getByRole('button', { name: 'Sign Up' }));

    await waitFor(() => {
      expect(getByText('Email already exists')).toBeInTheDocument();
      expect(mockMonitors.trackError).toHaveBeenCalledWith(
        error,
        expect.objectContaining({
          type: 'form_error',
          operation: 'signup'
        })
      );
    });
  });

  it('should show loading state', () => {
    (useAuth as jest.Mock).mockImplementation(() => ({
      signup: mockSignup,
      isLoading: true
    }));

    const { getByRole } = render(<SignupForm />);
    expect(getByRole('button', { name: 'Signing up...' })).toBeDisabled();
  });
}); 