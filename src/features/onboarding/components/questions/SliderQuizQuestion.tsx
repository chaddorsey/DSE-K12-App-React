import React, { useState } from 'react';
import { QuestionType, SliderQuestion } from '../../../questions/types/questions';
import './SliderQuizQuestion.css';

interface Props {
  question: SliderQuestion;
  onAnswer: (response: any) => void;
  showFeedback: boolean;
}

export const SliderQuizQuestion: React.FC<Props> = ({
  question,
  onAnswer,
  showFeedback
}) => {
  const [value, setValue] = useState(question.defaultValue || 50);
  const [answered, setAnswered] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(event.target.value));
  };

  const handleSubmit = () => {
    if (answered) return;
    
    setAnswered(true);
    onAnswer({
      questionId: question.id,
      value: {
        type: QuestionType.SLIDER,
        value: value
      }
    });
  };

  return (
    <div className="slider-question">
      <div className="slider-container">
        <div className="slider-labels">
          <span className="left-label">{question.leftLabel}</span>
          <span className="right-label">{question.rightLabel}</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={handleChange}
          className="slider"
          disabled={answered}
        />
        <div className="slider-value">{value}</div>
      </div>
      {!answered && (
        <button 
          onClick={handleSubmit}
          className="submit-button"
        >
          Submit Answer
        </button>
      )}
    </div>
  );
}; 