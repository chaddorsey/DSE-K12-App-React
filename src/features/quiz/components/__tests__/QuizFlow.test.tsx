import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QuizFlow } from '../QuizFlow';
import { useQuiz } from '../../QuizContext';
import { QuestionType, QuestionCategory } from '../../../questions/types/questions';

jest.mock('../../QuizContext');

describe('QuizFlow', () => {
  const mockQuestion = {
    id: 'q1',
    type: QuestionType.MC,
    prompt: 'Test question?',
    text: 'Test question?',
    label: 'Test',
    category: QuestionCategory.PREFERENCES,
    options: ['A', 'B', 'C'],
    number: 1,
    correctAnswer: 'A',
    distractors: ['B', 'C']
  };

  const mockSubmitAnswer = jest.fn();
  const mockSkipQuestion = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useQuiz as jest.Mock).mockReturnValue({
      currentQuestion: mockQuestion,
      currentQuestionComponent: () => <div>Mock Question Component</div>,
      responses: [],
      isComplete: false,
      loading: false,
      error: null,
      score: 0,
      submitAnswer: mockSubmitAnswer,
      skipQuestion: mockSkipQuestion
    });
  });

  it('renders question component when available', () => {
    render(<QuizFlow />);
    expect(screen.getByText('Mock Question Component')).toBeInTheDocument();
  });

  it('shows loading spinner when loading', () => {
    (useQuiz as jest.Mock).mockReturnValue({
      loading: true
    });
    render(<QuizFlow />);
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('shows error message when error occurs', () => {
    (useQuiz as jest.Mock).mockReturnValue({
      error: 'Test error'
    });
    render(<QuizFlow />);
    expect(screen.getByText('Error: Test error')).toBeInTheDocument();
  });

  it('shows completion screen with score when complete', () => {
    (useQuiz as jest.Mock).mockReturnValue({
      isComplete: true,
      score: 150,
      responses: Array(5).fill({})
    });
    render(<QuizFlow />);
    expect(screen.getByText(/Quiz Complete!/)).toBeInTheDocument();
    expect(screen.getByText(/150/)).toBeInTheDocument();
  });

  it('shows progress indicator', () => {
    (useQuiz as jest.Mock).mockReturnValue({
      currentQuestion: mockQuestion,
      responses: Array(2).fill({}),
      currentQuestionComponent: () => <div>Mock Question</div>
    });
    render(<QuizFlow />);
    expect(screen.getByText('Question 3 of 3')).toBeInTheDocument();
  });

  it('allows skipping non-required questions', () => {
    (useQuiz as jest.Mock).mockReturnValue({
      currentQuestion: { ...mockQuestion, required: false },
      currentQuestionComponent: () => <div>Mock Question</div>,
      skipQuestion: mockSkipQuestion
    });
    
    render(<QuizFlow />);
    fireEvent.click(screen.getByText('Skip'));
    expect(mockSkipQuestion).toHaveBeenCalled();
  });
}); 