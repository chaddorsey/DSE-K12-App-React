import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { useProgressiveSelection, ProgressiveSelectionProvider } from '../ProgressiveSelectionContext';

describe('ProgressiveSelectionContext', () => {
  const TestComponent = () => {
    const { state, actions, metrics } = useProgressiveSelection();
    return (
      <div>
        <div data-testid="mode">{state.isProgressive ? 'progressive' : 'standard'}</div>
        <div data-testid="current-level">{state.currentLevel}</div>
        <div data-testid="progress">{metrics.progressPercentage}%</div>
        <button onClick={actions.toggleProgressiveMode}>Toggle Mode</button>
        <button onClick={() => actions.selectUser('1')}>Select User</button>
        <button onClick={() => actions.setCurrentLevel('NAME')}>Next Level</button>
        <button onClick={actions.clearSelections}>Clear</button>
      </div>
    );
  };

  it('manages selection state through levels', () => {
    render(
      <ProgressiveSelectionProvider>
        <TestComponent />
      </ProgressiveSelectionProvider>
    );

    // Start in FACE recognition level
    expect(screen.getByTestId('current-level')).toHaveTextContent('FACE');

    // Select a user
    act(() => {
      screen.getByText('Select User').click();
    });

    // Progress to next level
    act(() => {
      screen.getByText('Next Level').click();
    });
    expect(screen.getByTestId('current-level')).toHaveTextContent('NAME');
  });

  it('tracks progress metrics', () => {
    render(
      <ProgressiveSelectionProvider>
        <TestComponent />
      </ProgressiveSelectionProvider>
    );

    expect(screen.getByTestId('progress')).toHaveTextContent('0%');

    act(() => {
      screen.getByText('Select User').click();
    });

    expect(screen.getByTestId('progress')).not.toHaveTextContent('0%');
  });

  it('persists selections across mode toggles', () => {
    render(
      <ProgressiveSelectionProvider>
        <TestComponent />
      </ProgressiveSelectionProvider>
    );

    // Make selection in progressive mode
    act(() => {
      screen.getByText('Select User').click();
    });

    // Toggle mode
    act(() => {
      screen.getByText('Toggle Mode').click();
    });

    // Toggle back
    act(() => {
      screen.getByText('Toggle Mode').click();
    });

    // Selection should still be reflected in progress
    expect(screen.getByTestId('progress')).not.toHaveTextContent('0%');
  });
});