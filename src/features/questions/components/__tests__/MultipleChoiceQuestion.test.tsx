import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MultipleChoiceQuestion } from '../MultipleChoiceQuestion';
import type { MultipleChoiceQuestionType } from '../../types';

describe('MultipleChoiceQuestion', () => {
  const mockQuestion: MultipleChoiceQuestionType = {
    id: 'q1',
    type: 'MULTIPLE_CHOICE',
    prompt: 'What is your favorite color?',
    options: ['Red', 'Blue', 'Green'],
  };

  const mockOnAnswer = jest.fn();

  beforeEach(() => {
    mockOnAnswer.mockClear();
  });

  it('renders the question prompt', () => {
    render(
      <MultipleChoiceQuestion
        question={mockQuestion}
        onAnswer={mockOnAnswer}
      />
    );
    
    expect(screen.getByText(mockQuestion.prompt)).toBeInTheDocument();
  });

  it('renders all options as buttons', () => {
    render(
      <MultipleChoiceQuestion
        question={mockQuestion}
        onAnswer={mockOnAnswer}
      />
    );
    
    mockQuestion.options.forEach(option => {
      expect(screen.getByRole('button', { name: option })).toBeInTheDocument();
    });
  });

  it('calls onAnswer with selected option', () => {
    render(
      <MultipleChoiceQuestion
        question={mockQuestion}
        onAnswer={mockOnAnswer}
      />
    );
    
    fireEvent.click(screen.getByRole('button', { name: 'Blue' }));
    
    expect(mockOnAnswer).toHaveBeenCalledWith({
      questionId: mockQuestion.id,
      answer: 'Blue',
      timestamp: expect.any(Number)
    });
  });

  it('disables all options when disabled prop is true', () => {
    render(
      <MultipleChoiceQuestion
        question={mockQuestion}
        onAnswer={mockOnAnswer}
        disabled={true}
      />
    );
    
    mockQuestion.options.forEach(option => {
      expect(screen.getByRole('button', { name: option })).toBeDisabled();
    });
  });

  it('shows loading state when loading prop is true', () => {
    render(
      <MultipleChoiceQuestion
        question={mockQuestion}
        onAnswer={mockOnAnswer}
        loading={true}
      />
    );
    
    expect(screen.getByTestId('question-loading')).toBeInTheDocument();
  });
}); 