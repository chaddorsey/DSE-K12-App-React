import { render, screen, fireEvent } from '@testing-library/react';
import { XYMultipleChoiceQuestion } from '../XYMultipleChoiceQuestion';
import type { MultipleChoiceQuestion } from '../../types';
import { QuestionCategory } from '../../types/question';

describe('XYMultipleChoiceQuestion', () => {
  const mockOnAnswer = jest.fn();

  const fourOptionQuestion: MultipleChoiceQuestion = {
    id: 'mc-1',
    type: 'MC',
    number: 1,
    text: 'Select your personality type',
    label: 'Personality Type',
    category: QuestionCategory.PERSONALITY,
    options: [
      'Analytical Introvert',
      'Social Introvert',
      'Analytical Extrovert',
      'Social Extrovert'
    ],
    requiredForOnboarding: false,
    includeInOnboarding: false
  };

  const threeOptionQuestion: MultipleChoiceQuestion = {
    ...fourOptionQuestion,
    id: 'mc-2',
    options: ['Option 1', 'Option 2', 'Option 3']
  };

  const fiveOptionQuestion: MultipleChoiceQuestion = {
    ...fourOptionQuestion,
    id: 'mc-5',
    options: ['Frontend', 'Backend', 'DevOps', 'Data Science', 'Security']
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Quadrant Presentation (4 options)', () => {
    it('renders four quadrants with correct labels', () => {
      render(
        <XYMultipleChoiceQuestion
          question={fourOptionQuestion}
          onAnswer={mockOnAnswer}
        />
      );

      fourOptionQuestion.options.forEach(option => {
        expect(screen.getByText(option)).toBeInTheDocument();
      });

      // Should have 4 quadrant buttons
      expect(screen.getAllByRole('radio')).toHaveLength(4);
    });

    it('handles quadrant selection', () => {
      render(
        <XYMultipleChoiceQuestion
          question={fourOptionQuestion}
          onAnswer={mockOnAnswer}
        />
      );

      const firstQuadrant = screen.getByRole('radio', { 
        name: fourOptionQuestion.options[0] 
      });
      
      fireEvent.click(firstQuadrant);
      
      expect(mockOnAnswer).toHaveBeenCalledWith({
        questionId: 'mc-1',
        value: 0,
        timestamp: expect.any(Number)
      });
    });

    it('applies distinct colors to adjacent quadrants', () => {
      render(
        <XYMultipleChoiceQuestion
          question={fourOptionQuestion}
          onAnswer={mockOnAnswer}
        />
      );

      const quadrants = screen.getAllByRole('radio');
      const colors = quadrants.map(q => 
        window.getComputedStyle(q).backgroundColor
      );

      // No adjacent colors should be the same
      expect(colors[0]).not.toBe(colors[1]); // Top left vs top right
      expect(colors[0]).not.toBe(colors[2]); // Top left vs bottom left
      expect(colors[1]).not.toBe(colors[3]); // Top right vs bottom right
      expect(colors[2]).not.toBe(colors[3]); // Bottom left vs bottom right
    });
  });

  describe('Polar Presentation (3 or >4 options)', () => {
    it('renders segments in a circle for 3 options', () => {
      render(
        <XYMultipleChoiceQuestion
          question={threeOptionQuestion}
          onAnswer={mockOnAnswer}
        />
      );

      // Should have 3 segment buttons
      expect(screen.getAllByRole('radio')).toHaveLength(3);
      
      // Each segment should span 120 degrees
      const segments = screen.getAllByRole('radio');
      segments.forEach(segment => {
        expect(segment).toHaveAttribute('d'); // SVG path
      });
    });

    it('handles segment selection', () => {
      render(
        <XYMultipleChoiceQuestion
          question={threeOptionQuestion}
          onAnswer={mockOnAnswer}
        />
      );

      const firstSegment = screen.getByRole('radio', { 
        name: threeOptionQuestion.options[0] 
      });
      
      fireEvent.click(firstSegment);
      
      expect(mockOnAnswer).toHaveBeenCalledWith({
        questionId: 'mc-2',
        value: 0,
        timestamp: expect.any(Number)
      });
    });

    it('shows question text in center of circle', () => {
      render(
        <XYMultipleChoiceQuestion
          question={threeOptionQuestion}
          onAnswer={mockOnAnswer}
        />
      );

      const questionText = screen.getByText(threeOptionQuestion.text);
      expect(questionText).toHaveClass('center-text');
    });
  });

  describe('Accessibility', () => {
    it('supports keyboard navigation in quadrant mode', () => {
      render(
        <XYMultipleChoiceQuestion
          question={fourOptionQuestion}
          onAnswer={mockOnAnswer}
        />
      );

      const quadrants = screen.getAllByRole('radio');
      quadrants[0].focus();

      // Arrow key navigation
      fireEvent.keyDown(quadrants[0], { key: 'ArrowRight' });
      expect(quadrants[1]).toHaveFocus();

      fireEvent.keyDown(quadrants[1], { key: 'ArrowDown' });
      expect(quadrants[3]).toHaveFocus();
    });

    it('provides ARIA labels for segments', () => {
      render(
        <XYMultipleChoiceQuestion
          question={threeOptionQuestion}
          onAnswer={mockOnAnswer}
        />
      );

      const segments = screen.getAllByRole('radio');
      segments.forEach((segment, index) => {
        expect(segment).toHaveAttribute(
          'aria-label', 
          threeOptionQuestion.options[index]
        );
      });
    });
  });

  describe('Touch Interactions', () => {
    it('handles touch selection in quadrant mode', () => {
      render(
        <XYMultipleChoiceQuestion
          question={fourOptionQuestion}
          onAnswer={mockOnAnswer}
        />
      );

      const quadrants = screen.getAllByRole('radio');
      
      // Simulate touch on first quadrant
      fireEvent.touchStart(quadrants[0], {
        touches: [{ clientX: 100, clientY: 100 }]
      });
      fireEvent.touchEnd(quadrants[0]);

      expect(mockOnAnswer).toHaveBeenCalledWith({
        questionId: 'mc-1',
        value: 0,
        timestamp: expect.any(Number)
      });
    });

    it('handles touch selection in polar mode', () => {
      render(
        <XYMultipleChoiceQuestion
          question={threeOptionQuestion}
          onAnswer={mockOnAnswer}
        />
      );

      const container = screen.getByRole('radiogroup');
      const segments = screen.getAllByRole('radio');

      // Mock getBoundingClientRect for the container
      const rect = { 
        left: 0, top: 0, width: 200, height: 200,
        right: 200, bottom: 200,
        x: 0, y: 0
      };
      jest.spyOn(container, 'getBoundingClientRect').mockReturnValue(rect);

      // Touch in the first segment area (top)
      fireEvent.touchStart(segments[0], {
        touches: [{ clientX: 100, clientY: 50 }]
      });
      fireEvent.touchEnd(segments[0]);

      expect(mockOnAnswer).toHaveBeenCalledWith({
        questionId: 'mc-2',
        value: 0,
        timestamp: expect.any(Number)
      });
    });

    it('provides touch feedback', () => {
      render(
        <XYMultipleChoiceQuestion
          question={threeOptionQuestion}
          onAnswer={mockOnAnswer}
        />
      );

      const segment = screen.getAllByRole('radio')[0];
      
      fireEvent.touchStart(segment);
      expect(segment).toHaveClass('touching');
      
      fireEvent.touchEnd(segment);
      expect(segment).not.toHaveClass('touching');
    });

    it('prevents scrolling during touch interaction', () => {
      const preventDefault = jest.fn();
      
      render(
        <XYMultipleChoiceQuestion
          question={threeOptionQuestion}
          onAnswer={mockOnAnswer}
        />
      );

      const segment = screen.getAllByRole('radio')[0];
      
      fireEvent.touchStart(segment, {
        touches: [{ clientX: 100, clientY: 100 }],
        preventDefault
      });

      expect(preventDefault).toHaveBeenCalled();
    });

    it('handles touch events with non-passive listeners', () => {
      render(
        <XYMultipleChoiceQuestion
          question={fourOptionQuestion}
          onAnswer={mockOnAnswer}
          config={quadrantConfig}
        />
      );

      const container = screen.getByRole('radiogroup');
      const addEventListener = jest.spyOn(container, 'addEventListener');

      // Verify non-passive event listeners
      expect(addEventListener).toHaveBeenCalledWith(
        'touchstart',
        expect.any(Function),
        { passive: false }
      );
    });

    it('prevents default touch behavior in segmented mode', () => {
      render(
        <XYMultipleChoiceQuestion
          question={fiveOptionQuestion}
          onAnswer={mockOnAnswer}
          config={segmentedConfig}
        />
      );

      const container = screen.getByRole('radiogroup');
      const touchStartEvent = new TouchEvent('touchstart', {
        bubbles: true,
        cancelable: true,
        touches: [{ identifier: 0, clientX: 150, clientY: 150 }] as unknown as Touch[]
      });

      const preventDefault = jest.spyOn(touchStartEvent, 'preventDefault');
      container.dispatchEvent(touchStartEvent);

      expect(preventDefault).toHaveBeenCalled();
    });

    it('cleans up touch event listeners on unmount', () => {
      const { unmount } = render(
        <XYMultipleChoiceQuestion
          question={fourOptionQuestion}
          onAnswer={mockOnAnswer}
          config={quadrantConfig}
        />
      );

      const removeEventListener = jest.spyOn(HTMLElement.prototype, 'removeEventListener');
      
      unmount();

      expect(removeEventListener).toHaveBeenCalledWith('touchstart', expect.any(Function));
      expect(removeEventListener).toHaveBeenCalledWith('touchmove', expect.any(Function));
      expect(removeEventListener).toHaveBeenCalledWith('touchend', expect.any(Function));
      expect(removeEventListener).toHaveBeenCalledWith('touchcancel', expect.any(Function));
    });
  });

  describe('Segmented Polar Mode', () => {
    const segmentedConfig = {
      type: 'segmented-continuous',
      segments: [
        { id: 'a', label: 'Option A', color: '#ff0000' },
        { id: 'b', label: 'Option B', color: '#00ff00' },
        { id: 'c', label: 'Option C', color: '#0000ff' }
      ],
      intensity: {
        label: 'Intensity',
        min: 0,
        max: 1,
        defaultValue: 0.5
      }
    };

    it('renders segments with correct labels and colors', () => {
      render(
        <XYMultipleChoiceQuestion
          question={threeOptionQuestion}
          onAnswer={mockOnAnswer}
          config={segmentedConfig}
        />
      );

      segmentedConfig.segments.forEach(segment => {
        const segmentElement = screen.getByRole('radio', { name: segment.label });
        expect(segmentElement).toBeInTheDocument();
        expect(segmentElement).toHaveStyle({ fill: segment.color });
      });
    });

    it('handles click selection with intensity', () => {
      render(
        <XYMultipleChoiceQuestion
          question={threeOptionQuestion}
          onAnswer={mockOnAnswer}
          config={segmentedConfig}
        />
      );

      const container = screen.getByRole('radiogroup');
      const firstSegment = screen.getByRole('radio', { name: 'Option A' });

      // Mock getBoundingClientRect
      const rect = {
        left: 0,
        top: 0,
        width: 200,
        height: 200,
        right: 200,
        bottom: 200,
        x: 0,
        y: 0
      };
      jest.spyOn(container, 'getBoundingClientRect').mockReturnValue(rect);

      // Click near edge of segment (high intensity)
      fireEvent.click(firstSegment, {
        clientX: 100,
        clientY: 20 // Near edge = high intensity
      });

      expect(mockOnAnswer).toHaveBeenCalledWith({
        questionId: threeOptionQuestion.id,
        value: {
          segmentId: 'a',
          intensity: expect.closeTo(0.8, 2)
        },
        timestamp: expect.any(Number)
      });
    });

    describe('Touch Interactions', () => {
      it('handles touch drag for intensity adjustment', () => {
        render(
          <XYMultipleChoiceQuestion
            question={threeOptionQuestion}
            onAnswer={mockOnAnswer}
            config={segmentedConfig}
          />
        );

        const container = screen.getByRole('radiogroup');
        const firstSegment = screen.getByRole('radio', { name: 'Option A' });

        // Mock getBoundingClientRect
        const rect = {
          left: 0,
          top: 0,
          width: 200,
          height: 200,
          right: 200,
          bottom: 200,
          x: 0,
          y: 0
        };
        jest.spyOn(container, 'getBoundingClientRect').mockReturnValue(rect);

        // Start touch in segment
        fireEvent.touchStart(firstSegment, {
          touches: [{ clientX: 100, clientY: 50 }]
        });

        // Drag outward
        fireEvent.touchMove(firstSegment, {
          touches: [{ clientX: 100, clientY: 20 }]
        });

        // End touch
        fireEvent.touchEnd(firstSegment);

        expect(mockOnAnswer).toHaveBeenLastCalledWith({
          questionId: threeOptionQuestion.id,
          value: {
            segmentId: 'a',
            intensity: expect.closeTo(0.8, 2)
          },
          timestamp: expect.any(Number)
        });
      });

      it('updates visual feedback during drag', () => {
        render(
          <XYMultipleChoiceQuestion
            question={threeOptionQuestion}
            onAnswer={mockOnAnswer}
            config={segmentedConfig}
          />
        );

        const container = screen.getByRole('radiogroup');
        
        // Start drag
        fireEvent.touchStart(container, {
          touches: [{ clientX: 100, clientY: 50 }]
        });

        expect(container).toHaveClass('dragging');
        
        // End drag
        fireEvent.touchEnd(container);
        
        expect(container).not.toHaveClass('dragging');
      });
    });

    describe('Animations', () => {
      it('animates selection marker on segment change', () => {
        const { rerender } = render(
          <XYMultipleChoiceQuestion
            question={threeOptionQuestion}
            onAnswer={mockOnAnswer}
            config={segmentedConfig}
          />
        );

        const marker = screen.queryByTestId('selection-marker');
        expect(marker).toHaveStyle({ opacity: 0 });

        // Trigger selection
        const firstSegment = screen.getByRole('radio', { name: 'Option A' });
        fireEvent.click(firstSegment);

        rerender(
          <XYMultipleChoiceQuestion
            question={threeOptionQuestion}
            onAnswer={mockOnAnswer}
            config={segmentedConfig}
          />
        );

        expect(marker).toHaveStyle({ opacity: 1 });
      });
    });
  });

  describe('Keyboard Interaction', () => {
    it('supports intensity adjustment with arrow keys', () => {
      render(
        <XYMultipleChoiceQuestion
          question={threeOptionQuestion}
          onAnswer={mockOnAnswer}
          config={segmentedConfig}
        />
      );

      const segment = screen.getByRole('radio', { name: 'Option A' });
      
      // Select segment
      fireEvent.keyDown(segment, { key: 'Enter' });
      expect(mockOnAnswer).toHaveBeenLastCalledWith(
        expect.objectContaining({
          value: { segmentId: 'a', intensity: 0.5 }
        })
      );

      // Increase intensity
      fireEvent.keyDown(segment, { key: 'ArrowUp' });
      expect(mockOnAnswer).toHaveBeenLastCalledWith(
        expect.objectContaining({
          value: { segmentId: 'a', intensity: 0.6 }
        })
      );

      // Decrease intensity
      fireEvent.keyDown(segment, { key: 'ArrowDown' });
      expect(mockOnAnswer).toHaveBeenLastCalledWith(
        expect.objectContaining({
          value: { segmentId: 'a', intensity: 0.5 }
        })
      );

      // Set to maximum
      fireEvent.keyDown(segment, { key: 'End' });
      expect(mockOnAnswer).toHaveBeenLastCalledWith(
        expect.objectContaining({
          value: { segmentId: 'a', intensity: 1 }
        })
      );

      // Set to minimum
      fireEvent.keyDown(segment, { key: 'Home' });
      expect(mockOnAnswer).toHaveBeenLastCalledWith(
        expect.objectContaining({
          value: { segmentId: 'a', intensity: 0 }
        })
      );
    });

    it('provides appropriate ARIA feedback', () => {
      render(
        <XYMultipleChoiceQuestion
          question={threeOptionQuestion}
          onAnswer={mockOnAnswer}
          config={segmentedConfig}
        />
      );

      const segment = screen.getByRole('radio', { name: 'Option A' });
      
      fireEvent.keyDown(segment, { key: 'Enter' });
      fireEvent.keyDown(segment, { key: 'ArrowUp' });

      const alert = screen.getByRole('alert');
      expect(alert).toHaveTextContent(/Option A selected with .* intensity \(60%\)/);
    });
  });

  describe('Keyboard Navigation', () => {
    it('supports navigation between segments', () => {
      render(
        <XYMultipleChoiceQuestion
          question={threeOptionQuestion}
          onAnswer={mockOnAnswer}
          config={segmentedConfig}
        />
      );

      const firstSegment = screen.getByRole('radio', { name: 'Option A' });
      firstSegment.focus();
      
      // Navigate right
      fireEvent.keyDown(firstSegment, { key: 'ArrowRight' });
      expect(screen.getByRole('radio', { name: 'Option B' })).toHaveFocus();

      // Navigate left back to first segment
      const secondSegment = screen.getByRole('radio', { name: 'Option B' });
      fireEvent.keyDown(secondSegment, { key: 'ArrowLeft' });
      expect(firstSegment).toHaveFocus();

      // Skip segment with PageDown
      fireEvent.keyDown(firstSegment, { key: 'PageDown' });
      expect(screen.getByRole('radio', { name: 'Option C' })).toHaveFocus();
    });

    it('supports direct segment selection with number keys', () => {
      render(
        <XYMultipleChoiceQuestion
          question={threeOptionQuestion}
          onAnswer={mockOnAnswer}
          config={segmentedConfig}
        />
      );

      const firstSegment = screen.getByRole('radio', { name: 'Option A' });
      firstSegment.focus();
      
      // Select third segment with number key
      fireEvent.keyDown(firstSegment, { key: '3' });
      expect(screen.getByRole('radio', { name: 'Option C' })).toHaveFocus();
      expect(mockOnAnswer).toHaveBeenLastCalledWith(
        expect.objectContaining({
          value: { segmentId: 'c', intensity: expect.any(Number) }
        })
      );
    });

    it('wraps around when navigating past edges', () => {
      render(
        <XYMultipleChoiceQuestion
          question={threeOptionQuestion}
          onAnswer={mockOnAnswer}
          config={segmentedConfig}
        />
      );

      const firstSegment = screen.getByRole('radio', { name: 'Option A' });
      firstSegment.focus();
      
      // Navigate left from first segment should wrap to last
      fireEvent.keyDown(firstSegment, { key: 'ArrowLeft' });
      expect(screen.getByRole('radio', { name: 'Option C' })).toHaveFocus();

      // Navigate right from last segment should wrap to first
      const lastSegment = screen.getByRole('radio', { name: 'Option C' });
      fireEvent.keyDown(lastSegment, { key: 'ArrowRight' });
      expect(firstSegment).toHaveFocus();
    });
  });

  describe('Two-step Selection', () => {
    it('shows confirmation button after initial selection', () => {
      render(
        <XYMultipleChoiceQuestion
          question={fiveOptionQuestion}
          onAnswer={mockOnAnswer}
          config={{
            ...segmentedConfig,
            requireConfirmation: true
          }}
        />
      );

      const firstSegment = screen.getByRole('radio', { name: 'Frontend' });
      fireEvent.click(firstSegment);

      const confirmButton = screen.getByRole('button', { name: /confirm selection/i });
      expect(confirmButton).toBeInTheDocument();
      expect(mockOnAnswer).not.toHaveBeenCalled();

      fireEvent.click(confirmButton);
      expect(mockOnAnswer).toHaveBeenCalled();
    });

    it('shows pending state visually', () => {
      render(
        <XYMultipleChoiceQuestion
          question={fiveOptionQuestion}
          onAnswer={mockOnAnswer}
          config={{
            ...segmentedConfig,
            requireConfirmation: true
          }}
        />
      );

      const firstSegment = screen.getByRole('radio', { name: 'Frontend' });
      fireEvent.click(firstSegment);

      const marker = screen.getByTestId('selection-marker');
      expect(marker).toHaveClass('pending');
    });
  });

  describe('Draggable Dot', () => {
    it('starts in center position', () => {
      render(
        <XYMultipleChoiceQuestion
          question={fiveOptionQuestion}
          onAnswer={mockOnAnswer}
          config={{
            ...segmentedConfig,
            requireConfirmation: true
          }}
        />
      );

      const dot = screen.getByRole('button', { name: /drag to select/i });
      expect(dot).toHaveAttribute('cx', '100');
      expect(dot).toHaveAttribute('cy', '100');
    });

    it('updates position on drag', () => {
      render(
        <XYMultipleChoiceQuestion
          question={fiveOptionQuestion}
          onAnswer={mockOnAnswer}
          config={segmentedConfig}
        />
      );

      const dot = screen.getByRole('button', { name: /drag to select/i });
      
      fireEvent.mouseDown(dot);
      fireEvent.mouseMove(document, {
        clientX: 150,
        clientY: 150
      });

      expect(dot).not.toHaveAttribute('cx', '100');
      expect(dot).not.toHaveAttribute('cy', '100');
    });
  });
}); 