import { BaseQuestion, QuestionCategory } from './question';

export interface AxisConfig {
  min: number;
  max: number;
  questionId?: string;
  labels: {
    min: string;
    max: string;
  };
}

export interface XYConfig {
  xAxis: AxisConfig;
  yAxis: AxisConfig;
}

export interface XYQuestion extends BaseQuestion {
  type: 'XY';
  config: XYConfig;
  hintStrategy?: 'quadrant' | 'distance';
  tolerance?: number;
}

export function validateAxisConfig(config: AxisConfig, axisName: 'X-axis' | 'Y-axis'): boolean {
  if (config.min >= config.max) {
    throw new Error(`${axisName} min must be less than max`);
  }

  if (!config.labels?.min || !config.labels?.max) {
    throw new Error(`${axisName} requires min and max labels`);
  }

  return true;
}

export function validateXYConfig(config: XYConfig): boolean {
  validateAxisConfig(config.xAxis, 'X-axis');
  validateAxisConfig(config.yAxis, 'Y-axis');
  return true;
}

export function validateXYQuestion(question: XYQuestion): boolean {
  validateXYConfig(question.config);
  
  if (question.tolerance && (question.tolerance <= 0 || question.tolerance > 1)) {
    throw new Error('Tolerance must be between 0 and 1');
  }

  return true;
} 