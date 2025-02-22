import React from 'react';
import { render, screen } from '@testing-library/react';
import { QuizProgress } from '../QuizProgress';

describe('QuizProgress', () => {
  const defaultProps = {
    currentQuestion: 3,
    totalQuestions: 5,
    score: 200
  };

  it('displays current question number and total', () => {
    render(<QuizProgress {...defaultProps} />);
    expect(screen.getByText('Question 3 of 5')).toBeInTheDocument();
  });

  it('shows current score', () => {
    render(<QuizProgress {...defaultProps} />);
    expect(screen.getByText('Score: 200')).toBeInTheDocument();
  });

  it('renders progress bar with correct percentage', () => {
    render(<QuizProgress {...defaultProps} />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '60');
  });

  it('handles zero progress state', () => {
    render(
      <QuizProgress 
        currentQuestion={1} 
        totalQuestions={5} 
        score={0} 
      />
    );
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '20');
  });

  it('handles complete progress state', () => {
    render(
      <QuizProgress 
        currentQuestion={5} 
        totalQuestions={5} 
        score={500} 
      />
    );
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '100');
  });
}); 