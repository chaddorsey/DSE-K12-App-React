import { BaseQuestion, QuestionCategory } from './question';

export interface BaseSliderConfig {
  min: number;
  max: number;
  step?: number;
  labels?: {
    min?: string;
    max?: string;
    points?: Record<number, string>;
  };
}

export type SliderMode = 'continuous' | 'segmented';

export interface UnifiedSliderQuestion extends BaseQuestion {
  type: 'SLIDER';
  mode: SliderMode;
  config: BaseSliderConfig;
  segments?: Array<{
    value: number;
    label: string;
  }>;
}

export function validateSliderConfig(config: BaseSliderConfig): boolean {
  if (config.min >= config.max) {
    throw new Error('Min must be less than max');
  }
  
  if (config.step && config.step <= 0) {
    throw new Error('Step must be positive');
  }

  return true;
}

export function validateSliderQuestion(question: UnifiedSliderQuestion): boolean {
  validateSliderConfig(question.config);

  if (question.mode === 'segmented' && !question.segments?.length) {
    throw new Error('Segmented slider requires segments');
  }

  return true;
} 