import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProgressiveAvatarDemo } from '../ProgressiveAvatarDemo';
import { mockUsers } from '../../test/mockData';

describe('ProgressiveAvatarDemo', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('starts in standard mode and allows switching to progressive', () => {
    render(<ProgressiveAvatarDemo />);
    
    expect(screen.getByText(/standard mode/i)).toBeInTheDocument();
    
    fireEvent.click(screen.getByText(/switch to progressive/i));
    
    expect(screen.getByText(/face recognition/i)).toBeInTheDocument();
  });

  it('guides user through recognition levels', async () => {
    render(<ProgressiveAvatarDemo />);
    
    // Start progressive mode
    fireEvent.click(screen.getByText(/switch to progressive/i));
    
    // Should start with face recognition
    expect(screen.getByText(/select people whose faces you recognize/i)).toBeInTheDocument();
    
    // Select a user
    fireEvent.click(screen.getByTestId('avatar-1'));
    
    // Should show success and allow proceeding to next level
    const nextButton = await screen.findByText(/proceed to name recognition/i);
    fireEvent.click(nextButton);
    
    // Should now be in name recognition mode
    expect(screen.getByText(/select people whose names you know/i)).toBeInTheDocument();
  });

  it('shows progress through recognition levels', () => {
    render(<ProgressiveAvatarDemo />);
    
    fireEvent.click(screen.getByText(/switch to progressive/i));
    
    // Select users in face recognition
    fireEvent.click(screen.getByTestId('avatar-1'));
    fireEvent.click(screen.getByTestId('avatar-2'));
    
    expect(screen.getByText(/2 faces recognized/i)).toBeInTheDocument();
  });

  it('provides keyboard navigation support', () => {
    render(<ProgressiveAvatarDemo />);
    
    fireEvent.click(screen.getByText(/switch to progressive/i));
    
    const firstAvatar = screen.getByTestId('avatar-1');
    firstAvatar.focus();
    
    // Navigate with arrow keys
    fireEvent.keyDown(document.activeElement!, { key: 'ArrowRight' });
    expect(screen.getByTestId('avatar-2')).toHaveFocus();
    
    // Select with space
    fireEvent.keyDown(document.activeElement!, { key: ' ' });
    expect(screen.getByTestId('avatar-2')).toHaveClass('selected-face');
  });

  it('allows reviewing and modifying selections', () => {
    render(<ProgressiveAvatarDemo />);
    
    // Make some selections
    fireEvent.click(screen.getByText(/switch to progressive/i));
    fireEvent.click(screen.getByTestId('avatar-1'));
    
    // Open review mode
    fireEvent.click(screen.getByText(/review selections/i));
    
    // Should show selection summary
    expect(screen.getByText(/1 face recognized/i)).toBeInTheDocument();
    
    // Should allow modifying
    fireEvent.click(screen.getByTestId('avatar-1'));
    expect(screen.getByTestId('avatar-1')).not.toHaveClass('selected-face');
  });
}); 