import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { SegmentedSliderQuestion } from '../SegmentedSliderQuestion';
import type { SegmentedSliderQuestionType } from '../../types';

describe('SegmentedSliderQuestion', () => {
  const mockQuestion: SegmentedSliderQuestionType = {
    id: 'segment1',
    type: 'SEGMENTED_SLIDER',
    prompt: 'How strongly do you agree?',
    segments: [
      { value: 1, label: 'Strongly Disagree' },
      { value: 2, label: 'Disagree' },
      { value: 3, label: 'Neutral' },
      { value: 4, label: 'Agree' },
      { value: 5, label: 'Strongly Agree' }
    ],
    defaultSegment: 3
  };

  const unlabeledQuestion: SegmentedSliderQuestionType = {
    id: 'segment2',
    type: 'SEGMENTED_SLIDER',
    prompt: 'Rate your interest level:',
    segments: [
      { value: 1 },
      { value: 2 },
      { value: 3 },
      { value: 4 },
      { value: 5 }
    ],
    defaultSegment: 3
  };

  const defaultProps = {
    question: mockQuestion,
    onAnswer: jest.fn(),
    disabled: false,
    loading: false
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the question prompt and segment labels', () => {
    render(<SegmentedSliderQuestion {...defaultProps} />);
    
    expect(screen.getByText(mockQuestion.prompt)).toBeInTheDocument();
    mockQuestion.segments.forEach(segment => {
      if (segment.label) {
        expect(screen.getByText(segment.label)).toBeInTheDocument();
      }
    });
  });

  it('renders numeric values for unlabeled segments', () => {
    render(<SegmentedSliderQuestion question={unlabeledQuestion} onAnswer={defaultProps.onAnswer} />);
    
    unlabeledQuestion.segments.forEach(segment => {
      expect(screen.getByText(segment.value.toString())).toBeInTheDocument();
    });
  });

  it('snaps to nearest segment value when sliding', () => {
    render(<SegmentedSliderQuestion {...defaultProps} />);
    const slider = screen.getByRole('slider');
    
    // Simulate sliding to between segments 3 and 4 (should snap to 4)
    fireEvent.change(slider, { target: { value: '70' } });
    
    expect(slider).toHaveValue('75'); // Position for segment 4 (75%)
  });

  it('calls onAnswer with correct segment value when submitted', () => {
    render(<SegmentedSliderQuestion {...defaultProps} />);
    
    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: '75' } });
    
    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);
    
    expect(defaultProps.onAnswer).toHaveBeenCalledWith({
      questionId: mockQuestion.id,
      value: 4,
      timestamp: expect.any(Number)
    });
  });

  it('shows correct/incorrect feedback in quiz mode', () => {
    render(
      <SegmentedSliderQuestion 
        {...defaultProps} 
        correctAnswer="4"
        disabled={true}
      />
    );
    
    const slider = screen.getByRole('slider');
    expect(slider).toBeDisabled();
    expect(slider.parentElement).toHaveClass('correct');
  });

  it('handles loading state', () => {
    render(<SegmentedSliderQuestion {...defaultProps} loading={true} />);
    expect(screen.getByTestId('question-loading')).toBeInTheDocument();
  });
}); 