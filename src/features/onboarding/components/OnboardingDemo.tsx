import React, { useState } from 'react';
import { useOnboardingQuestions } from '../hooks/useOnboardingQuestions';
import type { QuestionResponse } from '../../questions/types/question';
import './OnboardingDemo.css';

export const OnboardingDemo: React.FC = () => {
  const { questions, validateResponse } = useOnboardingQuestions();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, QuestionResponse>>({});

  const currentQuestion = questions[currentIndex];

  const handleResponse = (response: any) => {
    if (!currentQuestion) return;

    if (validateResponse(currentQuestion.id, response)) {
      setResponses(prev => ({
        ...prev,
        [currentQuestion.id]: {
          questionId: currentQuestion.id,
          value: response,
          timestamp: Date.now()
        }
      }));
      
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(prev => prev + 1);
      }
    }
  };

  const getProgressLabel = () => {
    const requiredCount = questions.filter(q => q.requiredForOnboarding).length;
    const requiredCompleted = Object.keys(responses)
      .filter(id => questions.find(q => q.id === id)?.requiredForOnboarding)
      .length;

    return (
      <div className="progress">
        <div className="required-progress">
          Required: {requiredCompleted} of {requiredCount}
        </div>
        <div className="overall-progress">
          Question {currentIndex + 1} of {questions.length}
          {currentQuestion.requiredForOnboarding && ' (Required)'}
        </div>
      </div>
    );
  };

  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case 'MC':
        return (
          <div className="options">
            {currentQuestion.options.map(option => (
              <button
                key={option}
                onClick={() => handleResponse(option)}
                className={responses[currentQuestion.id]?.value === option ? 'selected' : ''}
              >
                {option}
              </button>
            ))}
          </div>
        );

      case 'NM':
        return (
          <input
            type="number"
            className="numeric-input"
            min={currentQuestion.min}
            max={currentQuestion.max}
            step={currentQuestion.step || 1}
            onChange={e => handleResponse(parseInt(e.target.value, 10))}
            value={responses[currentQuestion.id]?.value || ''}
          />
        );

      case 'OP':
        return (
          <textarea
            className="text-input"
            maxLength={currentQuestion.maxLength}
            onChange={e => handleResponse(e.target.value)}
            value={responses[currentQuestion.id]?.value || ''}
            placeholder="Type your answer here..."
          />
        );

      default:
        return null;
    }
  };

  if (!currentQuestion) {
    return <div>Onboarding complete!</div>;
  }

  return (
    <div className="onboarding-demo">
      <h2>Welcome! Let's get to know you</h2>
      <div className="question-container">
        <h3>
          {currentQuestion.text}
          {currentQuestion.requiredForOnboarding && 
            <span className="required-indicator">*</span>
          }
        </h3>
        {renderQuestion()}
      </div>
      {getProgressLabel()}
    </div>
  );
}; 