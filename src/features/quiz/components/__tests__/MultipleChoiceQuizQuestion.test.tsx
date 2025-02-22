import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MultipleChoiceQuizQuestion } from '../MultipleChoiceQuizQuestion';
import { QuestionType, QuestionCategory } from '../../../questions/types/questions';

describe('MultipleChoiceQuizQuestion', () => {
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

  it('renders all options', () => {
    render(
      <MultipleChoiceQuizQuestion 
        question={mockQuestion}
        onAnswer={mockOnAnswer}
        showFeedback={true}
      />
    );

    mockQuestion.options.forEach(option => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });

  it('handles option selection', () => {
    render(
      <MultipleChoiceQuizQuestion 
        question={mockQuestion}
        onAnswer={mockOnAnswer}
        showFeedback={true}
      />
    );

    fireEvent.click(screen.getByText('A'));
    
    expect(mockOnAnswer).toHaveBeenCalledWith(
      expect.objectContaining({
        value: {
          type: QuestionType.MC,
          selectedOption: 'A'
        }
      })
    );
  });

  it('shows selected state for chosen option', () => {
    render(
      <MultipleChoiceQuizQuestion 
        question={mockQuestion}
        onAnswer={mockOnAnswer}
        showFeedback={true}
      />
    );

    const optionA = screen.getByText('A').closest('button');
    fireEvent.click(optionA!);
    
    expect(optionA).toHaveClass('selected');
  });

  it('disables all options after selection', () => {
    render(
      <MultipleChoiceQuizQuestion 
        question={mockQuestion}
        onAnswer={mockOnAnswer}
        showFeedback={true}
      />
    );

    fireEvent.click(screen.getByText('A'));
    
    const options = screen.getAllByRole('button');
    options.forEach(option => {
      expect(option).toBeDisabled();
    });
  });

  it('shows correct/incorrect styling after answer', () => {
    render(
      <MultipleChoiceQuizQuestion 
        question={mockQuestion}
        onAnswer={mockOnAnswer}
        showFeedback={true}
      />
    );

    fireEvent.click(screen.getByText('B')); // Wrong answer
    
    const selectedOption = screen.getByText('B').closest('button');
    const correctOption = screen.getByText('A').closest('button');
    
    expect(selectedOption).toHaveClass('incorrect');
    expect(correctOption).toHaveClass('correct');
  });
}); 