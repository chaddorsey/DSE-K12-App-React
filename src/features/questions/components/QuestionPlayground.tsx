import React, { useState } from 'react';
import { MultipleChoiceQuestion } from './MultipleChoiceQuestion';
import { OpenResponseQuestion } from './OpenResponseQuestion';
import { NumericQuestion } from './NumericQuestion';
import { DelightFactor } from './DelightFactor/DelightFactor';
import type { 
  QuestionResponse, 
  MultipleChoiceQuestionType, 
  OpenResponseQuestionType, 
  NumericQuestionType,
  AnimationDelightFactor 
} from '../types';
import './QuestionPlayground.css';

type QuestionType = MultipleChoiceQuestionType | OpenResponseQuestionType | NumericQuestionType;

const sampleQuestions: QuestionType[] = [
  {
    id: 'q1',
    type: 'MULTIPLE_CHOICE',
    prompt: 'What is your favorite color?',
    options: ['Red', 'Blue', 'Green', 'Yellow']
  } as MultipleChoiceQuestionType,
  {
    id: 'q2',
    type: 'MULTIPLE_CHOICE',
    prompt: 'How many hours do you typically sleep?',
    options: ['Less than 6', '6-7', '7-8', '8+']
  } as MultipleChoiceQuestionType,
  {
    id: 'q3',
    type: 'OPEN_RESPONSE',
    prompt: 'What are your career goals?',
    maxLength: 500
  } as OpenResponseQuestionType,
  {
    id: 'q4',
    type: 'NUMERIC',
    prompt: 'How many years of experience do you have?',
    min: 0,
    max: 50,
    step: 1
  } as NumericQuestionType
];

const sampleDelightFactor: AnimationDelightFactor = {
  id: 'celebration1',
  type: 'ANIMATION',
  timing: 'POST_ANSWER',
  trigger: 'IMMEDIATE',
  animationType: 'CELEBRATION',
  content: {
    animation: 'confetti',
    duration: 2000
  },
  questionTypes: ['MULTIPLE_CHOICE', 'OPEN_RESPONSE', 'NUMERIC']
};

export const QuestionPlayground: React.FC = () => {
  const [responses, setResponses] = useState<QuestionResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [showDelight, setShowDelight] = useState(false);

  const handleAnswer = (response: QuestionResponse) => {
    setResponses(prev => [...prev, response]);
    console.log('Answer received:', response);
    setShowDelight(true);
  };

  const handleDelightComplete = () => {
    setShowDelight(false);
  };

  const renderQuestion = (question: QuestionType) => {
    switch (question.type) {
      case 'MULTIPLE_CHOICE':
        return (
          <MultipleChoiceQuestion
            question={question}
            onAnswer={handleAnswer}
            loading={loading}
            disabled={disabled}
          />
        );
      case 'OPEN_RESPONSE':
        return (
          <OpenResponseQuestion
            question={question}
            onAnswer={handleAnswer}
            loading={loading}
            disabled={disabled}
          />
        );
      case 'NUMERIC':
        return (
          <NumericQuestion
            question={question}
            onAnswer={handleAnswer}
            loading={loading}
            disabled={disabled}
          />
        );
      default:
        return null;
    }
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
            {renderQuestion(question)}
            <div className="response-display">
              Last response: {
                responses.find(r => r.questionId === question.id)?.answer || 'No answer yet'
              }
            </div>
            {showDelight && (
              <DelightFactor
                factor={sampleDelightFactor}
                onComplete={handleDelightComplete}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}; 