import React, { useState, useRef } from 'react';
import type { XYContinuumQuestion } from '../types/questions';
import type { QuestionResponse } from '../types/responses';
import './XYContinuumQuestion.css';

interface Props {
  question: XYContinuumQuestion;
  onAnswer: (response: QuestionResponse) => void;
  disabled?: boolean;
  showFeedback?: boolean;
}

export const XYContinuumQuestionComponent: React.FC<Props> = ({
  question,
  onAnswer,
  disabled = false,
  showFeedback = false
}) => {
  const [position, setPosition] = useState(question.defaultPosition || { x: 0.5, y: 0.5 });
  const [interactionCount, setInteractionCount] = useState(0);
  const startTime = useRef(Date.now());
  const gridRef = useRef<HTMLDivElement>(null);

  const handleGridClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || !gridRef.current) return;

    const rect = gridRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = 1 - ((e.clientY - rect.top) / rect.height); // Invert Y to match coordinate system

    setPosition({ x, y });
    setInteractionCount(prev => prev + 1);
  };

  const handleSubmit = () => {
    if (disabled) return;

    const response: QuestionResponse = {
      questionId: question.id,
      value: {
        type: 'XY',
        position,
        xLabel: position.x < 0.5 ? question.xAxis.left : question.xAxis.right,
        yLabel: position.y < 0.5 ? question.yAxis.bottom : question.yAxis.top
      },
      metadata: {
        timeToAnswer: Date.now() - startTime.current,
        interactionCount,
        device: {
          type: 'desktop',
          input: 'mouse'
        }
      }
    };

    onAnswer(response);
  };

  return (
    <div className="xy-question">
      <div className="xy-prompt">{question.prompt}</div>
      
      <div className="xy-grid-container">
        <div className="xy-labels y-labels">
          <span className="top-label">{question.yAxis.top}</span>
          <span className="bottom-label">{question.yAxis.bottom}</span>
        </div>
        
        <div 
          ref={gridRef}
          className="xy-grid"
          onClick={handleGridClick}
        >
          <div 
            className="xy-marker"
            style={{
              left: `${position.x * 100}%`,
              bottom: `${position.y * 100}%`
            }}
          />
          <div className="grid-lines" />
        </div>
        
        <div className="xy-labels x-labels">
          <span className="left-label">{question.xAxis.left}</span>
          <span className="right-label">{question.xAxis.right}</span>
        </div>
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