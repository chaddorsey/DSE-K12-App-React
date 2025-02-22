import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QuizQuestion } from '../QuizQuestion';
import { QuestionType, QuestionCategory } from '../../../questions/types/questions';

describe('QuizQuestion', () => {
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

  const mockOnAnswer = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders question prompt', () => {
    render(
      <QuizQuestion 
        question={mockQuestion}
        onAnswer={mockOnAnswer}
        showFeedback={true}
      />
    );
    expect(screen.getByText('Test question?')).toBeInTheDocument();
  });

  it('shows feedback after answering', async () => {
    render(
      <QuizQuestion 
        question={mockQuestion}
        onAnswer={mockOnAnswer}
        showFeedback={true}
      />
    );

    fireEvent.click(screen.getByText('A'));
    
    await waitFor(() => {
      expect(screen.getByText(/Correct!/)).toBeInTheDocument();
    });
  });

  it('disables options after answering', async () => {
    render(
      <QuizQuestion 
        question={mockQuestion}
        onAnswer={mockOnAnswer}
        showFeedback={true}
      />
    );

    fireEvent.click(screen.getByText('A'));
    
    await waitFor(() => {
      const options = screen.getAllByRole('button');
      options.forEach(option => {
        expect(option).toBeDisabled();
      });
    });
  });

  it('tracks answer time', async () => {
    jest.useFakeTimers();
    
    render(
      <QuizQuestion 
        question={mockQuestion}
        onAnswer={mockOnAnswer}
        showFeedback={true}
      />
    );

    jest.advanceTimersByTime(1000);
    fireEvent.click(screen.getByText('A'));

    await waitFor(() => {
      expect(mockOnAnswer).toHaveBeenCalledWith(
        expect.objectContaining({
          metadata: expect.objectContaining({
            timeToAnswer: expect.any(Number)
          })
        })
      );
    });

    jest.useRealTimers();
  });

  it('handles interaction tracking', async () => {
    render(
      <QuizQuestion 
        question={mockQuestion}
        onAnswer={mockOnAnswer}
        showFeedback={true}
      />
    );

    // Simulate some interactions
    fireEvent.mouseMove(screen.getByText('B'));
    fireEvent.mouseMove(screen.getByText('C'));
    fireEvent.click(screen.getByText('A'));

    await waitFor(() => {
      expect(mockOnAnswer).toHaveBeenCalledWith(
        expect.objectContaining({
          metadata: expect.objectContaining({
            interactionCount: expect.any(Number)
          })
        })
      );
    });
  });
}); 