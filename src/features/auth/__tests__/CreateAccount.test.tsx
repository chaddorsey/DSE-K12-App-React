import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CreateAccount } from '../CreateAccount';
import { apiClient } from '../../../services/api';

jest.mock('../../../services/api');
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('CreateAccount', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderCreateAccount = () => {
    return render(
      <MemoryRouter>
        <CreateAccount />
      </MemoryRouter>
    );
  };

  const fillForm = (overrides = {}) => {
    const defaultValues = {
      name: 'Test User',
      email: 'newuser@example.com',
      password: 'password123',
      confirmPassword: 'password123',
      ...overrides
    };

    fireEvent.change(screen.getByLabelText(/full name/i), {
      target: { value: defaultValues.name }
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: defaultValues.email }
    });
    fireEvent.change(screen.getByLabelText(/^password$/i), {
      target: { value: defaultValues.password }
    });
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: defaultValues.confirmPassword }
    });
  };

  it('renders create account form with all fields', () => {
    renderCreateAccount();
    
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
  });

  it('shows validation errors for empty fields', async () => {
    renderCreateAccount();
    
    fireEvent.click(screen.getByRole('button', { name: /create account/i }));

    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    });
  });

  it('shows error for invalid email format', async () => {
    renderCreateAccount();
    
    fillForm({ email: 'invalid-email' });
    fireEvent.click(screen.getByRole('button', { name: /create account/i }));

    await waitFor(() => {
      expect(screen.getByText(/invalid email address/i)).toBeInTheDocument();
    });
  });

  it('shows error when passwords do not match', async () => {
    renderCreateAccount();
    
    fillForm({ confirmPassword: 'different-password' });
    fireEvent.click(screen.getByRole('button', { name: /create account/i }));

    await waitFor(() => {
      expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
    });
  });

  it('successfully creates account with valid data', async () => {
    const mockResponse = { 
      status: 'success',
      message: 'Account created successfully',
      user: { id: '1', name: 'Test User', email: 'newuser@example.com' }
    };
    (apiClient.post as jest.Mock).mockResolvedValueOnce(mockResponse);

    renderCreateAccount();
    fillForm();
    fireEvent.click(screen.getByRole('button', { name: /create account/i }));

    await waitFor(() => {
      expect(apiClient.post).toHaveBeenCalledWith('auth/create-account', {
        name: 'Test User',
        email: 'newuser@example.com',
        password: 'password123'
      });
      expect(screen.getByText(/account created successfully/i)).toBeInTheDocument();
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
  });

  it('shows error when account creation fails', async () => {
    const errorMessage = 'Email already registered';
    (apiClient.post as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    renderCreateAccount();
    fillForm();
    fireEvent.click(screen.getByRole('button', { name: /create account/i }));

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  it('disables form during submission', async () => {
    (apiClient.post as jest.Mock).mockImplementation(() => 
      new Promise(resolve => setTimeout(resolve, 100))
    );

    renderCreateAccount();
    fillForm();
    
    const submitButton = screen.getByRole('button', { name: /create account/i });
    fireEvent.click(submitButton);

    expect(submitButton).toBeDisabled();
    expect(screen.getByLabelText(/full name/i)).toBeDisabled();
    expect(screen.getByLabelText(/email/i)).toBeDisabled();
    expect(screen.getByLabelText(/^password$/i)).toBeDisabled();
    expect(screen.getByLabelText(/confirm password/i)).toBeDisabled();
    expect(screen.getByText(/creating account/i)).toBeInTheDocument();
  });
}); 