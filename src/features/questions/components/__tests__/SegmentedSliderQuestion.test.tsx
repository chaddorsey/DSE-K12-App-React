import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { SegmentedSliderQuestionComponent } from '../SegmentedSliderQuestion';
import { QuestionType } from '../../types/questions';

describe('SegmentedSliderQuestion', () => {
  const mockQuestion = {
    id: 'q1',
    type: QuestionType.SEGMENTED,
    prompt: 'How would you rate your experience?',
    text: 'How would you rate your experience?',
    label: 'Experience Rating',
    segments: [
      { label: 'Poor', description: 'Not satisfied at all' },
      { label: 'Fair', description: 'Somewhat satisfied' },
      { label: 'Good', description: 'Mostly satisfied' },
      { label: 'Excellent', description: 'Completely satisfied' }
    ],
    defaultSegment: 1,
    number: 1,
    requiredForOnboarding: true,
    includeInOnboarding: true
  };

  const mockOnAnswer = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders question prompt and segments', () => {
    render(
      <SegmentedSliderQuestionComponent
        question={mockQuestion}
        onAnswer={mockOnAnswer}
      />
    );

    expect(screen.getByText(mockQuestion.prompt)).toBeInTheDocument();
    mockQuestion.segments.forEach(segment => {
      expect(screen.getByText(segment.label)).toBeInTheDocument();
      expect(screen.getByText(segment.description)).toBeInTheDocument();
    });
  });

  it('handles segment selection and submission', () => {
    render(
      <SegmentedSliderQuestionComponent
        question={mockQuestion}
        onAnswer={mockOnAnswer}
      />
    );

    const goodSegment = screen.getByText('Good').closest('button');
    fireEvent.click(goodSegment!);
    
    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    expect(mockOnAnswer).toHaveBeenCalledWith(
      expect.objectContaining({
        questionId: mockQuestion.id,
        value: {
          type: 'SEGMENTED',
          selectedSegment: 2,
          segmentLabel: 'Good',
          normalizedValue: 2/3
        }
      })
    );
  });

  it('shows selected segment state', () => {
    render(
      <SegmentedSliderQuestionComponent
        question={mockQuestion}
        onAnswer={mockOnAnswer}
      />
    );

    const goodSegment = screen.getByText('Good').closest('button');
    fireEvent.click(goodSegment!);
    
    expect(goodSegment).toHaveClass('selected');
  });

  it('disables interaction when disabled prop is true', () => {
    render(
      <SegmentedSliderQuestionComponent
        question={mockQuestion}
        onAnswer={mockOnAnswer}
        disabled={true}
      />
    );

    const segments = screen.getAllByRole('button');
    segments.forEach(segment => {
      expect(segment).toBeDisabled();
    });
  });
}); 