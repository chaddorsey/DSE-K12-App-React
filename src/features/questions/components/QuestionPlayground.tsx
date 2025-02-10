import React, { useState } from 'react';
import { MultipleChoiceQuestion } from './MultipleChoiceQuestion';
import type { QuestionResponse, MultipleChoiceQuestionType } from '../types';
import './QuestionPlayground.css';

const sampleQuestions: MultipleChoiceQuestionType[] = [
  {
    id: 'q1',
    type: 'MULTIPLE_CHOICE',
    prompt: 'What is your favorite color?',
    options: ['Red', 'Blue', 'Green', 'Yellow']
  },
  {
    id: 'q2',
    type: 'MULTIPLE_CHOICE',
    prompt: 'How many hours do you typically sleep?',
    options: ['Less than 6', '6-7', '7-8', '8+']
  }
];

export const QuestionPlayground: React.FC = () => {
  const [responses, setResponses] = useState<QuestionResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const handleAnswer = (response: QuestionResponse) => {
    setResponses(prev => [...prev, response]);
    console.log('Answer received:', response);
  };

  return (
    <div className="playground-container">
      <div className="playground-controls">
        <label>
          <input
            type="checkbox"
            checked={loading}
            onChange={e => setLoading(e.target.checked)}
          />
          Show Loading State
        </label>
        <label>
          <input
            type="checkbox"
            checked={disabled}
            onChange={e => setDisabled(e.target.checked)}
          />
          Disable Questions
        </label>
      </div>

      <div className="questions-list">
        {sampleQuestions.map(question => (
          <div key={question.id} className="question-wrapper">
            <MultipleChoiceQuestion
              question={question}
              onAnswer={handleAnswer}
              loading={loading}
              disabled={disabled}
            />
            <div className="response-display">
              Last response: {
                responses.find(r => r.questionId === question.id)?.answer || 'No answer yet'
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 