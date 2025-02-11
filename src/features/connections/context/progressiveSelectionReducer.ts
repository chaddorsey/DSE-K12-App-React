import type { ProgressiveSelectionState, RecognitionLevel } from '../types/progressive-selection';

export const initialState: ProgressiveSelectionState = {
  currentLevel: 'FACE',
  selections: {},
  isProgressive: false
};

type ProgressiveSelectionAction =
  | { type: 'TOGGLE_PROGRESSIVE_MODE' }
  | { type: 'SELECT_USER'; payload: { userId: string } }
  | { type: 'SET_LEVEL'; payload: { level: RecognitionLevel } }
  | { type: 'CLEAR_SELECTIONS' };

export function progressiveSelectionReducer(
  state: ProgressiveSelectionState,
  action: ProgressiveSelectionAction
): ProgressiveSelectionState {
  switch (action.type) {
    case 'TOGGLE_PROGRESSIVE_MODE':
      return {
        ...state,
        isProgressive: !state.isProgressive,
        currentLevel: 'FACE' // Reset to initial level when toggling
      };

    case 'SELECT_USER':
      return {
        ...state,
        selections: {
          ...state.selections,
          [action.payload.userId]: {
            userId: action.payload.userId,
            recognitionLevel: state.currentLevel,
            timestamp: Date.now()
          }
        }
      };

    case 'SET_LEVEL':
      return {
        ...state,
        currentLevel: action.payload.level
      };

    case 'CLEAR_SELECTIONS':
      return {
        ...state,
        selections: {}
      };

    default:
      return state;
  }
} 