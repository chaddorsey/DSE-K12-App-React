import { QuestionTypeString } from './questions';

export interface BaseDelightFactor {
  id: string;
  type: 'ANIMATION' | 'STATS' | 'ACHIEVEMENT' | 'NUMBER_ANIMATION';
  timing: 'PRE_ANSWER' | 'POST_ANSWER';
  trigger: 'IMMEDIATE' | 'DELAYED' | 'ON_CORRECT' | 'ON_INCORRECT';
  questionTypes: QuestionTypeString[];
}

export interface BaseDelightFactorContent {
  duration: number;
}

export interface AnimationContent extends BaseDelightFactorContent {
  animation: string;
  customParams?: Record<string, unknown>;
}

export interface StatsContent extends BaseDelightFactorContent {
  statType: 'PERCENTAGE' | 'COUNT' | 'AVERAGE';
  value: number;
  message: string;
}

export interface NumberAnimationContent extends BaseDelightFactorContent {
  number: number;
  color: string;
}

export interface AnimationDelightFactor extends BaseDelightFactor {
  type: 'ANIMATION';
  content: AnimationContent;
}

export interface StatsDelightFactor extends BaseDelightFactor {
  type: 'STATS';
  content: StatsContent;
}

export interface NumberAnimationDelightFactor extends BaseDelightFactor {
  type: 'NUMBER_ANIMATION';
  content: NumberAnimationContent;
}

export type DelightFactor = 
  | AnimationDelightFactor 
  | StatsDelightFactor 
  | NumberAnimationDelightFactor; 