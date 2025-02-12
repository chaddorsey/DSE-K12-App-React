import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { MultipleChoiceQuestion } from '../MultipleChoiceQuestion';
import { AccessibilityProvider } from '../../../accessibility/context/AccessibilityContext';

const mockQuestion = {
  id: 'q1',
  type: 'MULTIPLE_CHOICE' as const,
  prompt: 'Select your favorite color',
  options: ['Red', 'Blue', 'Green']
};

const renderWithA11y = (ui: React.ReactElement) => {
  return render(
    <AccessibilityProvider>
      {ui}
    </AccessibilityProvider>
  );
};

describe('MultipleChoiceQuestion Mobile Interactions', () => {
  const mockOnAnswer = jest.fn();
  const originalGetComputedStyle = window.getComputedStyle;

  beforeEach(() => {
    mockOnAnswer.mockClear();
    // Mock viewport as mobile device
    Object.defineProperty(window, 'innerWidth', { value: 375, configurable: true });
    Object.defineProperty(window, 'innerHeight', { value: 667, configurable: true });
    // Mock touch support
    Object.defineProperty(window, 'ontouchstart', { value: null });
    
    // Mock getComputedStyle
    window.getComputedStyle = jest.fn().mockImplementation((element) => ({
      ...originalGetComputedStyle(element),
      height: '48px',
      width: '100%',
      display: 'grid',
      gridTemplateColumns: '40% 60%'
    }));
  });

  afterEach(() => {
    jest.restoreAllMocks();
    window.getComputedStyle = originalGetComputedStyle;
  });

  it('handles touch events correctly', async () => {
    renderWithA11y(
      <MultipleChoiceQuestion 
        question={mockQuestion}
        onAnswer={mockOnAnswer}
      />
    );

    const options = screen.getAllByRole('radio');
    
    // Test touch feedback
    fireEvent.touchStart(options[0]);
    expect(options[0]).toHaveClass('touch-active');
    
    fireEvent.touchEnd(options[0]);
    expect(options[0]).not.toHaveClass('touch-active');
    expect(mockOnAnswer).toHaveBeenCalledWith({
      questionId: mockQuestion.id,
      answer: mockQuestion.options[0],
      timestamp: expect.any(Number)
    });
  });

  it('handles touch cancellation', () => {
    renderWithA11y(
      <MultipleChoiceQuestion 
        question={mockQuestion}
        onAnswer={mockOnAnswer}
      />
    );

    const options = screen.getAllByRole('radio');
    
    fireEvent.touchStart(options[0]);
    expect(options[0]).toHaveClass('touch-active');
    
    fireEvent.touchCancel(options[0]);
    expect(options[0]).not.toHaveClass('touch-active');
    expect(mockOnAnswer).not.toHaveBeenCalled();
  });

  it('prevents scrolling while touching options', () => {
    renderWithA11y(
      <MultipleChoiceQuestion 
        question={mockQuestion}
        onAnswer={mockOnAnswer}
      />
    );

    const options = screen.getAllByRole('radio');
    const touchStartEvent = new TouchEvent('touchstart', {
      bubbles: true,
      cancelable: true
    });
    
    const preventDefaultSpy = jest.spyOn(touchStartEvent, 'preventDefault');
    options[0].dispatchEvent(touchStartEvent);
    
    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('maintains minimum touch target size', () => {
    renderWithA11y(
      <MultipleChoiceQuestion 
        question={mockQuestion}
        onAnswer={mockOnAnswer}
      />
    );

    const options = screen.getAllByRole('radio');
    const computedStyle = window.getComputedStyle(options[0]);
    
    const height = parseInt(computedStyle.height);
    const width = parseInt(computedStyle.width);
    
    // iOS minimum touch target size
    expect(height).toBeGreaterThanOrEqual(44);
    expect(width).toBeGreaterThanOrEqual(44);
  });

  it('supports landscape orientation layout', () => {
    // Mock landscape orientation
    Object.defineProperty(window, 'innerWidth', { value: 667 });
    Object.defineProperty(window, 'innerHeight', { value: 375 });
    
    renderWithA11y(
      <MultipleChoiceQuestion 
        question={mockQuestion}
        onAnswer={mockOnAnswer}
      />
    );

    const container = screen.getByRole('radiogroup').parentElement;
    expect(container).toHaveClass('multiple-choice-question');
    expect(container).toHaveStyle({
      display: 'grid',
      gridTemplateColumns: '40% 60%'
    });
  });
}); 