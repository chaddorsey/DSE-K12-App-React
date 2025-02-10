import React, { useState } from 'react';
import type { MultipleChoiceQuestionType, QuestionResponse } from '../types';
import './MultipleChoiceQuestion.css';

interface Props {
  question: MultipleChoiceQuestionType;
  onAnswer: (response: QuestionResponse) => void;
  correctAnswer?: string;  // Optional for quiz mode
  disabled?: boolean;
  loading?: boolean;
}

export const MultipleChoiceQuestion: React.FC<Props> = ({
  question,
  onAnswer,
  correctAnswer,
  disabled = false,
  loading = false
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleSelect = (option: string) => {
    if (disabled || loading) return;
    
    setSelectedAnswer(option);
    setShowFeedback(true);
    
    onAnswer({
      questionId: question.id,
      answer: option,
      timestamp: Date.now()
    });
  };

  const getOptionClassName = (option: string) => {
    if (!showFeedback || !selectedAnswer) return 'option';
    
    if (correctAnswer) {
      // Quiz mode feedback
      if (option === selectedAnswer) {
        return option === correctAnswer ? 'option correct' : 'option incorrect';
      }
      if (option === correctAnswer) {
        return 'option correct';
      }
    }
    
    return option === selectedAnswer ? 'option selected' : 'option';
  };

  if (loading) {
    return <div data-testid="question-loading">Loading...</div>;
  }

  return (
    <div className="multiple-choice-question">
      <div className="prompt">{question.prompt}</div>
      <div className="options">
        {question.options.map((option) => (
          <button
            key={option}
            className={getOptionClassName(option)}
            onClick={() => handleSelect(option)}
            disabled={!!(disabled || loading || (showFeedback && correctAnswer))}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}; 