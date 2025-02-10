import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MultipleChoiceQuestion } from '../MultipleChoiceQuestion';
import type { MultipleChoiceQuestionType } from '../../types';
import { AccessibilityProvider } from '../../../../features/accessibility/context/AccessibilityContext';

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

const renderWithA11y = (ui: React.ReactElement) => {
  return render(
    <AccessibilityProvider>
      {ui}
    </AccessibilityProvider>
  );
};

describe('MultipleChoiceQuestion Accessibility', () => {
  const mockOnAnswer = jest.fn();

  beforeEach(() => {
    mockOnAnswer.mockClear();
  });

  it('supports keyboard navigation between options', () => {
    renderWithA11y(
      <MultipleChoiceQuestion 
        question={mockQuestion}
        onAnswer={mockOnAnswer}
      />
    );

    const options = screen.getAllByRole('radio');
    options[0].focus();

    // Navigate down
    fireEvent.keyDown(document.activeElement!, { key: 'ArrowDown' });
    expect(options[1]).toHaveFocus();

    // Navigate down again
    fireEvent.keyDown(document.activeElement!, { key: 'ArrowDown' });
    expect(options[2]).toHaveFocus();

    // Wrap to first option
    fireEvent.keyDown(document.activeElement!, { key: 'ArrowDown' });
    expect(options[0]).toHaveFocus();
  });

  it('allows selection with Space and Enter keys', () => {
    renderWithA11y(
      <MultipleChoiceQuestion 
        question={mockQuestion}
        onAnswer={mockOnAnswer}
      />
    );

    const options = screen.getAllByRole('radio');
    
    // Select with Space
    options[0].focus();
    fireEvent.keyDown(options[0], { key: ' ' });
    expect(mockOnAnswer).toHaveBeenCalledWith({
      questionId: mockQuestion.id,
      answer: mockQuestion.options[0],
      timestamp: expect.any(Number)
    });

    // Select with Enter
    options[1].focus();
    fireEvent.keyDown(options[1], { key: 'Enter' });
    expect(mockOnAnswer).toHaveBeenCalledWith({
      questionId: mockQuestion.id,
      answer: mockQuestion.options[1],
      timestamp: expect.any(Number)
    });
  });

  it('handles Escape key to clear selection', () => {
    renderWithA11y(
      <MultipleChoiceQuestion 
        question={mockQuestion}
        onAnswer={mockOnAnswer}
      />
    );

    const options = screen.getAllByRole('radio');
    
    // Select an option
    fireEvent.click(options[0]);
    expect(options[0]).toHaveAttribute('aria-checked', 'true');

    // Press Escape
    fireEvent.keyDown(options[0], { key: 'Escape' });
    expect(options[0]).toHaveAttribute('aria-checked', 'false');
  });

  it('maintains proper ARIA attributes', () => {
    renderWithA11y(
      <MultipleChoiceQuestion 
        question={mockQuestion}
        onAnswer={mockOnAnswer}
      />
    );

    const radiogroup = screen.getByRole('radiogroup');
    expect(radiogroup).toHaveAttribute('aria-labelledby');
    expect(radiogroup).toHaveAttribute('aria-describedby');

    const options = screen.getAllByRole('radio');
    options.forEach(option => {
      expect(option).toHaveAttribute('aria-checked');
      expect(option).toHaveAttribute('tabIndex');
    });
  });
}); 