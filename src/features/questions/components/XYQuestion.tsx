import React, { useState, useRef, useEffect } from 'react';
import type { XYQuestion as XYQuestionType } from '../types/xy';
import type { QuestionResponse } from '../types/question';
import classNames from 'classnames';
import './XYQuestion.css';
import { 
  normalizeCoordinates, 
  validateCoordinates 
} from '../utils/coordinates';

interface Props {
  question: XYQuestionType;
  onAnswer: (response: QuestionResponse) => void;
  disabled?: boolean;
  loading?: boolean;
  hapticFeedback?: boolean;
}

interface Position {
  x: number;
  y: number;
}

// Add utility function at the top
const vibrate = (pattern: number | number[], enabled: boolean = true) => {
  if (enabled && navigator.vibrate) {
    navigator.vibrate(pattern);
  }
};

export const XYQuestion: React.FC<Props> = ({
  question,
  onAnswer,
  disabled = false,
  loading = false,
  hapticFeedback = true
}) => {
  const [position, setPosition] = useState<Position>({ x: 0.5, y: 0.5 });
  const [isDragging, setIsDragging] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const [touchId, setTouchId] = useState<number | null>(null);
  const [announcement, setAnnouncement] = useState('');

  if (loading) {
    return <div data-testid="question-loading">Loading...</div>;
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (disabled) return;
    setIsDragging(true);
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !gridRef.current) return;

    const rect = gridRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));

    setPosition({ x, y });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleSubmit = () => {
    if (!validateCoordinates(position)) {
      console.error('Invalid position coordinates');
      return;
    }

    onAnswer({
      questionId: question.id,
      value: position,
      timestamp: Date.now()
    });
    vibrate([50, 30, 50], hapticFeedback);
  };

  // Utility function to calculate position
  const calculatePosition = (clientX: number, clientY: number) => {
    if (!gridRef.current) return null;
    return normalizeCoordinates(
      clientX,
      clientY,
      gridRef.current.getBoundingClientRect()
    );
  };

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (disabled || touchId !== null) return;
    
    const touch = e.touches[0];
    setTouchId(touch.identifier);
    setIsDragging(true);
    
    const newPosition = calculatePosition(touch.clientX, touch.clientY);
    if (newPosition) {
      setPosition(newPosition);
      vibrate(10, hapticFeedback); // Short pulse for initial touch
    }
    
    e.preventDefault();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || touchId === null) return;
    
    const touch = Array.from(e.touches).find(t => t.identifier === touchId);
    if (!touch) return;
    
    const newPosition = calculatePosition(touch.clientX, touch.clientY);
    if (newPosition) {
      setPosition(newPosition);
      // Very subtle feedback when moving
      vibrate(5, hapticFeedback);
    }
    
    e.preventDefault();
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchId === null) return;
    
    const changedTouch = Array.from(e.changedTouches).find(
      t => t.identifier === touchId
    );
    
    if (changedTouch) {
      setTouchId(null);
      setIsDragging(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    
    const step = 0.1;
    let newPosition = { ...position };
    
    switch (e.key) {
      case 'ArrowLeft':
        newPosition.x = Math.max(0, position.x - step);
        break;
      case 'ArrowRight':
        newPosition.x = Math.min(1, position.x + step);
        break;
      case 'ArrowUp':
        newPosition.y = Math.max(0, position.y - step);
        break;
      case 'ArrowDown':
        newPosition.y = Math.min(1, position.y + step);
        break;
      default:
        return;
    }
    
    setPosition(newPosition);
    announcePosition(newPosition);
    vibrate(5, hapticFeedback);
    e.preventDefault();
  };

  const announcePosition = (pos: Position) => {
    const xPercent = Math.round(pos.x * 100);
    const yPercent = Math.round(pos.y * 100);
    setAnnouncement(
      `Position updated: ${xPercent}% from left, ${yPercent}% from top`
    );
  };

  const handleGridFocus = () => {
    setAnnouncement(
      'Use arrow keys to move the position. Press Enter or Space to submit.'
    );
  };

  // Add useEffect to set up touch event options
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    // Add event listeners with non-passive option
    const options = { passive: false };
    
    grid.addEventListener('touchstart', handleTouchStart, options);
    grid.addEventListener('touchmove', handleTouchMove, options);
    grid.addEventListener('touchend', handleTouchEnd);
    grid.addEventListener('touchcancel', handleTouchEnd);

    return () => {
      grid.removeEventListener('touchstart', handleTouchStart);
      grid.removeEventListener('touchmove', handleTouchMove);
      grid.removeEventListener('touchend', handleTouchEnd);
      grid.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, []);

  return (
    <div className="xy-question">
      <div className="prompt">{question.text}</div>
      <div className="xy-container">
        <div className="y-axis-label top">{question.config.yAxis.labels.max}</div>
        <div className="center-container">
          <div className="x-axis-label left">{question.config.xAxis.labels.min}</div>
          <div
            ref={gridRef}
            className="xy-grid"
            role="application"
            aria-label="Interactive grid"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onFocus={handleGridFocus}
            data-testid="xy-grid"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchEnd}
          >
            <div
              role="slider"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(position.x * 100)}
              aria-valuetext={`${Math.round(position.x * 100)}% from left, ${Math.round(position.y * 100)}% from top`}
              className={classNames('xy-dot', { 'dragging': isDragging })}
              style={{
                left: `${position.x * 100}%`,
                top: `${position.y * 100}%`
              }}
            />
          </div>
          <div className="x-axis-label right">{question.config.xAxis.labels.max}</div>
        </div>
        <div className="y-axis-label bottom">{question.config.yAxis.labels.min}</div>
      </div>
      <div 
        role="status" 
        aria-live="polite" 
        className="visually-hidden"
      >
        {announcement}
      </div>
      <button
        className="submit-button"
        onClick={handleSubmit}
        disabled={disabled}
      >
        Submit
      </button>
    </div>
  );
}; 