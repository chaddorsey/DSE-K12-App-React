import type { 
  QuestionResponse, 
  ResponseValue, 
  XYResponseValue, 
  MultipleChoiceResponseValue 
} from '../types/response';
import { ResponseValidationError } from './ResponseValidationError';

export class ResponseValidationService {
  validateResponse(response: Partial<QuestionResponse>): response is QuestionResponse {
    if (!this.validateRequiredFields(response)) {
      throw new ResponseValidationError(
        'Missing required fields',
        'response',
        'MISSING_REQUIRED_FIELDS',
        { missingFields: this.getMissingFields(response) }
      );
    }

    try {
      this.validateValue(response.value);
    } catch (error) {
      throw new ResponseValidationError(
        'Invalid response value',
        'value',
        'INVALID_VALUE',
        { originalError: error }
      );
    }

    try {
      this.validateMetadata(response.metadata);
    } catch (error) {
      throw new ResponseValidationError(
        'Invalid metadata',
        'metadata',
        'INVALID_METADATA',
        { originalError: error }
      );
    }

    return true;
  }

  private validateRequiredFields(response: Partial<QuestionResponse>): boolean {
    return !!(
      response.questionId?.trim() &&
      response.userId?.trim() &&
      response.value &&
      response.metadata
    );
  }

  private getMissingFields(response: Partial<QuestionResponse>): string[] {
    const required = ['questionId', 'userId', 'value', 'metadata'];
    return required.filter(field => !response[field]);
  }

  private validateValue(value: unknown): value is ResponseValue {
    if (!value || typeof value !== 'object' || !('type' in value)) {
      return false;
    }

    switch ((value as ResponseValue).type) {
      case 'XY':
        return this.validateXYValue(value as XYResponseValue);
      case 'MULTIPLE_CHOICE':
        return this.validateMultipleChoiceValue(value as MultipleChoiceResponseValue);
      default:
        return false;
    }
  }

  private validateXYValue(value: XYResponseValue): boolean {
    const { coordinates, interactions } = value;
    
    // Validate coordinates
    if (!coordinates || 
        typeof coordinates.x !== 'number' ||
        typeof coordinates.y !== 'number' ||
        coordinates.x < 0 || coordinates.x > 1 ||
        coordinates.y < 0 || coordinates.y > 1) {
      return false;
    }

    // Validate interactions if present
    if (interactions && Array.isArray(interactions)) {
      return interactions.every(interaction => 
        interaction.type === 'move' || interaction.type === 'click' &&
        typeof interaction.timestamp === 'number' &&
        this.validateCoordinates(interaction.position)
      );
    }

    return true;
  }

  private validateMultipleChoiceValue(value: MultipleChoiceResponseValue): boolean {
    return typeof value.selectedOption === 'string' && 
           value.selectedOption.trim().length > 0;
  }

  private validateMetadata(metadata: unknown): boolean {
    if (!metadata || typeof metadata !== 'object') {
      return false;
    }

    const m = metadata as QuestionResponse['metadata'];
    
    return (
      typeof m.timeToAnswer === 'number' &&
      m.timeToAnswer > 0 &&
      m.timeToAnswer < 300000 && // 5 minutes max
      typeof m.interactionCount === 'number' &&
      m.interactionCount >= 0 &&
      this.validateDevice(m.device)
    );
  }

  private validateDevice(device: unknown): boolean {
    if (!device || typeof device !== 'object') {
      return false;
    }

    const d = device as QuestionResponse['metadata']['device'];
    return (
      ['desktop', 'mobile', 'tablet'].includes(d.type) &&
      ['mouse', 'touch', 'keyboard'].includes(d.input)
    );
  }

  private validateCoordinates(pos: unknown): boolean {
    return !!(pos && 
      typeof pos === 'object' &&
      'x' in pos &&
      'y' in pos &&
      typeof pos.x === 'number' &&
      typeof pos.y === 'number' &&
      pos.x >= 0 && pos.x <= 1 &&
      pos.y >= 0 && pos.y <= 1
    );
  }
} 