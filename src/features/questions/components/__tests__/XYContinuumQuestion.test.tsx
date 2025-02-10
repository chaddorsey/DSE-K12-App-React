import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { XYContinuumQuestion } from '../XYContinuumQuestion';
import type { XYContinuumQuestionType } from '../../types';

describe('XYContinuumQuestion', () => {
  const mockQuestion: XYContinuumQuestionType = {
    id: 'xy1',
    type: 'XY_CONTINUUM',
    prompt: 'Plot your work style preferences:',
    xAxis: {
      left: 'Process-Oriented',
      right: 'Results-Oriented'
    },
    yAxis: {
      top: 'Independent',
      bottom: 'Collaborative'
    },
    defaultPosition: { x: 0.5, y: 0.5 }
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

  describe('Non-quiz mode', () => {
    it('renders the question prompt and axis labels', () => {
      render(<XYContinuumQuestion {...defaultProps} />);
      
      expect(screen.getByText(mockQuestion.prompt)).toBeInTheDocument();
      expect(screen.getByText(mockQuestion.xAxis.left)).toBeInTheDocument();
      expect(screen.getByText(mockQuestion.xAxis.right)).toBeInTheDocument();
      expect(screen.getByText(mockQuestion.yAxis.top)).toBeInTheDocument();
      expect(screen.getByText(mockQuestion.yAxis.bottom)).toBeInTheDocument();
    });

    it('renders a draggable dot at the default position', () => {
      render(<XYContinuumQuestion {...defaultProps} />);
      
      const dot = screen.getByTestId('xy-dot');
      expect(dot).toBeInTheDocument();
      expect(dot.style.left).toBe('50%');
      expect(dot.style.top).toBe('50%');
    });

    it('updates dot position on drag', () => {
      render(<XYContinuumQuestion {...defaultProps} />);
      const dot = screen.getByTestId('xy-dot');
      const grid = screen.getByTestId('xy-grid');
      
      fireEvent.mouseDown(dot);
      fireEvent.mouseMove(grid, {
        clientX: grid.getBoundingClientRect().width * 0.75,
        clientY: grid.getBoundingClientRect().height * 0.25
      });
      fireEvent.mouseUp(dot);
      
      expect(dot.style.left).toBe('75%');
      expect(dot.style.top).toBe('25%');
    });

    it('calls onAnswer with position values when submitted', () => {
      render(<XYContinuumQuestion {...defaultProps} />);
      const dot = screen.getByTestId('xy-dot');
      const grid = screen.getByTestId('xy-grid');
      
      fireEvent.mouseDown(dot);
      fireEvent.mouseMove(grid, {
        clientX: grid.getBoundingClientRect().width * 0.75,
        clientY: grid.getBoundingClientRect().height * 0.25
      });
      fireEvent.mouseUp(dot);
      
      fireEvent.click(screen.getByRole('button', { name: /submit/i }));
      
      expect(defaultProps.onAnswer).toHaveBeenCalledWith({
        questionId: mockQuestion.id,
        position: { x: 0.75, y: 0.25 },
        timestamp: expect.any(Number)
      });
    });
  });

  describe('Quiz mode', () => {
    const quizProps = {
      ...defaultProps,
      mode: 'QUIZ' as const,
      correctAnswer: '0.25,0.25'
    };

    it('shows draggable square with no initial dot', () => {
      render(<XYContinuumQuestion {...quizProps} />);
      
      const square = screen.getByTestId('guess-square');
      expect(square).toBeInTheDocument();
      expect(square).toHaveStyle({
        width: '25%',
        height: '25%',
        border: '2px dashed #007bff'
      });
      expect(screen.queryByTestId('xy-dot')).not.toBeInTheDocument();
    });

    it('checks if guess square contains correct answer', () => {
      render(<XYContinuumQuestion {...quizProps} />);
      const square = screen.getByTestId('guess-square');
      const grid = screen.getByTestId('xy-grid');
      
      // Move square to contain correct answer
      fireEvent.mouseDown(square);
      fireEvent.mouseMove(grid, {
        clientX: grid.getBoundingClientRect().width * 0.75,
        clientY: grid.getBoundingClientRect().height * 0.25
      });
      fireEvent.mouseUp(square);
      
      fireEvent.click(screen.getByRole('button', { name: /submit/i }));
      
      expect(screen.getByTestId('xy-dot')).toHaveClass('correct');
      expect(square).toHaveStyle({ border: '2px solid #28a745' });
      expect(screen.getByTestId('delight-reward')).toBeInTheDocument();
    });

    it('shows quadrant hint on first incorrect guess', () => {
      render(<XYContinuumQuestion {...quizProps} />);
      const square = screen.getByTestId('guess-square');
      const grid = screen.getByTestId('xy-grid');
      
      // Move square to wrong position
      fireEvent.mouseDown(square);
      fireEvent.mouseMove(grid, {
        clientX: grid.getBoundingClientRect().width * 0.25,
        clientY: grid.getBoundingClientRect().height * 0.75
      });
      fireEvent.mouseUp(square);
      
      fireEvent.click(screen.getByRole('button', { name: /submit/i }));
      
      const hintQuadrant = screen.getByTestId('hint-quadrant');
      expect(hintQuadrant).toHaveClass('pulse');
      expect(hintQuadrant).toHaveStyle({
        left: '50%',
        top: '0%',
        width: '50%',
        height: '50%'
      });
      expect(screen.queryByTestId('xy-dot')).not.toBeInTheDocument();
      expect(screen.getByText(/try again/i)).toBeInTheDocument();
    });

    it('shows final feedback after second incorrect guess', () => {
      render(<XYContinuumQuestion {...quizProps} />);
      const square = screen.getByTestId('guess-square');
      const grid = screen.getByTestId('xy-grid');
      
      // First wrong guess
      fireEvent.mouseDown(square);
      fireEvent.mouseMove(grid, { clientX: 100, clientY: 300 });
      fireEvent.mouseUp(square);
      fireEvent.click(screen.getByRole('button', { name: /submit/i }));
      
      // Second wrong guess
      fireEvent.mouseDown(square);
      fireEvent.mouseMove(grid, { clientX: 200, clientY: 200 });
      fireEvent.mouseUp(square);
      fireEvent.click(screen.getByRole('button', { name: /submit/i }));
      
      expect(screen.getByTestId('xy-dot')).toHaveClass('correct');
      expect(square).toHaveStyle({ border: '2px solid #dc3545' });
    });

    it('calculates quadrant correctly', () => {
      render(<XYContinuumQuestion {...quizProps} />);
      
      // Test each quadrant
      const testCases = [
        { pos: [0.25, 0.25], quadrant: 'top-left' },
        { pos: [0.75, 0.25], quadrant: 'top-right' },
        { pos: [0.25, 0.75], quadrant: 'bottom-left' },
        { pos: [0.75, 0.75], quadrant: 'bottom-right' }
      ];

      testCases.forEach(({ pos, quadrant }) => {
        const square = screen.getByTestId('guess-square');
        const grid = screen.getByTestId('xy-grid');
        
        fireEvent.mouseDown(square);
        fireEvent.mouseMove(grid, {
          clientX: grid.getBoundingClientRect().width * pos[0],
          clientY: grid.getBoundingClientRect().height * pos[1]
        });
        fireEvent.mouseUp(square);
        
        fireEvent.click(screen.getByRole('button', { name: /submit/i }));
        
        const hintQuadrant = screen.getByTestId('hint-quadrant');
        expect(hintQuadrant).toHaveClass(quadrant);
      });
    });

    it('prevents submission if square has not been moved', () => {
      render(<XYContinuumQuestion {...quizProps} />);
      
      const submitButton = screen.getByRole('button', { name: /submit/i });
      expect(submitButton).toBeDisabled();
      
      // Move square
      const square = screen.getByTestId('guess-square');
      const grid = screen.getByTestId('xy-grid');
      fireEvent.mouseDown(square);
      fireEvent.mouseMove(grid, {
        clientX: grid.getBoundingClientRect().width * 0.25,
        clientY: grid.getBoundingClientRect().height * 0.25
      });
      fireEvent.mouseUp(square);
      
      expect(submitButton).not.toBeDisabled();
    });

    it('allows dragging after first incorrect guess', () => {
      render(<XYContinuumQuestion {...quizProps} />);
      
      // First wrong guess
      const square = screen.getByTestId('guess-square');
      const grid = screen.getByTestId('xy-grid');
      
      fireEvent.mouseDown(square);
      fireEvent.mouseMove(grid, {
        clientX: grid.getBoundingClientRect().width * 0.75,
        clientY: grid.getBoundingClientRect().height * 0.75
      });
      fireEvent.mouseUp(square);
      fireEvent.click(screen.getByRole('button', { name: /submit/i }));
      
      // Try to drag again
      fireEvent.mouseDown(square);
      fireEvent.mouseMove(grid, {
        clientX: grid.getBoundingClientRect().width * 0.25,
        clientY: grid.getBoundingClientRect().height * 0.25
      });
      fireEvent.mouseUp(square);
      
      expect(square).toHaveStyle({
        left: '25%',
        top: '25%'
      });
    });

    it('shows delight reward on correct first guess', () => {
      const onAnswer = jest.fn();
      render(
        <XYContinuumQuestion 
          {...quizProps}
          onAnswer={onAnswer}
        />
      );
      
      // Make correct guess
      const square = screen.getByTestId('guess-square');
      const grid = screen.getByTestId('xy-grid');
      
      fireEvent.mouseDown(square);
      fireEvent.mouseMove(grid, {
        clientX: grid.getBoundingClientRect().width * 0.25,
        clientY: grid.getBoundingClientRect().height * 0.25
      });
      fireEvent.mouseUp(square);
      fireEvent.click(screen.getByRole('button', { name: /submit/i }));
      
      expect(screen.getByTestId('delight-reward')).toBeInTheDocument();
      expect(onAnswer).toHaveBeenCalledWith(expect.objectContaining({
        questionId: mockQuestion.id,
        position: { x: 0.25, y: 0.25 },
        guessCount: 1
      }));
    });

    it('shows delight reward on correct second guess', () => {
      const onAnswer = jest.fn();
      render(
        <XYContinuumQuestion 
          {...quizProps}
          onAnswer={onAnswer}
        />
      );
      
      const square = screen.getByTestId('guess-square');
      const grid = screen.getByTestId('xy-grid');
      
      // First wrong guess
      fireEvent.mouseDown(square);
      fireEvent.mouseMove(grid, { clientX: 300, clientY: 300 });
      fireEvent.mouseUp(square);
      fireEvent.click(screen.getByRole('button', { name: /submit/i }));
      
      // Second correct guess
      fireEvent.mouseDown(square);
      fireEvent.mouseMove(grid, {
        clientX: grid.getBoundingClientRect().width * 0.25,
        clientY: grid.getBoundingClientRect().height * 0.25
      });
      fireEvent.mouseUp(square);
      fireEvent.click(screen.getByRole('button', { name: /submit/i }));
      
      expect(screen.getByTestId('delight-reward')).toBeInTheDocument();
      expect(onAnswer).toHaveBeenLastCalledWith(expect.objectContaining({
        questionId: mockQuestion.id,
        position: { x: 0.25, y: 0.25 },
        guessCount: 2
      }));
    });

    it('prevents dragging after second guess', () => {
      render(<XYContinuumQuestion {...quizProps} />);
      
      const square = screen.getByTestId('guess-square');
      const grid = screen.getByTestId('xy-grid');
      
      // Two guesses
      for (let i = 0; i < 2; i++) {
        fireEvent.mouseDown(square);
        fireEvent.mouseMove(grid, {
          clientX: grid.getBoundingClientRect().width * (i === 0 ? 0.75 : 0.5),
          clientY: grid.getBoundingClientRect().height * (i === 0 ? 0.75 : 0.5)
        });
        fireEvent.mouseUp(square);
        fireEvent.click(screen.getByRole('button', { name: /submit/i }));
      }
      
      // Try to drag again
      const initialPosition = square.style.transform;
      fireEvent.mouseDown(square);
      fireEvent.mouseMove(grid, {
        clientX: grid.getBoundingClientRect().width * 0.25,
        clientY: grid.getBoundingClientRect().height * 0.25
      });
      fireEvent.mouseUp(square);
      
      expect(square.style.transform).toBe(initialPosition);
    });

    it('renders guess square in center initially', () => {
      render(<XYContinuumQuestion {...quizProps} />);
      
      const square = screen.getByTestId('guess-square');
      expect(square).toHaveStyle({
        left: '50%',
        top: '50%'
      });
    });
  });

  it('handles loading state', () => {
    render(<XYContinuumQuestion {...defaultProps} loading={true} />);
    expect(screen.getByTestId('question-loading')).toBeInTheDocument();
  });
}); 