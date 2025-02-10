import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { SliderQuestion } from '../SliderQuestion';
import type { SliderQuestionType } from '../../types';

describe('SliderQuestion', () => {
  const mockQuestion: SliderQuestionType = {
    id: 'slider1',
    type: 'SLIDER',
    prompt: 'What mix of Country and Rock & Roll?',
    leftOption: 'Country',
    rightOption: 'Rock & Roll',
    defaultValue: 0.5
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

  it('renders the question prompt and options', () => {
    render(<SliderQuestion {...defaultProps} />);
    
    expect(screen.getByText(mockQuestion.prompt)).toBeInTheDocument();
    expect(screen.getByText(mockQuestion.leftOption)).toBeInTheDocument();
    expect(screen.getByText(mockQuestion.rightOption)).toBeInTheDocument();
  });

  it('renders a slider with default value', () => {
    render(<SliderQuestion {...defaultProps} />);
    
    const slider = screen.getByRole('slider');
    expect(slider).toBeInTheDocument();
    expect(slider).toHaveValue('50'); // 0.5 converted to percentage
  });

  it('calls onAnswer with normalized value when submitted', () => {
    render(<SliderQuestion {...defaultProps} />);
    
    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: '75' } });
    
    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);
    
    expect(defaultProps.onAnswer).toHaveBeenCalledWith({
      questionId: mockQuestion.id,
      value: 0.75,
      timestamp: expect.any(Number)
    });
  });

  it('disables slider and submit button when disabled prop is true', () => {
    render(<SliderQuestion {...defaultProps} disabled={true} />);
    
    expect(screen.getByRole('slider')).toBeDisabled();
    expect(screen.getByRole('button', { name: /submit/i })).toBeDisabled();
  });

  it('shows loading state when loading prop is true', () => {
    render(<SliderQuestion {...defaultProps} loading={true} />);
    
    expect(screen.getByTestId('question-loading')).toBeInTheDocument();
  });
}); 