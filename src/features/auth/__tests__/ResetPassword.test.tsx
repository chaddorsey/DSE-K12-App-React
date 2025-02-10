import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ResetPassword } from '../ResetPassword';
import { apiClient } from '../../../services/api';

jest.mock('../../../services/api');
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('ResetPassword', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderResetPassword = () => {
    return render(
      <MemoryRouter>
        <ResetPassword />
      </MemoryRouter>
    );
  };

  it('renders reset password form with all fields', () => {
    renderResetPassword();
    
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^new password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reset password/i })).toBeInTheDocument();
  });

  it('shows validation errors for empty fields', async () => {
    renderResetPassword();
    
    fireEvent.click(screen.getByRole('button', { name: /reset password/i }));

    await waitFor(() => {
      expect(screen.getByText(/username is required/i)).toBeInTheDocument();
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    });
  });

  it('shows error when passwords do not match', async () => {
    renderResetPassword();
    
    fireEvent.change(screen.getByLabelText(/^new password$/i), {
      target: { value: 'newpass123' }
    });
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: 'newpass456' }
    });
    
    fireEvent.click(screen.getByRole('button', { name: /reset password/i }));

    await waitFor(() => {
      expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
    });
  });

  it('shows future feature message', () => {
    renderResetPassword();
    expect(screen.getByText(/this feature is coming soon/i)).toBeInTheDocument();
  });

  it('redirects to login after form submission', async () => {
    renderResetPassword();
    
    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'testuser' }
    });
    fireEvent.change(screen.getByLabelText(/^new password$/i), {
      target: { value: 'newpass123' }
    });
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: 'newpass123' }
    });
    
    fireEvent.click(screen.getByRole('button', { name: /reset password/i }));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
  });

  it('successfully resets password with valid credentials', async () => {
    const mockResetResponse = { success: true, message: 'Password reset successful' };
    (apiClient.post as jest.Mock).mockResolvedValueOnce(mockResetResponse);

    renderResetPassword();
    
    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'testuser' }
    });
    fireEvent.change(screen.getByLabelText(/^new password$/i), {
      target: { value: 'newpass123' }
    });
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: 'newpass123' }
    });
    
    fireEvent.click(screen.getByRole('button', { name: /reset password/i }));

    await waitFor(() => {
      expect(apiClient.post).toHaveBeenCalledWith('auth/reset-password', {
        username: 'testuser',
        newPassword: 'newpass123'
      });
      expect(screen.getByText(/password reset successful/i)).toBeInTheDocument();
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
  });

  it('shows error message when reset fails', async () => {
    const errorMessage = 'User not found';
    (apiClient.post as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    renderResetPassword();
    
    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'nonexistent' }
    });
    fireEvent.change(screen.getByLabelText(/^new password$/i), {
      target: { value: 'newpass123' }
    });
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: 'newpass123' }
    });
    
    fireEvent.click(screen.getByRole('button', { name: /reset password/i }));

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  it('disables submit button during reset process', async () => {
    (apiClient.post as jest.Mock).mockImplementation(() => 
      new Promise(resolve => setTimeout(resolve, 100))
    );

    renderResetPassword();
    
    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'testuser' }
    });
    fireEvent.change(screen.getByLabelText(/^new password$/i), {
      target: { value: 'newpass123' }
    });
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: 'newpass123' }
    });
    
    const submitButton = screen.getByRole('button', { name: /reset password/i });
    fireEvent.click(submitButton);

    expect(submitButton).toBeDisabled();
    expect(screen.getByText(/resetting/i)).toBeInTheDocument();
  });

  it('handles API error messages correctly', async () => {
    const apiErrorMessage = 'Invalid password format';
    (apiClient.post as jest.Mock).mockResolvedValueOnce({
      status: 'error',
      message: apiErrorMessage
    });

    renderResetPassword();
    
    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'testuser' }
    });
    fireEvent.change(screen.getByLabelText(/^new password$/i), {
      target: { value: 'newpass123' }
    });
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: 'newpass123' }
    });
    
    fireEvent.click(screen.getByRole('button', { name: /reset password/i }));

    await waitFor(() => {
      expect(screen.getByText(apiErrorMessage)).toBeInTheDocument();
    });
  });

  it('handles network timeouts', async () => {
    (apiClient.post as jest.Mock).mockRejectedValueOnce(new Error('Network timeout'));

    renderResetPassword();
    
    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'testuser' }
    });
    fireEvent.change(screen.getByLabelText(/^new password$/i), {
      target: { value: 'newpass123' }
    });
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: 'newpass123' }
    });
    
    fireEvent.click(screen.getByRole('button', { name: /reset password/i }));

    await waitFor(() => {
      expect(screen.getByText(/network timeout/i)).toBeInTheDocument();
    });
  });

  it('handles network failures gracefully', async () => {
    (apiClient.post as jest.Mock).mockRejectedValueOnce(new Error('Failed to fetch'));

    renderResetPassword();
    
    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'testuser' }
    });
    fireEvent.change(screen.getByLabelText(/^new password$/i), {
      target: { value: 'newpass123' }
    });
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: 'newpass123' }
    });
    
    fireEvent.click(screen.getByRole('button', { name: /reset password/i }));

    await waitFor(() => {
      expect(screen.getByText(/failed to fetch/i)).toBeInTheDocument();
    });
  });
}); 