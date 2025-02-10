import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { useQuestionContext, QuestionProvider } from '../QuestionContext';

const TestComponent = () => {
  const { state, actions } = useQuestionContext();
  return (
    <div>
      <div data-testid="experience">{state.experience}</div>
      <div data-testid="mode">{state.mode}</div>
      <button onClick={() => actions.setMode('COMPETITION')}>
        Set Competition Mode
      </button>
      <button onClick={actions.startTimer}>Start Timer</button>
      <button onClick={actions.pauseTimer}>Pause Timer</button>
    </div>
  );
};

describe('QuestionContext', () => {
  it('provides default context values', () => {
    render(
      <QuestionProvider>
        <TestComponent />
      </QuestionProvider>
    );

    expect(screen.getByTestId('experience')).toHaveTextContent('QUIZ');
    expect(screen.getByTestId('mode')).toHaveTextContent('PRACTICE');
  });

  it('allows mode switching', () => {
    render(
      <QuestionProvider>
        <TestComponent />
      </QuestionProvider>
    );

    fireEvent.click(screen.getByText('Set Competition Mode'));
    expect(screen.getByTestId('mode')).toHaveTextContent('COMPETITION');
  });

  it('handles timer controls', () => {
    jest.useFakeTimers();
    
    render(
      <QuestionProvider>
        <TestComponent />
      </QuestionProvider>
    );

    fireEvent.click(screen.getByText('Start Timer'));
    
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    fireEvent.click(screen.getByText('Pause Timer'));
    
    jest.useRealTimers();
  });
}); 