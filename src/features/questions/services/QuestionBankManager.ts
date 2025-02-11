import type { Question, QuestionResponse, QuestionCategory } from '../types/question';

export class QuestionBankManager {
  private questions: Map<string, Question> = new Map();
  private categorizedQuestions: Map<QuestionCategory, Set<string>> = new Map();
  private responseValidators: Map<string, (response: any) => boolean> = new Map();

  constructor(questions: Question[]) {
    this.initializeQuestions(questions);
  }

  private initializeQuestions(questions: Question[]) {
    questions.forEach(question => {
      this.questions.set(question.id, question);
      
      // Initialize category sets
      if (!this.categorizedQuestions.has(question.category)) {
        this.categorizedQuestions.set(question.category, new Set());
      }
      this.categorizedQuestions.get(question.category)?.add(question.id);

      // Set up validators
      this.responseValidators.set(question.id, this.createValidator(question));
    });
  }

  private createValidator(question: Question): (response: any) => boolean {
    switch (question.type) {
      case 'MC':
        return (response: string | string[]) => {
          if (question.allowMultiple) {
            return Array.isArray(response) && 
              response.every(r => question.options.includes(r));
          }
          return typeof response === 'string' && 
            question.options.includes(response);
        };

      case 'NM':
        return (response: number) => {
          if (typeof response !== 'number') return false;
          if (question.min !== undefined && response < question.min) return false;
          if (question.max !== undefined && response > question.max) return false;
          return true;
        };

      case 'SCALE':
        return (response: number) => 
          typeof response === 'number' && 
          response >= question.min && 
          response <= question.max;

      case 'OP':
        return (response: string) => {
          if (typeof response !== 'string') return false;
          if (question.maxLength && response.length > question.maxLength) return false;
          if (question.format === 'email') {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(response);
          }
          if (question.format === 'url') {
            try {
              new URL(response);
              return true;
            } catch {
              return false;
            }
          }
          return true;
        };

      default:
        return () => true;
    }
  }

  getQuestion(id: string): Question | undefined {
    return this.questions.get(id);
  }

  getQuestionsByCategory(category: QuestionCategory): Question[] {
    const questionIds = this.categorizedQuestions.get(category) || new Set();
    return Array.from(questionIds)
      .map(id => this.questions.get(id))
      .filter((q): q is Question => q !== undefined);
  }

  validateResponse(questionId: string, response: any): boolean {
    const validator = this.responseValidators.get(questionId);
    return validator ? validator(response) : false;
  }

  getAllQuestions(): Question[] {
    return Array.from(this.questions.values());
  }
} 