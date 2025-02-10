import { render, screen, fireEvent } from '@testing-library/react';
import { LogoutButton } from '../LogoutButton';

describe('LogoutButton', () => {
  const mockOnLogoutStart = jest.fn();
  const mockOnLogoutComplete = jest.fn();
  const mockOnLogoutError = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders in the top right corner', () => {
    render(<LogoutButton />);
    const button = screen.getByRole('button', { name: /logout/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('logout-button');
  });

  it('shows confirmation dialog when clicked', () => {
    render(<LogoutButton confirmationRequired={true} />);
    
    fireEvent.click(screen.getByRole('button', { name: /logout/i }));
    
    expect(screen.getByText('Are you sure you want to logout?')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /confirm/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
  });

  it('calls onLogoutStart when confirmation is accepted', () => {
    render(
      <LogoutButton 
        confirmationRequired={true}
        onLogoutStart={mockOnLogoutStart}
      />
    );
    
    fireEvent.click(screen.getByRole('button', { name: /logout/i }));
    fireEvent.click(screen.getByRole('button', { name: /confirm/i }));
    
    expect(mockOnLogoutStart).toHaveBeenCalled();
  });
}); 