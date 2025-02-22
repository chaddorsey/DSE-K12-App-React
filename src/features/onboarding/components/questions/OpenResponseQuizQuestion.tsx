import React, { useState } from 'react';
import { QuestionType, OpenResponseQuestion } from '../../../questions/types/questions';
import './OpenResponseQuizQuestion.css';

interface Props {
  question: OpenResponseQuestion;
  onAnswer: (response: any) => void;
  showFeedback: boolean;
}

export const OpenResponseQuizQuestion: React.FC<Props> = ({
  question,
  onAnswer,
  showFeedback
}) => {
  const [answer, setAnswer] = useState('');
  const [answered, setAnswered] = useState(false);

  const handleSubmit = () => {
    if (answered || !answer.trim()) return;
    
    setAnswered(true);
    onAnswer({
      questionId: question.id,
      value: {
        type: QuestionType.OP,
        text: answer.trim()
      }
    });
  };

  return (
    <div className="open-response-question">
      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Type your answer here..."
        disabled={answered}
        className="response-input"
        rows={4}
        maxLength={question.maxLength}
      />
      {!answered && (
        <button 
          onClick={handleSubmit}
          className="submit-button"
          disabled={!answer.trim()}
        >
          Submit Answer
        </button>
      )}
    </div>
  );
}; 