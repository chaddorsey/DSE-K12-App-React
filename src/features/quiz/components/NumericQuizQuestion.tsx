import React, { useState } from 'react';
import { QuestionType } from '../../questions/types/questions';
import './NumericQuizQuestion.css';

export const NumericQuizQuestion: React.FC<any> = ({
  question,
  onAnswer,
  showFeedback
}) => {
  const [value, setValue] = useState<string>('');
  const [answered, setAnswered] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (newValue === '' || /^\d*\.?\d*$/.test(newValue)) {
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
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="Enter a number"
          disabled={answered}
          className={`numeric-input ${error ? 'error' : ''}`}
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