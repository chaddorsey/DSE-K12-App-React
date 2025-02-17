import type { 
  Question,
  MultipleChoiceQuestion,
  OpenResponseQuestion,
  NumericQuestion,
  SliderQuestion,
  SegmentedSliderQuestion,
  XYContinuumQuestion
} from '../types/questions';

import type {
  QuestionResponse,
  MultipleChoiceResponse,
  XYContinuumResponse
} from '../types/responses';

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export const validateQuestion = (question: Question): void => {
  if (!question.id || !question.type || !question.prompt) {
    throw new ValidationError('Missing required base question fields');
  }

  switch (question.type) {
    case 'MULTIPLE_CHOICE':
      validateMultipleChoiceQuestion(question as MultipleChoiceQuestion);
      break;
    case 'XY_CONTINUUM':
      validateXYContinuumQuestion(question as XYContinuumQuestion);
      break;
    // Add other question types...
  }
};

export const validateResponse = (response: QuestionResponse): void => {
  if (!response.id || !response.userId || !response.questionId) {
    throw new ValidationError('Missing required base response fields');
  }

  switch (response.value.type) {
    case 'MULTIPLE_CHOICE':
      validateMultipleChoiceResponse(response as MultipleChoiceResponse);
      break;
    case 'XY_CONTINUUM':
      validateXYContinuumResponse(response as XYContinuumResponse);
      break;
    // Add other response types...
  }
};

// Question-specific validators
const validateMultipleChoiceQuestion = (question: MultipleChoiceQuestion): void => {
  if (!Array.isArray(question.options) || question.options.length === 0) {
    throw new ValidationError('Multiple choice question must have options');
  }
};

const validateXYContinuumQuestion = (question: XYContinuumQuestion): void => {
  if (!question.xAxis?.left || !question.xAxis?.right) {
    throw new ValidationError('XY question must have X-axis labels');
  }
  if (!question.yAxis?.top || !question.yAxis?.bottom) {
    throw new ValidationError('XY question must have Y-axis labels');
  }
  if (question.defaultPosition) {
    validateXYCoordinates(question.defaultPosition);
  }
};

// Response-specific validators
const validateMultipleChoiceResponse = (response: MultipleChoiceResponse): void => {
  if (!response.value.selectedOption) {
    throw new ValidationError('Multiple choice response must have a selected option');
  }
};

const validateXYContinuumResponse = (response: XYContinuumResponse): void => {
  if (!response.value.coordinates) {
    throw new ValidationError('XY response must have coordinates');
  }
  validateXYCoordinates(response.value.coordinates);
};

// Helper functions
const validateXYCoordinates = (coordinates: { x: number; y: number }): void => {
  if (coordinates.x < 0 || coordinates.x > 1 || coordinates.y < 0 || coordinates.y > 1) {
    throw new ValidationError('XY coordinates must be between 0 and 1');
  }
}; 