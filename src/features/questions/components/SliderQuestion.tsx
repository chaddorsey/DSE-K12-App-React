import React, { useState, useRef, useEffect } from 'react';
import { BaseSlider } from './BaseSlider';
import type { SliderQuestionType, QuestionResponse } from '../types';
import classNames from 'classnames';
import './SliderQuestion.css';

interface Props {
  question: SliderQuestionType;
  onAnswer: (response: QuestionResponse) => void;
  correctAnswer?: string;  // Will be a string ratio "0.7"
  disabled?: boolean;
  loading?: boolean;
}

export const SliderQuestion: React.FC<Props> = ({
  question,
  onAnswer,
  correctAnswer,
  disabled = false,
  loading = false
}) => {
  const [value, setValue] = useState(question.defaultValue ?? 0.5);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Reset feedback when question changes
  useEffect(() => {
    setShowFeedback(false);
    setIsCorrect(null);
  }, [question.id]);

  // Show feedback when correctAnswer is provided (after submission)
  useEffect(() => {
    if (correctAnswer && !showFeedback) {
      const correctValue = parseFloat(correctAnswer);
      const tolerance = 0.1;
      const isAnswerCorrect = Math.abs(value - correctValue) <= tolerance;
      
      setIsCorrect(isAnswerCorrect);
      setShowFeedback(true);

      if (!isAnswerCorrect && containerRef.current) {
        containerRef.current.classList.add('shake');
        setTimeout(() => {
          containerRef.current?.classList.remove('shake');
        }, 500);
      }
    }
  }, [correctAnswer, value, showFeedback]);

  if (loading) {
    return <div data-testid="question-loading">Loading...</div>;
  }

  const handleSliderChange = (newValue: number) => {
    if (disabled) return;
    setValue(newValue / 100);
  };

  const handleSubmit = () => {
    onAnswer({
      questionId: question.id,
      value,
      timestamp: Date.now()
    });
  };

  return (
    <div 
      ref={containerRef}
      className={classNames('slider-question', {
        'correct': showFeedback && isCorrect,
        'incorrect': showFeedback && !isCorrect
      })}
    >
      <div className="prompt">{question.prompt}</div>
      <div className="slider-container">
        <div className="option-label left">{question.leftOption}</div>
        <div className="slider-wrapper">
          <div className="slider-track-container">
            <BaseSlider
              id={question.id}
              min={0}
              max={100}
              defaultValue={value * 100}
              disabled={disabled}
              onChange={handleSliderChange}
            />
            {showFeedback && correctAnswer && !isCorrect && (
              <div 
                className="correct-marker"
                style={{ left: `${parseFloat(correctAnswer) * 100}%` }}
                title={`Correct answer: ${Math.round(parseFloat(correctAnswer) * 100)}%`}
              />
            )}
          </div>
        </div>
        <div className="option-label right">{question.rightOption}</div>
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

export { SliderQuestion as SliderQuestionComponent }; 