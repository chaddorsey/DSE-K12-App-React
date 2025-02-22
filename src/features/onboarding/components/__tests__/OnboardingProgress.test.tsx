import React from 'react';
import { render, screen } from '@testing-library/react';
import { OnboardingProgress } from '../OnboardingProgress';

describe('OnboardingProgress', () => {
  it('renders progress bar with correct percentage', () => {
    render(
      <OnboardingProgress 
        currentIndex={2} 
        totalQuestions={5} 
      />
    );

    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '40');
  });

  it('shows correct question count', () => {
    render(
      <OnboardingProgress 
        currentIndex={2} 
        totalQuestions={5} 
      />
    );

    expect(screen.getByText('Question 3 of 5')).toBeInTheDocument();
  });

  it('handles zero progress', () => {
    render(
      <OnboardingProgress 
        currentIndex={0} 
        totalQuestions={5} 
      />
    );

    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '0');
  });

  it('handles complete progress', () => {
    render(
      <OnboardingProgress 
        currentIndex={4} 
        totalQuestions={5} 
      />
    );

    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '80');
  });
}); 