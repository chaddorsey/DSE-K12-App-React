import React, { useState } from 'react';
import { QuestionType, MultipleChoiceQuestion } from '../../../questions/types/questions';
import './MultipleChoiceQuizQuestion.css';

interface Props {
  question: MultipleChoiceQuestion;
  onAnswer: (response: QuestionResponse) => void;
  showFeedback: boolean;
}

export const MultipleChoiceQuizQuestion: React.FC<Props> = ({
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

  return (
    <div className="multiple-choice-question">
      <div className="options-grid">
        {question.options.map((option: string) => (
          <button
            key={option}
            onClick={() => handleOptionClick(option)}
            className={`option-button ${selectedOption === option ? 'selected' : ''}`}
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