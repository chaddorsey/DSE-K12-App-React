import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { NumericQuestionComponent } from '../NumericQuestion';
import { QuestionType } from '../../types/questions';

describe('NumericQuestion', () => {
  const mockQuestion = {
    id: 'q1',
    type: QuestionType.NM,
    prompt: 'What is 2 + 2?',
    text: 'What is 2 + 2?',
    label: 'Basic Math',
    min: 0,
    max: 10,
    step: 1,
    unit: 'units',
    number: 1,
    requiredForOnboarding: true,
    includeInOnboarding: true
  };

  const mockOnAnswer = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders question prompt and numeric input', () => {
    render(
      <NumericQuestionComponent
        question={mockQuestion}
        onAnswer={mockOnAnswer}
      />
    );

    expect(screen.getByText(mockQuestion.prompt)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter a number')).toBeInTheDocument();
    expect(screen.getByText(mockQuestion.unit)).toBeInTheDocument();
  });

  it('handles numeric input and submission', () => {
    render(
      <NumericQuestionComponent
        question={mockQuestion}
        onAnswer={mockOnAnswer}
      />
    );

    const input = screen.getByPlaceholderText('Enter a number');
    fireEvent.change(input, { target: { value: '4' } });
    
    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    expect(mockOnAnswer).toHaveBeenCalledWith(
      expect.objectContaining({
        questionId: mockQuestion.id,
        value: {
          type: 'NM',
          numericValue: 4,
          unit: 'units'
        }
      })
    );
  });

  it('validates input within min/max range', () => {
    render(
      <NumericQuestionComponent
        question={mockQuestion}
        onAnswer={mockOnAnswer}
      />
    );

    const input = screen.getByPlaceholderText('Enter a number');
    expect(input).toHaveAttribute('min', '0');
    expect(input).toHaveAttribute('max', '10');
    expect(input).toHaveAttribute('step', '1');
  });

  it('disables interaction when disabled prop is true', () => {
    render(
      <NumericQuestionComponent
        question={mockQuestion}
        onAnswer={mockOnAnswer}
        disabled={true}
      />
    );

    expect(screen.getByPlaceholderText('Enter a number')).toBeDisabled();
    expect(screen.getByText('Submit')).toBeDisabled();
  });
}); 