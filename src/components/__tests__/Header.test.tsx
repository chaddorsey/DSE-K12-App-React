import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Header } from '../Header';
import { AuthProvider } from '../../features/auth/AuthContext';
import * as auth from '../../features/auth/AuthContext';
import { useAuth } from '../../features/auth/context/AuthContext';
import { BrowserRouter } from 'react-router-dom';

jest.mock('../../utils/logger');
jest.mock('../../features/auth/context/AuthContext');

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Header', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderHeader = () => {
    return render(
      <MemoryRouter>
        <AuthProvider>
          <Header />
        </AuthProvider>
      </MemoryRouter>
    );
  };

  it('shows logout button when authenticated', () => {
    jest.spyOn(auth, 'useAuth').mockImplementation(() => ({
      isAuthenticated: true,
      user: { id: '1', name: 'Test User', email: 'test@example.com' },
      login: jest.fn(),
      logout: jest.fn(),
    }));

    renderHeader();
    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
  });

  it('hides logout button when not authenticated', () => {
    jest.spyOn(auth, 'useAuth').mockImplementation(() => ({
      isAuthenticated: false,
      user: null,
      login: jest.fn(),
      logout: jest.fn(),
    }));

    renderHeader();
    expect(screen.queryByRole('button', { name: /logout/i })).not.toBeInTheDocument();
  });

  it('calls logout and redirects when logout button is clicked', async () => {
    const mockLogout = jest.fn();
    jest.spyOn(auth, 'useAuth').mockImplementation(() => ({
      isAuthenticated: true,
      user: { id: '1', name: 'Test User', email: 'test@example.com' },
      login: jest.fn(),
      logout: mockLogout,
    }));

    renderHeader();
    
    const logoutButton = screen.getByRole('button', { name: /logout/i });
    expect(logoutButton).not.toBeDisabled();
    
    fireEvent.click(logoutButton);
    expect(logoutButton).toBeDisabled();
    expect(screen.getByText(/logging out/i)).toBeInTheDocument();
    
    await waitFor(() => {
      expect(mockLogout).toHaveBeenCalled();
    });
  });

  it('shows error message when logout fails', async () => {
    const mockLogout = jest.fn().mockRejectedValue(new Error('Logout failed'));
    jest.spyOn(auth, 'useAuth').mockImplementation(() => ({
      isAuthenticated: true,
      user: { id: '1', name: 'Test User', email: 'test@example.com' },
      login: jest.fn(),
      logout: mockLogout,
    }));

    renderHeader();
    
    fireEvent.click(screen.getByRole('button', { name: /logout/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/error logging out/i)).toBeInTheDocument();
    });
  });

  it('shows sign in link when user is not authenticated', () => {
    (useAuth as jest.Mock).mockReturnValue({ user: null });
    renderWithRouter(<Header />);
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });

  it('shows user profile button when authenticated', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: {
        displayName: 'Test User',
        email: 'test@example.com'
      }
    });
    
    renderWithRouter(<Header />);
    expect(screen.getByLabelText('User profile settings')).toBeInTheDocument();
  });

  it('renders navigation links correctly', () => {
    (useAuth as jest.Mock).mockReturnValue({ user: null });
    const links = [
      { to: '/test1', label: 'Test 1' },
      { to: '/test2', label: 'Test 2' }
    ];
    
    renderWithRouter(<Header links={links} />);
    links.forEach(link => {
      expect(screen.getByText(link.label)).toBeInTheDocument();
    });
  });

  it('shows dashboard link when authenticated', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: {
        displayName: 'Test User',
        email: 'test@example.com'
      }
    });
    
    renderWithRouter(<Header />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });
}); 