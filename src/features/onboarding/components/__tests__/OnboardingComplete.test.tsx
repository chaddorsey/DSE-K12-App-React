import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { OnboardingComplete } from '../OnboardingComplete';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../auth/AuthContext';
import { useOnboarding } from '../../OnboardingContext';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn()
}));

jest.mock('../../../auth/AuthContext', () => ({
  useAuth: jest.fn()
}));

jest.mock('../../OnboardingContext', () => ({
  useOnboarding: jest.fn()
}));

describe('OnboardingComplete', () => {
  const mockNavigate = jest.fn();
  const mockResponses = Array(5).fill({});

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useAuth as jest.Mock).mockReturnValue({
      user: { displayName: 'Test User' }
    });
    (useOnboarding as jest.Mock).mockReturnValue({
      responses: mockResponses
    });
  });

  it('displays completion message with user name', () => {
    render(<OnboardingComplete />);
    expect(screen.getByText(/Thanks Test User!/)).toBeInTheDocument();
  });

  it('shows correct number of completed questions', () => {
    render(<OnboardingComplete />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('navigates to dashboard on continue', () => {
    render(<OnboardingComplete />);
    fireEvent.click(screen.getByText('Continue to Dashboard'));
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
  });

  it('navigates to restart on retake', () => {
    render(<OnboardingComplete />);
    fireEvent.click(screen.getByText('Retake Onboarding'));
    expect(mockNavigate).toHaveBeenCalledWith('/onboarding/restart');
  });

  it('handles missing user display name', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: { displayName: null }
    });
    render(<OnboardingComplete />);
    expect(screen.getByText(/Thanks there!/)).toBeInTheDocument();
  });
}); 