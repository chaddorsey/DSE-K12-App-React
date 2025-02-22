import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { QuizComplete } from '../QuizComplete';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../../QuizContext';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn()
}));

jest.mock('../../QuizContext', () => ({
  useQuiz: jest.fn()
}));

describe('QuizComplete', () => {
  const mockNavigate = jest.fn();
  const mockRestartQuiz = jest.fn();

  const defaultProps = {
    score: 350,
    totalQuestions: 5
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useQuiz as jest.Mock).mockReturnValue({
      restartQuiz: mockRestartQuiz
    });
  });

  it('displays completion message', () => {
    render(<QuizComplete {...defaultProps} />);
    expect(screen.getByText('Quiz Complete!')).toBeInTheDocument();
  });

  it('shows correct score percentage', () => {
    render(<QuizComplete {...defaultProps} />);
    // 350 points out of 500 possible = 70%
    expect(screen.getByText('70%')).toBeInTheDocument();
  });

  it('displays points earned', () => {
    render(<QuizComplete {...defaultProps} />);
    expect(screen.getByText('350')).toBeInTheDocument();
  });

  it('shows number of questions answered', () => {
    render(<QuizComplete {...defaultProps} />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('navigates to dashboard on continue', () => {
    render(<QuizComplete {...defaultProps} />);
    fireEvent.click(screen.getByText('Continue to Dashboard'));
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
  });

  it('restarts quiz when try again clicked', () => {
    render(<QuizComplete {...defaultProps} />);
    fireEvent.click(screen.getByText('Try Again'));
    expect(mockRestartQuiz).toHaveBeenCalled();
  });

  it('handles zero score', () => {
    render(<QuizComplete score={0} totalQuestions={5} />);
    expect(screen.getByText('0%')).toBeInTheDocument();
  });

  it('handles perfect score', () => {
    render(<QuizComplete score={500} totalQuestions={5} />);
    expect(screen.getByText('100%')).toBeInTheDocument();
  });
}); 