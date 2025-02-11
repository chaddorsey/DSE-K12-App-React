import { progressiveSelectionReducer, initialState } from '../progressiveSelectionReducer';
import type { ProgressiveSelectionState } from '../../types/progressive-selection';

describe('progressiveSelectionReducer', () => {
  it('handles toggle progressive mode', () => {
    const nextState = progressiveSelectionReducer(initialState, {
      type: 'TOGGLE_PROGRESSIVE_MODE'
    });

    expect(nextState.isProgressive).toBe(true);
    expect(nextState.currentLevel).toBe('FACE'); // Should reset to initial level
  });

  it('handles user selection', () => {
    const state: ProgressiveSelectionState = {
      ...initialState,
      isProgressive: true,
      currentLevel: 'FACE'
    };

    const nextState = progressiveSelectionReducer(state, {
      type: 'SELECT_USER',
      payload: { userId: '1' }
    });

    expect(nextState.selections['1']).toEqual({
      userId: '1',
      recognitionLevel: 'FACE',
      timestamp: expect.any(Number)
    });
  });

  it('handles level change', () => {
    const state: ProgressiveSelectionState = {
      ...initialState,
      isProgressive: true,
      currentLevel: 'FACE'
    };

    const nextState = progressiveSelectionReducer(state, {
      type: 'SET_LEVEL',
      payload: { level: 'NAME' }
    });

    expect(nextState.currentLevel).toBe('NAME');
  });

  it('handles clear selections', () => {
    const state: ProgressiveSelectionState = {
      ...initialState,
      selections: {
        '1': { userId: '1', recognitionLevel: 'FACE', timestamp: Date.now() }
      }
    };

    const nextState = progressiveSelectionReducer(state, {
      type: 'CLEAR_SELECTIONS'
    });

    expect(nextState.selections).toEqual({});
  });

  it('preserves existing selections when changing levels', () => {
    const state: ProgressiveSelectionState = {
      ...initialState,
      selections: {
        '1': { userId: '1', recognitionLevel: 'FACE', timestamp: Date.now() }
      },
      currentLevel: 'FACE'
    };

    const nextState = progressiveSelectionReducer(state, {
      type: 'SET_LEVEL',
      payload: { level: 'NAME' }
    });

    expect(nextState.selections['1']).toBeDefined();
  });
});