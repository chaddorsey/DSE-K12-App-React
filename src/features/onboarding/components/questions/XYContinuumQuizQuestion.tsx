import React, { useState, useRef } from 'react';
import { QuestionType, XYContinuumQuestion } from '../../../questions/types/questions';
import './XYContinuumQuizQuestion.css';

interface Props {
  question: XYContinuumQuestion;
  onAnswer: (response: any) => void;
  showFeedback: boolean;
}

interface Point {
  x: number;
  y: number;
}

export const XYContinuumQuizQuestion: React.FC<Props> = ({
  question,
  onAnswer,
  showFeedback
}) => {
  const [point, setPoint] = useState<Point>(
    question.defaultPosition || { x: 0.5, y: 0.5 }
  );
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
        role="button"
        tabIndex={0}
        aria-label="XY grid selector"
      >
        <div className="axis-labels">
          <div className="x-labels">
            <span className="left-label">{question.xAxis.left}</span>
            <span className="right-label">{question.xAxis.right}</span>
          </div>
          <div className="y-labels">
            <span className="top-label">{question.yAxis.top}</span>
            <span className="bottom-label">{question.yAxis.bottom}</span>
          </div>
        </div>
        <div className="x-axis" />
        <div className="y-axis" />
        <div 
          className="point"
          style={{
            left: `${point.x * 100}%`,
            top: `${point.y * 100}%`
          }}
          role="marker"
          aria-label="Selected point"
        />
      </div>
    </div>
  );
}; 