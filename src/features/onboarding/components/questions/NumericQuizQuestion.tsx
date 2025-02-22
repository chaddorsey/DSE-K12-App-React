import React, { useState } from 'react';
import { QuestionType, NumericQuestion } from '../../../questions/types/questions';
import './NumericQuizQuestion.css';

interface Props {
  question: NumericQuestion;
  onAnswer: (response: any) => void;
  showFeedback: boolean;
}

export const NumericQuizQuestion: React.FC<Props> = ({
  question,
  onAnswer,
  showFeedback
}) => {
  const [value, setValue] = useState<string>('');
  const [answered, setAnswered] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    const numValue = parseFloat(newValue);

    if (newValue === '' || (!isNaN(numValue) && 
        numValue >= question.min && 
        numValue <= question.max)) {
      setValue(newValue);
      setError(null);
    }
  };

  const handleSubmit = () => {
    if (answered) return;
    
    const numericValue = parseFloat(value);
    if (isNaN(numericValue)) {
      setError('Please enter a valid number');
      return;
    }

    setAnswered(true);
    onAnswer({
      questionId: question.id,
      value: {
        type: QuestionType.NM,
        number: numericValue
      }
    });
  };

  return (
    <div className="numeric-question">
      <div className="input-container">
        <input
          type="number"
          value={value}
          onChange={handleChange}
          placeholder={`Enter a number between ${question.min} and ${question.max}`}
          disabled={answered}
          className={`numeric-input ${error ? 'error' : ''}`}
          min={question.min}
          max={question.max}
          step={question.step}
        />
        {error && <div className="error-message">{error}</div>}
      </div>
      {!answered && (
        <button 
          onClick={handleSubmit}
          className="submit-button"
          disabled={!value.trim()}
        >
          Submit Answer
        </button>
      )}
    </div>
  );
}; 