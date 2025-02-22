import React, { useState } from 'react';
import { QuizQuestion } from './QuizQuestion';
import { QuestionType } from '../../questions/types/questions';
import './MultipleChoiceQuizQuestion.css';

export const MultipleChoiceQuizQuestion: React.FC<any> = ({ 
  question,
  onAnswer,
  showFeedback 
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);

  const handleOptionClick = (option: string) => {
    if (answered) return;
    
    setSelectedOption(option);
    setAnswered(true);

    onAnswer({
      questionId: question.id,
      value: {
        type: QuestionType.MC,
        selectedOption: option
      }
    });
  };

  const getOptionClassName = (option: string) => {
    if (!answered) return selectedOption === option ? 'selected' : '';
    if (option === question.correctAnswer) return 'correct';
    if (option === selectedOption) return 'incorrect';
    return 'disabled';
  };

  return (
    <div className="multiple-choice-question">
      <div className="options-grid">
        {question.options.map((option: string) => (
          <button
            key={option}
            onClick={() => handleOptionClick(option)}
            className={`option-button ${getOptionClassName(option)}`}
            disabled={answered}
            aria-pressed={selectedOption === option}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}; 