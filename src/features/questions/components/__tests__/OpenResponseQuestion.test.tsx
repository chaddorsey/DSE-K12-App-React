import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { OpenResponseQuestion } from '../OpenResponseQuestion';
import type { OpenResponseQuestionType } from '../../types';

describe('OpenResponseQuestion', () => {
  const mockQuestion: OpenResponseQuestionType = {
    id: 'q1',
    type: 'OPEN_RESPONSE',
    prompt: 'What are your career goals?',
    maxLength: 500
  };

  const mockOnAnswer = jest.fn();

  beforeEach(() => {
    mockOnAnswer.mockClear();
  });

  it('renders the question prompt', () => {
    render(
      <OpenResponseQuestion
        question={mockQuestion}
        onAnswer={mockOnAnswer}
      />
    );
    
    expect(screen.getByText(mockQuestion.prompt)).toBeInTheDocument();
  });

  it('renders a textarea for input', () => {
    render(
      <OpenResponseQuestion
        question={mockQuestion}
        onAnswer={mockOnAnswer}
      />
    );
    
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('calls onAnswer with entered text', () => {
    render(
      <OpenResponseQuestion
        question={mockQuestion}
        onAnswer={mockOnAnswer}
      />
    );
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'My response' } });
    fireEvent.blur(input);
    
    expect(mockOnAnswer).toHaveBeenCalledWith({
      questionId: mockQuestion.id,
      answer: 'My response',
      timestamp: expect.any(Number)
    });
  });

  it('enforces maxLength constraint', () => {
    render(
      <OpenResponseQuestion
        question={mockQuestion}
        onAnswer={mockOnAnswer}
      />
    );
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('maxLength', '500');
  });

  it('shows remaining character count', () => {
    render(
      <OpenResponseQuestion
        question={mockQuestion}
        onAnswer={mockOnAnswer}
      />
    );
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Test' } });
    
    expect(screen.getByText('496 characters remaining')).toBeInTheDocument();
  });

  it('disables input when disabled prop is true', () => {
    render(
      <OpenResponseQuestion
        question={mockQuestion}
        onAnswer={mockOnAnswer}
        disabled={true}
      />
    );
    
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('shows loading state when loading prop is true', () => {
    render(
      <OpenResponseQuestion
        question={mockQuestion}
        onAnswer={mockOnAnswer}
        loading={true}
      />
    );
    
    expect(screen.getByTestId('question-loading')).toBeInTheDocument();
  });

  it('enables submit button only when text is entered', () => {
    render(
      <OpenResponseQuestion
        question={mockQuestion}
        onAnswer={mockOnAnswer}
      />
    );
    
    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(submitButton).toBeDisabled();
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Test response' } });
    
    expect(submitButton).not.toBeDisabled();
  });

  it('calls onAnswer when submit button is clicked', () => {
    render(
      <OpenResponseQuestion
        question={mockQuestion}
        onAnswer={mockOnAnswer}
      />
    );
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Test response' } });
    
    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);
    
    expect(mockOnAnswer).toHaveBeenCalledWith({
      questionId: mockQuestion.id,
      answer: 'Test response',
      timestamp: expect.any(Number)
    });
  });
}); 