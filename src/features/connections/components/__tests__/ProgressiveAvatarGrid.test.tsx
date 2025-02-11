import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProgressiveAvatarGrid } from '../ProgressiveAvatarGrid';
import type { User } from '../../types/user';
import type { ProgressiveSelection } from '../../types/progressive-selection';

describe('ProgressiveAvatarGrid', () => {
  const mockUsers: User[] = [
    { id: '1', name: 'Alice', avatar: '/avatars/alice.jpg' },
    { id: '2', name: 'Bob', avatar: '/avatars/bob.jpg' },
    { id: '3', name: 'Charlie', avatar: '/avatars/charlie.jpg' },
  ];

  const defaultProps = {
    users: mockUsers,
    currentLevel: 'FACE' as const,
    selections: {},
    isProgressiveMode: true,
    onUserSelect: jest.fn(),
    onLevelChange: jest.fn(),
    onModeToggle: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all users in the grid', () => {
    render(<ProgressiveAvatarGrid {...defaultProps} />);
    
    mockUsers.forEach(user => {
      expect(screen.getByTestId(`avatar-${user.id}`)).toBeInTheDocument();
    });
  });

  it('shows current recognition level indicator', () => {
    render(<ProgressiveAvatarGrid {...defaultProps} />);
    
    expect(screen.getByText(/face recognition/i)).toBeInTheDocument();
  });

  it('handles user selection in progressive mode', () => {
    render(<ProgressiveAvatarGrid {...defaultProps} />);
    
    fireEvent.click(screen.getByTestId('avatar-1'));
    
    expect(defaultProps.onUserSelect).toHaveBeenCalledWith('1');
  });

  it('supports keyboard navigation', () => {
    render(<ProgressiveAvatarGrid {...defaultProps} />);
    
    const firstAvatar = screen.getByTestId('avatar-1');
    firstAvatar.focus();
    
    fireEvent.keyDown(document.activeElement!, { key: 'ArrowRight' });
    expect(screen.getByTestId('avatar-2')).toHaveFocus();
    
    fireEvent.keyDown(document.activeElement!, { key: 'Enter' });
    expect(defaultProps.onUserSelect).toHaveBeenCalledWith('2');
  });

  it('shows visual feedback for selected recognition levels', () => {
    const selections: Record<string, ProgressiveSelection> = {
      '1': { userId: '1', recognitionLevel: 'FACE', timestamp: Date.now() }
    };
    
    render(<ProgressiveAvatarGrid {...defaultProps} selections={selections} />);
    
    expect(screen.getByTestId('avatar-1')).toHaveClass('selected-face');
  });

  describe('Accessibility Features', () => {
    it('announces level changes to screen readers', () => {
      const { rerender } = render(<ProgressiveAvatarGrid {...defaultProps} />);
      
      expect(screen.getByRole('status')).toHaveTextContent(/face recognition/i);
      
      rerender(<ProgressiveAvatarGrid {...defaultProps} currentLevel="NAME" />);
      
      expect(screen.getByRole('status')).toHaveTextContent(/name recognition/i);
    });

    it('provides keyboard shortcuts for level navigation', () => {
      render(<ProgressiveAvatarGrid {...defaultProps} />);
      
      fireEvent.keyDown(document.body, { key: '1', ctrlKey: true });
      expect(defaultProps.onLevelChange).toHaveBeenCalledWith('FACE');
      
      fireEvent.keyDown(document.body, { key: '2', ctrlKey: true });
      expect(defaultProps.onLevelChange).toHaveBeenCalledWith('NAME');
    });

    it('maintains focus when filtering or reordering', () => {
      const { rerender } = render(<ProgressiveAvatarGrid {...defaultProps} />);
      
      const firstAvatar = screen.getByTestId('avatar-1');
      firstAvatar.focus();
      
      rerender(<ProgressiveAvatarGrid {...defaultProps} currentLevel="NAME" />);
      
      expect(document.activeElement).toBe(firstAvatar);
    });

    it('provides clear visual indication of current mode', () => {
      render(<ProgressiveAvatarGrid {...defaultProps} />);
      
      const modeIndicator = screen.getByRole('status');
      expect(modeIndicator).toHaveAttribute('aria-live', 'polite');
      expect(modeIndicator).toHaveClass('mode-indicator');
    });
  });

  describe('Loading States', () => {
    const loadingProps = {
      ...defaultProps,
      loading: true
    };

    it('shows loading skeleton when loading', () => {
      render(<ProgressiveAvatarGrid {...loadingProps} />);
      
      expect(screen.getByTestId('avatar-grid-loading')).toBeInTheDocument();
      expect(screen.queryByRole('grid')).not.toBeInTheDocument();
    });

    it('maintains grid structure during loading', () => {
      render(<ProgressiveAvatarGrid {...loadingProps} />);
      
      const skeletons = screen.getAllByTestId('avatar-skeleton');
      expect(skeletons).toHaveLength(defaultProps.users.length);
    });

    it('preserves level indicator during loading', () => {
      render(<ProgressiveAvatarGrid {...loadingProps} />);
      
      expect(screen.getByRole('status')).toHaveTextContent(/face recognition/i);
    });

    it('disables interactions while loading', () => {
      render(<ProgressiveAvatarGrid {...loadingProps} />);
      
      const modeToggle = screen.getByRole('button');
      expect(modeToggle).toBeDisabled();
      
      const skeletons = screen.getAllByTestId('avatar-skeleton');
      skeletons.forEach(skeleton => {
        expect(skeleton).toHaveAttribute('aria-disabled', 'true');
      });
    });

    it('announces loading state to screen readers', () => {
      render(<ProgressiveAvatarGrid {...loadingProps} />);
      
      expect(screen.getByRole('alert')).toHaveTextContent(/loading/i);
    });

    it('maintains layout stability during loading-content transition', () => {
      const { rerender } = render(<ProgressiveAvatarGrid {...loadingProps} />);
      
      const initialHeight = screen.getByTestId('avatar-grid-loading').clientHeight;
      
      rerender(<ProgressiveAvatarGrid {...defaultProps} />);
      
      const finalHeight = screen.getByRole('grid').clientHeight;
      expect(finalHeight).toBe(initialHeight);
    });
  });

  describe('Loading Progress', () => {
    it('shows loading progress indicator', () => {
      render(<ProgressiveAvatarGrid {...defaultProps} loading={true} loadingProgress={0.4} />);
      
      const progress = screen.getByRole('progressbar');
      expect(progress).toHaveAttribute('aria-valuenow', '40');
      expect(progress).toHaveAttribute('aria-valuemin', '0');
      expect(progress).toHaveAttribute('aria-valuemax', '100');
    });

    it('announces progress updates to screen readers', () => {
      const { rerender } = render(
        <ProgressiveAvatarGrid {...defaultProps} loading={true} loadingProgress={0.3} />
      );

      expect(screen.getByRole('alert')).toHaveTextContent(/30%/);
      
      rerender(<ProgressiveAvatarGrid {...defaultProps} loading={true} loadingProgress={0.6} />);
      
      expect(screen.getByRole('alert')).toHaveTextContent(/60%/);
    });
  });

  describe('Partial Loading States', () => {
    const partialLoadingProps = {
      ...defaultProps,
      partialLoading: {
        '1': true,
        '2': true
      }
    };

    it('shows skeleton for partially loading items', () => {
      render(<ProgressiveAvatarGrid {...partialLoadingProps} />);
      
      // Loading items should show skeletons
      expect(screen.getByTestId('avatar-1-skeleton')).toBeInTheDocument();
      expect(screen.getByTestId('avatar-2-skeleton')).toBeInTheDocument();
      
      // Non-loading item should show normal content
      expect(screen.getByTestId('avatar-3')).toBeInTheDocument();
    });

    it('disables interaction only for loading items', () => {
      render(<ProgressiveAvatarGrid {...partialLoadingProps} />);
      
      // Loading items should be disabled
      const loadingItems = screen.getAllByTestId(/avatar-[12]-skeleton/);
      loadingItems.forEach(item => {
        expect(item).toHaveAttribute('aria-disabled', 'true');
      });
      
      // Non-loading item should be interactive
      fireEvent.click(screen.getByTestId('avatar-3'));
      expect(defaultProps.onUserSelect).toHaveBeenCalledWith('3');
    });

    it('preserves selection state during partial loading', () => {
      const selections = {
        '1': { userId: '1', recognitionLevel: 'FACE', timestamp: Date.now() }
      };
      
      render(<ProgressiveAvatarGrid {...partialLoadingProps} selections={selections} />);
      
      // Loading item should show selection state in skeleton
      expect(screen.getByTestId('avatar-1-skeleton')).toHaveClass('selected-face');
    });

    it('maintains layout stability during partial loading', () => {
      const { rerender } = render(<ProgressiveAvatarGrid {...partialLoadingProps} />);
      
      const initialLayout = screen.getByRole('grid').getBoundingClientRect();
      
      // Update partial loading state
      rerender(<ProgressiveAvatarGrid {...defaultProps} partialLoading={{ '3': true }} />);
      
      const updatedLayout = screen.getByRole('grid').getBoundingClientRect();
      expect(updatedLayout).toEqual(initialLayout);
    });
  });
});