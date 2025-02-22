import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MultipleChoiceQuestionComponent } from '../MultipleChoiceQuestion';
import type { MultipleChoiceQuestionType } from '../../types';
import { AccessibilityProvider } from '../../../accessibility/context/AccessibilityContext';
import { QuestionType } from '../../types/questions';

describe('MultipleChoiceQuestion', () => {
  const mockQuestion = {
    id: 'q1',
    type: QuestionType.MC,
    prompt: 'Test question?',
    text: 'Test question?',
    label: 'Test',
    options: ['A', 'B', 'C'],
    number: 1,
    requiredForOnboarding: true,
    includeInOnboarding: true
  };

  const mockOnAnswer = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders question prompt and options', () => {
    render(
      <MultipleChoiceQuestionComponent
        question={mockQuestion}
        onAnswer={mockOnAnswer}
      />
    );

    expect(screen.getByText(mockQuestion.prompt)).toBeInTheDocument();
    mockQuestion.options.forEach(option => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });

  it('handles option selection and submission', () => {
    render(
      <MultipleChoiceQuestionComponent
        question={mockQuestion}
        onAnswer={mockOnAnswer}
      />
    );

    const option = screen.getByText('A');
    fireEvent.click(option);
    
    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    expect(mockOnAnswer).toHaveBeenCalledWith(
      expect.objectContaining({
        questionId: mockQuestion.id,
        value: {
          type: 'MC',
          selectedOption: 'A'
        }
      })
    );
  });

  it('disables interaction when disabled prop is true', () => {
    render(
      <MultipleChoiceQuestionComponent
        question={mockQuestion}
        onAnswer={mockOnAnswer}
        disabled={true}
      />
    );

    const options = screen.getAllByRole('button');
    options.forEach(option => {
      expect(option).toBeDisabled();
    });
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
      <MultipleChoiceQuestionComponent 
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
      <MultipleChoiceQuestionComponent 
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
      <MultipleChoiceQuestionComponent 
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
      <MultipleChoiceQuestionComponent 
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