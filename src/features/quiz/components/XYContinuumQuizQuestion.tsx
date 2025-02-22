import React, { useState, useRef, useEffect } from 'react';
import { QuestionType } from '../../questions/types/questions';
import './XYContinuumQuizQuestion.css';

interface Point {
  x: number;
  y: number;
}

export const XYContinuumQuizQuestion: React.FC<any> = ({
  question,
  onAnswer,
  showFeedback
}) => {
  const [point, setPoint] = useState<Point>({ x: 0.5, y: 0.5 });
  const [answered, setAnswered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClick = (event: React.MouseEvent) => {
    if (answered || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    const newPoint = {
      x: Math.max(0, Math.min(1, x)),
      y: Math.max(0, Math.min(1, y))
    };

    setPoint(newPoint);
    setAnswered(true);

    onAnswer({
      questionId: question.id,
      value: {
        type: QuestionType.XY,
        point: newPoint
      }
    });
  };

  return (
    <div className="xy-question">
      <div 
        ref={containerRef}
        className="xy-grid"
        onClick={handleClick}
      >
        <div className="x-axis" />
        <div className="y-axis" />
        <div 
          className="point"
          style={{
            left: `${point.x * 100}%`,
            top: `${point.y * 100}%`
          }}
        />
        {answered && question.correctAnswer && (
          <div 
            className="correct-point"
            style={{
              left: `${question.correctAnswer.x * 100}%`,
              top: `${question.correctAnswer.y * 100}%`
            }}
          />
        )}
      </div>
    </div>
  );
}; 