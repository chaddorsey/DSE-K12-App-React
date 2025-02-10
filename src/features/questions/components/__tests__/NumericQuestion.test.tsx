import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { NumericQuestion } from '../NumericQuestion';
import type { NumericQuestionType } from '../../types';

describe('NumericQuestion', () => {
  const mockQuestion: NumericQuestionType = {
    id: 'q1',
    type: 'NUMERIC',
    prompt: 'How many years of experience do you have?',
    min: 0,
    max: 50,
    step: 1
  };

  const mockOnAnswer = jest.fn();

  beforeEach(() => {
    mockOnAnswer.mockClear();
  });

  it('renders the question prompt', () => {
    render(
      <NumericQuestion
        question={mockQuestion}
        onAnswer={mockOnAnswer}
      />
    );
    
    expect(screen.getByText(mockQuestion.prompt)).toBeInTheDocument();
  });

  it('renders a numeric input with min/max/step constraints', () => {
    render(
      <NumericQuestion
        question={mockQuestion}
        onAnswer={mockOnAnswer}
      />
    );
    
    const input = screen.getByRole('spinbutton');
    expect(input).toHaveAttribute('min', '0');
    expect(input).toHaveAttribute('max', '50');
    expect(input).toHaveAttribute('step', '1');
  });

  it('calls onAnswer with entered number', () => {
    render(
      <NumericQuestion
        question={mockQuestion}
        onAnswer={mockOnAnswer}
      />
    );
    
    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '5' } });
    fireEvent.blur(input);
    
    expect(mockOnAnswer).toHaveBeenCalledWith({
      questionId: mockQuestion.id,
      answer: '5',
      timestamp: expect.any(Number)
    });
  });

  it('shows validation error for out-of-range values', () => {
    render(
      <NumericQuestion
        question={mockQuestion}
        onAnswer={mockOnAnswer}
      />
    );
    
    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '100' } });
    
    expect(screen.getByText(/must be between 0 and 50/i)).toBeInTheDocument();
  });

  it('disables input when disabled prop is true', () => {
    render(
      <NumericQuestion
        question={mockQuestion}
        onAnswer={mockOnAnswer}
        disabled={true}
      />
    );
    
    expect(screen.getByRole('spinbutton')).toBeDisabled();
  });

  it('shows loading state when loading prop is true', () => {
    render(
      <NumericQuestion
        question={mockQuestion}
        onAnswer={mockOnAnswer}
        loading={true}
      />
    );
    
    expect(screen.getByTestId('question-loading')).toBeInTheDocument();
  });

  it('enables submit button only when valid value is entered', () => {
    render(
      <NumericQuestion
        question={mockQuestion}
        onAnswer={mockOnAnswer}
      />
    );
    
    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(submitButton).toBeDisabled();
    
    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '5' } });
    
    expect(submitButton).not.toBeDisabled();
  });

  it('disables submit button when value is out of range', () => {
    render(
      <NumericQuestion
        question={mockQuestion}
        onAnswer={mockOnAnswer}
      />
    );
    
    const submitButton = screen.getByRole('button', { name: /submit/i });
    const input = screen.getByRole('spinbutton');
    
    fireEvent.change(input, { target: { value: '100' } });
    expect(submitButton).toBeDisabled();
  });
}); 