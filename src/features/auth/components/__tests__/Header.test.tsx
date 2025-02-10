import { render, screen } from '@testing-library/react';
import { Header } from '../Header';

describe('Header', () => {
  const mockUser = {
    name: 'Test User',
    email: 'test@example.com'
  };

  const mockOnLogout = jest.fn();

  it('renders nothing when no user is provided', () => {
    render(<Header user={null} onLogout={mockOnLogout} />);
    expect(screen.queryByRole('banner')).not.toBeInTheDocument();
  });

  it('renders header with user name and logout button when user is provided', () => {
    render(<Header user={mockUser} onLogout={mockOnLogout} />);
    
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByText(mockUser.name)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
  });
}); 