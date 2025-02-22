import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { XYContinuumQuestionComponent } from '../XYContinuumQuestion';
import { QuestionType } from '../../types/questions';

describe('XYContinuumQuestion', () => {
  const mockQuestion = {
    id: 'q1',
    type: QuestionType.XY,
    prompt: 'Plot your work style preferences',
    text: 'Plot your work style preferences',
    label: 'Work Style',
    xAxis: {
      left: 'Individual',
      right: 'Team'
    },
    yAxis: {
      top: 'Strategic',
      bottom: 'Tactical'
    },
    defaultPosition: { x: 0.5, y: 0.5 },
    number: 1,
    requiredForOnboarding: true,
    includeInOnboarding: true
  };

  const mockOnAnswer = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders question prompt and axis labels', () => {
    render(
      <XYContinuumQuestionComponent
        question={mockQuestion}
        onAnswer={mockOnAnswer}
      />
    );

    expect(screen.getByText(mockQuestion.prompt)).toBeInTheDocument();
    expect(screen.getByText(mockQuestion.xAxis.left)).toBeInTheDocument();
    expect(screen.getByText(mockQuestion.xAxis.right)).toBeInTheDocument();
    expect(screen.getByText(mockQuestion.yAxis.top)).toBeInTheDocument();
    expect(screen.getByText(mockQuestion.yAxis.bottom)).toBeInTheDocument();
  });

  it('handles grid click and submission', () => {
    render(
      <XYContinuumQuestionComponent
        question={mockQuestion}
        onAnswer={mockOnAnswer}
      />
    );

    const grid = screen.getByClassName('xy-grid');
    fireEvent.click(grid, { 
      clientX: 75, // 75% across
      clientY: 25  // 25% down
    });
    
    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    expect(mockOnAnswer).toHaveBeenCalledWith(
      expect.objectContaining({
        questionId: mockQuestion.id,
        value: {
          type: 'XY',
          position: expect.any(Object),
          xLabel: 'Team',
          yLabel: 'Strategic'
        }
      })
    );
  });

  it('shows marker at clicked position', () => {
    render(
      <XYContinuumQuestionComponent
        question={mockQuestion}
        onAnswer={mockOnAnswer}
      />
    );

    const grid = screen.getByClassName('xy-grid');
    fireEvent.click(grid, { 
      clientX: 75,
      clientY: 25
    });
    
    const marker = screen.getByClassName('xy-marker');
    expect(marker).toHaveStyle({
      left: '75%',
      bottom: '75%'
    });
  });

  it('disables interaction when disabled prop is true', () => {
    render(
      <XYContinuumQuestionComponent
        question={mockQuestion}
        onAnswer={mockOnAnswer}
        disabled={true}
      />
    );

    expect(screen.getByText('Submit')).toBeDisabled();
  });
}); 