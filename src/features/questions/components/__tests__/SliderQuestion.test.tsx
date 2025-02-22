import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { SliderQuestionComponent } from '../SliderQuestion';
import { QuestionType } from '../../types/questions';

describe('SliderQuestion', () => {
  const mockQuestion = {
    id: 'q1',
    type: QuestionType.SLIDER,
    prompt: 'How satisfied are you?',
    text: 'How satisfied are you?',
    label: 'Satisfaction',
    leftLabel: 'Not at all',
    rightLabel: 'Very much',
    defaultValue: 50,
    number: 1,
    requiredForOnboarding: true,
    includeInOnboarding: true
  };

  const mockOnAnswer = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders question prompt and slider', () => {
    render(
      <SliderQuestionComponent
        question={mockQuestion}
        onAnswer={mockOnAnswer}
      />
    );

    expect(screen.getByText(mockQuestion.prompt)).toBeInTheDocument();
    expect(screen.getByRole('slider')).toBeInTheDocument();
    expect(screen.getByText(mockQuestion.leftLabel)).toBeInTheDocument();
    expect(screen.getByText(mockQuestion.rightLabel)).toBeInTheDocument();
  });

  it('handles slider input and submission', () => {
    render(
      <SliderQuestionComponent
        question={mockQuestion}
        onAnswer={mockOnAnswer}
      />
    );

    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: '75' } });
    
    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    expect(mockOnAnswer).toHaveBeenCalledWith(
      expect.objectContaining({
        questionId: mockQuestion.id,
        value: {
          type: 'SLIDER',
          value: 75,
          normalizedValue: 0.75
        }
      })
    );
  });

  it('shows current value as percentage', () => {
    render(
      <SliderQuestionComponent
        question={mockQuestion}
        onAnswer={mockOnAnswer}
      />
    );

    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: '75' } });
    
    expect(screen.getByText('75%')).toBeInTheDocument();
  });

  it('disables interaction when disabled prop is true', () => {
    render(
      <SliderQuestionComponent
        question={mockQuestion}
        onAnswer={mockOnAnswer}
        disabled={true}
      />
    );

    expect(screen.getByRole('slider')).toBeDisabled();
    expect(screen.getByText('Submit')).toBeDisabled();
  });
}); 