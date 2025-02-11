import type { User } from './user';

export type RecognitionLevel = 'FACE' | 'NAME' | 'TALKED' | 'KNOW_WELL';

export interface ProgressiveSelection {
  userId: string;
  recognitionLevel: RecognitionLevel;
  timestamp: number;
  confidence?: number;
}

export interface ProgressiveSelectionState {
  currentLevel: RecognitionLevel;
  selections: Record<string, ProgressiveSelection>;
  isProgressive: boolean;
}

export interface ProgressiveSelectionContextValue {
  state: ProgressiveSelectionState;
  toggleProgressiveMode: () => void;
  setCurrentLevel: (level: RecognitionLevel) => void;
  selectUser: (userId: string, level: RecognitionLevel) => void;
  clearSelections: () => void;
} 