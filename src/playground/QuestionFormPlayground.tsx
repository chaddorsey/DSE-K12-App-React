import React, { useState } from 'react';
import { QuestionForm } from '../features/questions/components/QuestionForm';
import { AccessibilityProvider } from '../features/accessibility/context/AccessibilityContext';
import type { Question, QuestionResponse } from '../features/questions/types';
import './QuestionFormPlayground.css';

const sampleQuestions: Question[] = [
  {
    id: 'q1',
    type: 'MULTIPLE_CHOICE',
    prompt: 'What is your favorite color?',
    options: ['Red', 'Blue', 'Green', 'Yellow'],
    required: true
  },
  {
    id: 'q2',
    type: 'OPEN_RESPONSE',
    prompt: 'Why did you choose that color?',
    maxLength: 500,
    minLength: 10,
    required: true
  },
  {
    id: 'q3',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Would you like to answer more questions?',
    options: ['Yes', 'No', 'Maybe'],
    required: true
  }
];

export const QuestionFormPlayground: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [transitionSpeed, setTransitionSpeed] = useState(150);
  const [fadeDelay, setFadeDelay] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});

  const handleAnswer = (response: QuestionResponse) => {
    console.log('Answer:', response);
    setAnswers(prev => ({
      ...prev,
      [response.questionId]: response.answer
    }));
  };

  const handleComplete = () => {
    console.log('Form completed!', answers);
  };

  return (
    <div className={`playground ${isMobile ? 'mobile' : ''}`}>
      <div className="playground-controls">
        <h2>Transition Controls</h2>
        <div className="control-group">
          <label>
            <input
              type="checkbox"
              checked={isMobile}
              onChange={e => setIsMobile(e.target.checked)}
            />
            Mobile View
          </label>
          <label>
            <input
              type="checkbox"
              checked={reducedMotion}
              onChange={e => setReducedMotion(e.target.checked)}
            />
            Reduced Motion
          </label>
          <label>
            Transition Speed:
            <input
              type="range"
              min="50"
              max="500"
              value={transitionSpeed}
              onChange={e => setTransitionSpeed(Number(e.target.value))}
            />
            {transitionSpeed}ms
          </label>
          <label>
            Fade Delay:
            <input
              type="range"
              min="0"
              max="200"
              value={fadeDelay}
              onChange={e => setFadeDelay(Number(e.target.value))}
            />
            {fadeDelay}ms
          </label>
        </div>
        <div className="answers-preview">
          <h3>Current Answers:</h3>
          <pre>{JSON.stringify(answers, null, 2)}</pre>
        </div>
      </div>

      <div className="demo-container">
        <AccessibilityProvider
          initialSettings={{ reducedMotion }}
        >
          <QuestionForm
            questions={sampleQuestions}
            onAnswer={handleAnswer}
            onComplete={handleComplete}
            transitionDuration={transitionSpeed}
            fadeDelay={fadeDelay}
          />
        </AccessibilityProvider>
      </div>
    </div>
  );
}; 