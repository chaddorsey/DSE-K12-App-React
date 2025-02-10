import React, { useState } from 'react';
import { MultipleChoiceQuestion } from './MultipleChoiceQuestion';
import { OpenResponseQuestion } from './OpenResponseQuestion';
import { NumericQuestion } from './NumericQuestion';
import { DelightFactor } from './DelightFactor/DelightFactor';
import { QuestionProvider, useQuestionContext } from '../context/QuestionContext';
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

const ContextControls = () => {
  const { state, actions } = useQuestionContext();
  
  return (
    <div className="context-controls">
      <div className="control-group">
        <label>
          Experience:
          <select 
            value={state.experience}
            onChange={(e) => actions.setExperience(e.target.value as any)}
          >
            <option value="ONBOARDING">Onboarding</option>
            <option value="QUIZ">Quiz</option>
            <option value="HEAD_TO_HEAD">Head to Head</option>
          </select>
        </label>
      </div>

      <div className="control-group">
        <label>
          Mode:
          <select 
            value={state.mode}
            onChange={(e) => actions.setMode(e.target.value as any)}
          >
            <option value="PRACTICE">Practice</option>
            <option value="COMPETITION">Competition</option>
          </select>
        </label>
      </div>

      <div className="control-group">
        <label>
          <input
            type="checkbox"
            checked={state.showFeedback}
            onChange={(e) => actions.setShowFeedback(e.target.checked)}
          />
          Show Feedback
        </label>
      </div>

      <div className="control-group">
        <label>
          <input
            type="checkbox"
            checked={state.allowRetry}
            onChange={(e) => actions.setAllowRetry(e.target.checked)}
          />
          Allow Retry
        </label>
      </div>
    </div>
  );
};

const PlaygroundContent = () => {
  const [responses, setResponses] = useState<QuestionResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [showDelight, setShowDelight] = useState(false);
  const { state } = useQuestionContext();

  const shouldShowDelight = (question: QuestionType, response: QuestionResponse): boolean => {
    switch (state.experience) {
      case 'QUIZ':
        switch (question.type) {
          case 'MULTIPLE_CHOICE':
            // Only first option triggers delight
            return response.answer === question.options[0];
          case 'OPEN_RESPONSE':
            // Every other submission
            const openResponses = responses.filter(r => r.questionId === question.id);
            return openResponses.length % 2 === 1;
          case 'NUMERIC':
            // Every third submission
            const numericResponses = responses.filter(r => r.questionId === question.id);
            return numericResponses.length % 3 === 2;
          default:
            return false;
        }
      case 'HEAD_TO_HEAD':
        // Random trigger (30% chance)
        return Math.random() < 0.3;
      default:
        return true;
    }
  };

  const handleAnswer = (response: QuestionResponse) => {
    setResponses(prev => [...prev, response]);
    console.log('Answer received:', response);
    
    const question = sampleQuestions.find(q => q.id === response.questionId);
    if (question && shouldShowDelight(question, response)) {
      setShowDelight(true);
    }
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
      <ContextControls />
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

export const QuestionPlayground = () => {
  return (
    <QuestionProvider>
      <PlaygroundContent />
    </QuestionProvider>
  );
}; 