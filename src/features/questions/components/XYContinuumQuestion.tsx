import React, { useState, useRef, useEffect } from 'react';
import type { XYContinuumQuestionType, QuestionResponse } from '../types';
import classNames from 'classnames';
import './XYContinuumQuestion.css';

interface Props {
  question: XYContinuumQuestionType;
  onAnswer: (response: QuestionResponse) => void;
  correctAnswer?: string;
  mode?: 'QUIZ' | 'STANDARD';
  disabled?: boolean;
  loading?: boolean;
}

interface Position {
  x: number;
  y: number;
}

export const XYContinuumQuestion: React.FC<Props> = ({
  question,
  onAnswer,
  correctAnswer,
  mode = 'STANDARD',
  disabled = false,
  loading = false
}) => {
  const [position, setPosition] = useState(question.defaultPosition ?? { x: 0.5, y: 0.5 });
  const [guessPosition, setGuessPosition] = useState<Position>({ x: 0.5, y: 0.5 });
  const [isDragging, setIsDragging] = useState(false);
  const [guessCount, setGuessCount] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [hasMovedSquare, setHasMovedSquare] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setShowFeedback(false);
    setIsCorrect(null);
    setGuessCount(0);
    setHasMovedSquare(false);
    setGuessPosition({ x: 0.5, y: 0.5 });
  }, [question.id]);

  if (loading) {
    return <div data-testid="question-loading">Loading...</div>;
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (disabled && guessCount >= 2) return;
    setIsDragging(true);
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !gridRef.current || (disabled && guessCount >= 2)) return;

    const rect = gridRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    if (mode === 'QUIZ') {
      setGuessPosition({
        x: Math.max(0.125, Math.min(0.875, x)),
        y: Math.max(0.125, Math.min(0.875, y))
      });
      setHasMovedSquare(true);
    } else {
      setPosition({
        x: Math.max(0, Math.min(1, x)),
        y: Math.max(0, Math.min(1, y))
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const checkGuess = () => {
    if (!correctAnswer) return false;
    const [correctX, correctY] = correctAnswer.split(',').map(Number);
    const squareSize = 0.125; // Half of the square size (25% / 2)
    
    // Calculate square bounds
    const bounds = {
      left: guessPosition.x - squareSize,
      right: guessPosition.x + squareSize,
      top: guessPosition.y - squareSize,
      bottom: guessPosition.y + squareSize
    };
    
    // Check if correct point is within square bounds
    return (
      correctX >= bounds.left &&
      correctX <= bounds.right &&
      correctY >= bounds.top &&
      correctY <= bounds.bottom
    );
  };

  const getQuadrant = (x: number, y: number) => {
    if (y < 0.5) {
      return x < 0.5 ? 'top-left' : 'top-right';
    }
    return x < 0.5 ? 'bottom-left' : 'bottom-right';
  };

  const handleSubmit = () => {
    if (mode === 'QUIZ') {
      if (!hasMovedSquare) return;

      const isGuessCorrect = checkGuess();
      setShowFeedback(true);
      setIsCorrect(isGuessCorrect);
      setGuessCount(prev => prev + 1);

      onAnswer({
        questionId: question.id,
        position: guessPosition,
        guessCount: guessCount + 1,
        timestamp: Date.now()
      });
    } else {
      onAnswer({
        questionId: question.id,
        position,
        timestamp: Date.now()
      });
    }
  };

  const renderQuizContent = () => {
    // Add debug logging to verify coordinate parsing
    console.log('Raw correctAnswer:', correctAnswer);
    const [correctX, correctY] = correctAnswer?.split(',').map(Number) || [0, 0];
    console.log('Parsed coordinates:', { correctX, correctY });
    
    return (
      <>
        {showFeedback && !isCorrect && guessCount === 1 && (
          <div 
            data-testid="hint-quadrant"
            className={classNames('hint-quadrant', 'pulse', getQuadrant(correctX, correctY))}
          />
        )}
        <div
          data-testid="guess-square"
          className={classNames('guess-square', {
            'dragging': isDragging,
            'correct': showFeedback && isCorrect,
            'incorrect': showFeedback && !isCorrect && guessCount >= 2
          })}
          style={{
            left: `${guessPosition.x * 100}%`,
            top: `${guessPosition.y * 100}%`
          }}
          onMouseDown={handleMouseDown}
        />
        {((showFeedback && isCorrect) || (showFeedback && !isCorrect && guessCount >= 2)) && (
          <div 
            data-testid="xy-dot"
            className="xy-dot correct"
            style={{
              left: `${correctX * 100}%`,
              top: `${correctY * 100}%`
            }}
            title={`(${correctX}, ${correctY})`}
          />
        )}
        {showFeedback && isCorrect && (
          <div data-testid="delight-reward" className="delight-reward" />
        )}
      </>
    );
  };

  const renderStandardContent = () => (
    <div
      data-testid="xy-dot"
      className={classNames('xy-dot', {
        'dragging': isDragging
      })}
      style={{
        left: `${position.x * 100}%`,
        top: `${position.y * 100}%`
      }}
      onMouseDown={handleMouseDown}
    />
  );

  return (
    <div ref={containerRef} className="xy-continuum-question">
      <div className="prompt">{question.prompt}</div>
      <div className="xy-container">
        <div className="y-axis-label top">{question.yAxis.top}</div>
        <div className="center-container">
          <div className="x-axis-label left">{question.xAxis.left}</div>
          <div
            ref={gridRef}
            className="xy-grid"
            data-testid="xy-grid"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {mode === 'QUIZ' ? renderQuizContent() : renderStandardContent()}
          </div>
          <div className="x-axis-label right">{question.xAxis.right}</div>
        </div>
        <div className="y-axis-label bottom">{question.yAxis.bottom}</div>
      </div>
      <button
        className="submit-button"
        onClick={handleSubmit}
        disabled={disabled && guessCount >= 2 || (mode === 'QUIZ' && !hasMovedSquare)}
      >
        Submit
      </button>
      {showFeedback && !isCorrect && guessCount === 1 && (
        <div className="feedback-message">Try again!</div>
      )}
    </div>
  );
}; 