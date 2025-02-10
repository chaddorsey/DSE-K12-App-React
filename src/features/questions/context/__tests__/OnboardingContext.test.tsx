import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { OnboardingProvider, useOnboardingContext } from '../OnboardingContext';

const mockStandardQuestions = [
  {
    id: 'std1',
    type: 'MULTIPLE_CHOICE',
    prompt: 'What brings you here today?',
    options: ['Learning', 'Career Growth', 'Curiosity', 'Other']
  },
  {
    id: 'std2',
    type: 'OPEN_RESPONSE',
    prompt: 'What are your main goals?',
    maxLength: 500
  }
] as const;

const mockQuestionPool = [
  {
    id: 'pool1',
    type: 'NUMERIC',
    prompt: 'Years of experience?',
    min: 0,
    max: 50,
    step: 1
  },
  {
    id: 'pool2',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Preferred learning style?',
    options: ['Visual', 'Audio', 'Reading', 'Hands-on']
  }
] as const;

const TestComponent = () => {
  const { state, actions } = useOnboardingContext();
  return (
    <div>
      <div data-testid="current-index">{state.currentQuestionIndex}</div>
      <div data-testid="total-questions">{state.selectedQuestions.length}</div>
      <button onClick={actions.initializeSequence}>Initialize</button>
      <button 
        onClick={() => actions.handleResponse({
          questionId: state.selectedQuestions[state.currentQuestionIndex].id,
          answer: 'test',
          timestamp: Date.now()
        })}
      >
        Answer
      </button>
    </div>
  );
};

describe('OnboardingContext', () => {
  it('initializes with correct number of questions', () => {
    render(
      <OnboardingProvider
        standardQuestions={mockStandardQuestions}
        questionPool={mockQuestionPool}
      >
        <TestComponent />
      </OnboardingProvider>
    );

    fireEvent.click(screen.getByText('Initialize'));
    expect(screen.getByTestId('total-questions')).toHaveTextContent('7');
  });

  it('advances through questions on response', () => {
    render(
      <OnboardingProvider
        standardQuestions={mockStandardQuestions}
        questionPool={mockQuestionPool}
      >
        <TestComponent />
      </OnboardingProvider>
    );

    fireEvent.click(screen.getByText('Initialize'));
    expect(screen.getByTestId('current-index')).toHaveTextContent('0');

    fireEvent.click(screen.getByText('Answer'));
    expect(screen.getByTestId('current-index')).toHaveTextContent('1');
  });
}); 