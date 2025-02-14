import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { XYQuestion } from '../XYQuestion';
import type { XYQuestion as XYQuestionType } from '../../types/xy';
import { QuestionCategory } from '../../types/question';
import { renderHook, act } from '@testing-library/react-hooks';
import { useXYStatistics } from '../../hooks/useXYStatistics';

describe('XYQuestion', () => {
  const mockQuestion: XYQuestionType = {
    id: 'test-xy',
    type: 'XY',
    number: 1,
    text: 'Test XY Question',
    label: 'Test Label',
    category: QuestionCategory.PERSONALITY,
    config: {
      xAxis: {
        min: 0,
        max: 100,
        labels: { min: 'Left', max: 'Right' }
      },
      yAxis: {
        min: 0,
        max: 100,
        labels: { min: 'Bottom', max: 'Top' }
      }
    }
  };

  const mockOnAnswer = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock vibrate API
    navigator.vibrate = jest.fn();
  });

  it('renders the question text and grid', () => {
    render(
      <XYQuestion
        question={mockQuestion}
        onAnswer={mockOnAnswer}
      />
    );

    expect(screen.getByText('Test XY Question')).toBeInTheDocument();
    expect(screen.getByTestId('xy-grid')).toBeInTheDocument();
    expect(screen.getByText('Left')).toBeInTheDocument();
    expect(screen.getByText('Right')).toBeInTheDocument();
    expect(screen.getByText('Top')).toBeInTheDocument();
    expect(screen.getByText('Bottom')).toBeInTheDocument();
  });

  it('handles user interaction correctly', () => {
    render(
      <XYQuestion
        question={mockQuestion}
        onAnswer={mockOnAnswer}
      />
    );

    const grid = screen.getByTestId('xy-grid');
    fireEvent.mouseDown(grid);
    fireEvent.mouseMove(grid, { clientX: 50, clientY: 50 });
    fireEvent.mouseUp(grid);
    
    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    expect(mockOnAnswer).toHaveBeenCalledWith({
      questionId: 'test-xy',
      value: expect.any(Object),
      timestamp: expect.any(Number)
    });
  });

  it('shows loading state', () => {
    render(
      <XYQuestion
        question={mockQuestion}
        onAnswer={mockOnAnswer}
        loading={true}
      />
    );
    expect(screen.getByTestId('question-loading')).toBeInTheDocument();
  });

  it('handles disabled state', () => {
    render(
      <XYQuestion
        question={mockQuestion}
        onAnswer={mockOnAnswer}
        disabled={true}
      />
    );
    
    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(submitButton).toBeDisabled();
    
    const grid = screen.getByTestId('xy-grid');
    fireEvent.mouseDown(grid);
    fireEvent.mouseMove(grid, { clientX: 50, clientY: 50 });
    
    // Position shouldn't change when disabled
    expect(mockOnAnswer).not.toHaveBeenCalled();
  });

  it('handles keyboard navigation', () => {
    render(
      <XYQuestion
        question={mockQuestion}
        onAnswer={mockOnAnswer}
      />
    );
    
    const grid = screen.getByTestId('xy-grid');
    grid.focus();
    
    fireEvent.keyDown(grid, { key: 'ArrowRight' });
    fireEvent.keyDown(grid, { key: 'ArrowDown' });
    
    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);
    
    expect(mockOnAnswer).toHaveBeenCalledWith(expect.objectContaining({
      questionId: 'test-xy',
      value: expect.any(Object)
    }));
  });

  it('handles touch interactions correctly', () => {
    render(
      <XYQuestion
        question={mockQuestion}
        onAnswer={mockOnAnswer}
      />
    );

    const grid = screen.getByTestId('xy-grid');
    
    // Simulate touch start
    fireEvent.touchStart(grid, {
      touches: [{ clientX: 50, clientY: 50 }]
    });

    // Simulate touch move
    fireEvent.touchMove(grid, {
      touches: [{ clientX: 150, clientY: 150 }]
    });

    // Simulate touch end
    fireEvent.touchEnd(grid);

    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    expect(mockOnAnswer).toHaveBeenCalledWith(expect.objectContaining({
      questionId: 'test-xy',
      value: expect.any(Object)
    }));
  });

  it('prevents scrolling while dragging', () => {
    const preventDefault = jest.fn();
    
    render(
      <XYQuestion
        question={mockQuestion}
        onAnswer={mockOnAnswer}
      />
    );

    const grid = screen.getByTestId('xy-grid');
    
    fireEvent.touchStart(grid, {
      touches: [{ clientX: 50, clientY: 50 }],
      preventDefault
    });

    expect(preventDefault).toHaveBeenCalled();
  });

  it('uses vibration API when available', () => {
    render(
      <XYQuestion
        question={mockQuestion}
        onAnswer={mockOnAnswer}
      />
    );

    const grid = screen.getByTestId('xy-grid');
    
    fireEvent.touchStart(grid, {
      touches: [{ clientX: 50, clientY: 50 }]
    });
    expect(navigator.vibrate).toHaveBeenCalledWith(10);

    fireEvent.touchMove(grid, {
      touches: [{ clientX: 150, clientY: 150 }]
    });
    expect(navigator.vibrate).toHaveBeenCalledWith(5);

    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);
    expect(navigator.vibrate).toHaveBeenCalledWith([50, 30, 50]);
  });

  describe('Touch Interactions', () => {
    it('handles touch start correctly', () => {
      render(<XYQuestion question={mockQuestion} onAnswer={mockOnAnswer} />);
      const grid = screen.getByTestId('xy-grid');

      fireEvent.touchStart(grid, {
        touches: [{ identifier: 0, clientX: 150, clientY: 150 }]
      });

      const dot = screen.getByRole('slider');
      expect(dot).toHaveStyle({ left: '50%', top: '50%' });
    });

    it('prevents default touch behavior', () => {
      render(<XYQuestion question={mockQuestion} onAnswer={mockOnAnswer} />);
      const grid = screen.getByTestId('xy-grid');
      
      const touchStartEvent = new TouchEvent('touchstart', {
        bubbles: true,
        cancelable: true,
        touches: [{ identifier: 0, clientX: 150, clientY: 150 }] as unknown as Touch[]
      });

      const preventDefault = jest.spyOn(touchStartEvent, 'preventDefault');
      grid.dispatchEvent(touchStartEvent);

      expect(preventDefault).toHaveBeenCalled();
    });

    it('provides haptic feedback during interaction', () => {
      render(
        <XYQuestion 
          question={mockQuestion} 
          onAnswer={mockOnAnswer}
          hapticFeedback={true}
        />
      );
      const grid = screen.getByTestId('xy-grid');

      // Test touch move
      fireEvent.touchMove(grid, {
        touches: [{ identifier: 0, clientX: 200, clientY: 200 }]
      });

      expect(navigator.vibrate).toHaveBeenCalledWith(5);
    });

    it('disables haptic feedback when specified', () => {
      render(
        <XYQuestion 
          question={mockQuestion} 
          onAnswer={mockOnAnswer}
          hapticFeedback={false}
        />
      );
      const grid = screen.getByTestId('xy-grid');

      fireEvent.touchMove(grid, {
        touches: [{ identifier: 0, clientX: 200, clientY: 200 }]
      });

      expect(navigator.vibrate).not.toHaveBeenCalled();
    });
  });

  it('cleans up event listeners on unmount', () => {
    const { unmount } = render(
      <XYQuestion question={mockQuestion} onAnswer={mockOnAnswer} />
    );
    
    const removeEventListener = jest.spyOn(HTMLElement.prototype, 'removeEventListener');
    
    unmount();

    expect(removeEventListener).toHaveBeenCalledWith('touchstart', expect.any(Function));
    expect(removeEventListener).toHaveBeenCalledWith('touchmove', expect.any(Function));
    expect(removeEventListener).toHaveBeenCalledWith('touchend', expect.any(Function));
    expect(removeEventListener).toHaveBeenCalledWith('touchcancel', expect.any(Function));
  });
});

describe('Accessibility', () => {
  it('has proper ARIA labels and roles', () => {
    render(
      <XYQuestion
        question={mockQuestion}
        onAnswer={mockOnAnswer}
      />
    );

    const grid = screen.getByRole('application', { name: /grid/i });
    expect(grid).toHaveAttribute('aria-label', 'Interactive grid');
    expect(grid).toHaveAttribute('tabIndex', '0');
    expect(grid).toHaveAttribute('role', 'application');
    
    const dot = screen.getByRole('slider');
    expect(dot).toHaveAttribute('aria-valuemin', '0');
    expect(dot).toHaveAttribute('aria-valuemax', '100');
    expect(dot).toHaveAttribute('aria-valuenow');
  });

  it('provides keyboard controls with audio feedback', () => {
    render(
      <XYQuestion
        question={mockQuestion}
        onAnswer={mockOnAnswer}
      />
    );

    const grid = screen.getByRole('application');
    grid.focus();

    // Test arrow key navigation
    fireEvent.keyDown(grid, { key: 'ArrowRight' });
    expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '60');

    fireEvent.keyDown(grid, { key: 'ArrowLeft' });
    expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '50');

    fireEvent.keyDown(grid, { key: 'ArrowUp' });
    expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '40');
  });

  it('announces position changes', () => {
    render(
      <XYQuestion
        question={mockQuestion}
        onAnswer={mockOnAnswer}
      />
    );

    const grid = screen.getByRole('application');
    const liveRegion = screen.getByRole('status');

    fireEvent.keyDown(grid, { key: 'ArrowRight' });
    expect(liveRegion).toHaveTextContent(/position updated/i);
  });

  it('provides instructions on focus', () => {
    render(
      <XYQuestion
        question={mockQuestion}
        onAnswer={mockOnAnswer}
      />
    );

    const grid = screen.getByRole('application');
    grid.focus();

    expect(screen.getByRole('status')).toHaveTextContent(
      /use arrow keys to move/i
    );
  });
});

describe('Coordinate Normalization', () => {
  it('should normalize raw coordinates to 0-1 range', () => {
    render(
      <XYQuestion
        question={mockQuestion}
        onAnswer={mockOnAnswer}
      />
    );

    const grid = screen.getByTestId('xy-grid');
    const rect = { left: 50, top: 50, width: 200, height: 200 } as DOMRect;
    jest.spyOn(grid, 'getBoundingClientRect').mockImplementation(() => rect);

    // Click at 150,150 (center of 200x200 grid)
    fireEvent.mouseDown(grid, { clientX: 150, clientY: 150 });
    fireEvent.mouseUp(grid);
    
    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    expect(mockOnAnswer).toHaveBeenCalledWith(expect.objectContaining({
      value: { x: 0.5, y: 0.5 }  // Should be normalized to center
    }));
  });

  it('should clamp coordinates to valid range', () => {
    render(
      <XYQuestion
        question={mockQuestion}
        onAnswer={mockOnAnswer}
      />
    );

    const grid = screen.getByTestId('xy-grid');
    const rect = { left: 0, top: 0, width: 100, height: 100 } as DOMRect;
    jest.spyOn(grid, 'getBoundingClientRect').mockImplementation(() => rect);

    // Try to move outside grid bounds
    fireEvent.mouseDown(grid, { clientX: -50, clientY: 150 });
    fireEvent.mouseUp(grid);
    
    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    expect(mockOnAnswer).toHaveBeenCalledWith(expect.objectContaining({
      value: { x: 0, y: 1 }  // Should be clamped to valid range
    }));
  });
});

describe('Response Patterns', () => {
  it('should track response history', () => {
    const mockOnResponsePattern = jest.fn();
    
    render(
      <XYQuestion
        question={mockQuestion}
        onAnswer={mockOnAnswer}
        onResponsePattern={mockOnResponsePattern}
      />
    );

    const grid = screen.getByTestId('xy-grid');
    
    // Make multiple responses
    [
      { x: 100, y: 100 },
      { x: 150, y: 150 },
      { x: 200, y: 200 }
    ].forEach(pos => {
      fireEvent.mouseDown(grid, { clientX: pos.x, clientY: pos.y });
      fireEvent.mouseUp(grid);
      fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    });

    expect(mockOnResponsePattern).toHaveBeenCalledWith(expect.objectContaining({
      questionId: mockQuestion.id,
      pattern: expect.any(Array)
    }));
  });
});

describe('Statistics Tracking', () => {
  it('should calculate quadrant statistics', () => {
    const { result } = renderHook(() => useXYStatistics(mockQuestion.id));
    
    // Simulate responses in different quadrants
    act(() => {
      result.current.addResponse({ x: 0.2, y: 0.2 }); // Bottom-left
      result.current.addResponse({ x: 0.8, y: 0.2 }); // Bottom-right
      result.current.addResponse({ x: 0.2, y: 0.8 }); // Top-left
    });

    expect(result.current.getQuadrantDistribution()).toEqual({
      'top-left': 1,
      'top-right': 0,
      'bottom-left': 1,
      'bottom-right': 1
    });
  });

  it('should track movement patterns', () => {
    const { result } = renderHook(() => useXYStatistics(mockQuestion.id));
    
    // Simulate a sequence of movements
    act(() => {
      result.current.addMovement([
        { x: 0.2, y: 0.2 },
        { x: 0.8, y: 0.2 },
        { x: 0.8, y: 0.8 }
      ]);
    });

    expect(result.current.getMovementPattern()).toEqual({
      horizontal: 1,
      vertical: 1,
      diagonal: 1
    });
  });
}); 