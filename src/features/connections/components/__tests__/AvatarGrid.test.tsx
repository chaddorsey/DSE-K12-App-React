import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe } from 'jest-axe';
import { AvatarGrid } from '../AvatarGrid';
import { mockUsers } from '../../test/mockData';
import type { RecognitionLevel } from '../../types';

describe('AvatarGrid', () => {
  const defaultProps = {
    users: mockUsers,
    searchQuery: '',
    selectedLevels: [] as RecognitionLevel[],
    onUserSelect: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all users when no filters applied', () => {
    render(<AvatarGrid {...defaultProps} />);
    
    defaultProps.users.forEach(user => {
      expect(screen.getByTestId(`avatar-${user.id}`)).toBeInTheDocument();
    });
  });

  it('filters users based on search query', () => {
    const props = {
      ...defaultProps,
      searchQuery: 'John'
    };
    
    render(<AvatarGrid {...props} />);
    
    expect(screen.getByTestId('avatar-1')).toBeInTheDocument();
    expect(screen.queryByTestId('avatar-2')).not.toBeInTheDocument();
  });

  it('filters users based on recognition level', () => {
    const props = {
      ...defaultProps,
      selectedLevels: ['FACE' as RecognitionLevel]
    };
    
    render(<AvatarGrid {...props} />);
    
    const faceKnownUsers = defaultProps.users.filter(u => u.recognitionLevel === 'FACE');
    faceKnownUsers.forEach(user => {
      expect(screen.getByTestId(`avatar-${user.id}`)).toBeInTheDocument();
    });
  });

  it('calls onUserSelect when avatar is clicked', () => {
    render(<AvatarGrid {...defaultProps} />);
    
    const firstUser = defaultProps.users[0];
    fireEvent.click(screen.getByTestId(`avatar-${firstUser.id}`));
    
    expect(defaultProps.onUserSelect).toHaveBeenCalledWith(firstUser.id);
  });

  it('applies smooth transitions during filtering', () => {
    const { rerender } = render(<AvatarGrid {...defaultProps} />);
    
    // Get initial positions
    const avatars = screen.getAllByTestId('animated-avatar');
    const initialPositions = avatars.map(avatar => avatar.style.transform);
    
    // Update search to trigger filter
    rerender(<AvatarGrid {...defaultProps} searchQuery="John" />);
    
    // Check that transitions are applied
    const updatedAvatars = screen.getAllByTestId('animated-avatar');
    updatedAvatars.forEach(avatar => {
      expect(avatar.style.transition).toContain('transform');
    });
  });

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<AvatarGrid {...defaultProps} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('supports keyboard navigation', () => {
      render(<AvatarGrid {...defaultProps} />);
      
      const firstAvatar = screen.getByTestId('avatar-1');
      firstAvatar.focus();
      
      fireEvent.keyDown(document.activeElement!, { key: 'ArrowRight' });
      expect(screen.getByTestId('avatar-2')).toHaveFocus();
      
      fireEvent.keyDown(document.activeElement!, { key: 'Enter' });
      expect(defaultProps.onUserSelect).toHaveBeenCalledWith('2');
    });

    it('announces filtered results to screen readers', () => {
      const { rerender } = render(<AvatarGrid {...defaultProps} />);
      
      rerender(<AvatarGrid {...defaultProps} searchQuery="NonexistentUser" />);
      
      expect(screen.getByRole('alert')).toHaveTextContent(
        'No users found matching your search criteria'
      );
    });
  });
}); 