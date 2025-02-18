import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { UserSearch } from '../UserSearch';
import { useAuth } from '../../../auth/AuthContext';
import { db } from '../../../../config/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

// Mock Firebase and Auth
jest.mock('../../../../config/firebase');
jest.mock('../../../auth/AuthContext');

const mockUsers = [
  { id: 'user1', displayName: 'Test User 1', email: 'test1@example.com' },
  { id: 'user2', displayName: 'Test User 2', email: 'test2@example.com' },
  { id: 'user3', displayName: 'Test User 3', email: 'test3@example.com' },
];

describe('UserSearch', () => {
  const mockOnUserSelect = jest.fn();
  
  beforeEach(() => {
    // Mock auth user
    (useAuth as jest.Mock).mockReturnValue({
      user: { id: 'currentUser', displayName: 'Current User' }
    });

    // Mock Firestore query
    (getDocs as jest.Mock).mockResolvedValue({
      docs: mockUsers.map(user => ({
        id: user.id,
        data: () => user
      }))
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders search input', () => {
    render(<UserSearch onUserSelect={mockOnUserSelect} />);
    expect(screen.getByPlaceholderText(/search users/i)).toBeInTheDocument();
  });

  it('shows filtered users when searching', async () => {
    render(<UserSearch onUserSelect={mockOnUserSelect} />);
    
    const searchInput = screen.getByPlaceholderText(/search users/i);
    fireEvent.change(searchInput, { target: { value: 'Test User 1' } });

    await waitFor(() => {
      expect(screen.getByText('Test User 1')).toBeInTheDocument();
      expect(screen.queryByText('Test User 2')).not.toBeInTheDocument();
    });
  });

  it('calls onUserSelect when a user is clicked', async () => {
    render(<UserSearch onUserSelect={mockOnUserSelect} />);
    
    const searchInput = screen.getByPlaceholderText(/search users/i);
    fireEvent.change(searchInput, { target: { value: 'Test User 1' } });

    await waitFor(() => {
      const userElement = screen.getByText('Test User 1');
      fireEvent.click(userElement);
      expect(mockOnUserSelect).toHaveBeenCalledWith(mockUsers[0]);
    });
  });

  it('excludes current user from results', async () => {
    render(<UserSearch onUserSelect={mockOnUserSelect} />);
    
    const searchInput = screen.getByPlaceholderText(/search users/i);
    fireEvent.change(searchInput, { target: { value: 'User' } });

    await waitFor(() => {
      expect(screen.queryByText('Current User')).not.toBeInTheDocument();
    });
  });

  it('shows loading state while fetching results', async () => {
    render(<UserSearch onUserSelect={mockOnUserSelect} />);
    
    const searchInput = screen.getByPlaceholderText(/search users/i);
    fireEvent.change(searchInput, { target: { value: 'Test' } });

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });
  });
}); 