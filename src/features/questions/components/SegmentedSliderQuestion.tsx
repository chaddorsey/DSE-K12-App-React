import React, { useState, useRef, useEffect } from 'react';
import { BaseSlider } from './BaseSlider';
import type { SegmentedSliderQuestionType, QuestionResponse } from '../types';
import classNames from 'classnames';
import './SegmentedSliderQuestion.css';

interface Props {
  question: SegmentedSliderQuestionType;
  onAnswer: (response: QuestionResponse) => void;
  correctAnswer?: string;
  disabled?: boolean;
  loading?: boolean;
}

export const SegmentedSliderQuestion: React.FC<Props> = ({
  question,
  onAnswer,
  correctAnswer,
  disabled = false,
  loading = false
}) => {
  const segmentCount = question.segments.length;
  const stepSize = 100 / (segmentCount - 1);
  
  const [value, setValue] = useState(
    question.defaultSegment 
      ? (question.defaultSegment - 1) * stepSize 
      : 50
  );
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setShowFeedback(false);
    setIsCorrect(null);
  }, [question.id]);

  useEffect(() => {
    if (correctAnswer && !showFeedback) {
      const selectedSegment = Math.round(value / stepSize) + 1;
      const isAnswerCorrect = selectedSegment.toString() === correctAnswer;
      
      setIsCorrect(isAnswerCorrect);
      setShowFeedback(true);

      if (!isAnswerCorrect && containerRef.current) {
        containerRef.current.classList.add('shake');
        setTimeout(() => {
          containerRef.current?.classList.remove('shake');
        }, 500);
      }
    }
  }, [correctAnswer, value, showFeedback, stepSize]);

  if (loading) {
    return <div data-testid="question-loading">Loading...</div>;
  }

  const handleSliderChange = (newValue: number) => {
    if (disabled) return;
    
    // Snap to nearest segment
    const nearestSegment = Math.round(newValue / stepSize);
    setValue(nearestSegment * stepSize);
  };

  const handleSubmit = () => {
    const selectedSegment = Math.round(value / stepSize) + 1;
    onAnswer({
      questionId: question.id,
      value: selectedSegment,
      timestamp: Date.now()
    });
  };

  const renderSegmentLabels = () => {
    return question.segments.map((segment, index) => {
      const position = index * stepSize;
      return (
        <div
          key={segment.value}
          className="segment-label"
          style={{ left: `${position}%` }}
        >
          {segment.label || segment.value}
        </div>
      );
    });
  };

  return (
    <div 
      ref={containerRef}
      className={classNames('segmented-slider-question', {
        'correct': showFeedback && isCorrect,
        'incorrect': showFeedback && !isCorrect
      })}
    >
      <div className="prompt">{question.prompt}</div>
      <div className="slider-container">
        <div className="slider-wrapper">
          <div className="slider-track-container">
            <BaseSlider
              id={question.id}
              min={0}
              max={100}
              step={stepSize}
              defaultValue={value}
              disabled={disabled}
              onChange={handleSliderChange}
            />
            {showFeedback && correctAnswer && !isCorrect && (
              <div 
                className="correct-marker"
                style={{ 
                  left: `${(parseInt(correctAnswer) - 1) * stepSize}%` 
                }}
                title={`Correct answer: ${
                  question.segments[parseInt(correctAnswer) - 1].label || 
                  question.segments[parseInt(correctAnswer) - 1].value
                }`}
              />
            )}
          </div>
          <div className="segment-markers">
            {renderSegmentLabels()}
          </div>
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

export { SegmentedSliderQuestion as SegmentedSliderQuestionComponent }; 