import type { Question, QuestionType, QuestionCategory } from '../types';
import { questionStore } from '../../../data/questions';
import { generateTestQuestions } from '../../../data/questions/generateTestData';
import { questionConfig } from '../../../config/questions';
import { ensureQuestionFields } from '../utils/questionUtils';

export class QuestionBankManager {
  private questions: Question[];
  private categorizedQuestions: Map<QuestionCategory, Set<string>> = new Map();
  private responseValidators: Map<string, (response: any) => boolean> = new Map();

  constructor(initialQuestions: QuestionType[]) {
    console.log('QuestionBankManager constructor:', {
      initialQuestionsLength: initialQuestions.length,
      initialQuestions
    });
    this.questions = []; // Initialize empty array first
    this.initializeQuestions(initialQuestions.map(ensureQuestionFields));
  }

  private initializeQuestions(questions: Question[]) {
    console.log('QuestionBankManager initializing with:', {
      questionsLength: questions.length,
      questions
    });
    this.questions = questions;
    
    questions.forEach(question => {
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
        return (response: any) => {
          const numValue = typeof response === 'string' ? parseInt(response, 10) : response;
          if (typeof numValue !== 'number' || isNaN(numValue)) return false;
          if (question.min !== undefined && numValue < question.min) return false;
          if (question.max !== undefined && numValue > question.max) return false;
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
    return this.questions.find(q => q.id === id);
  }

  getQuestionsByCategory(category: QuestionCategory): Question[] {
    const questionIds = this.categorizedQuestions.get(category) || new Set();
    return this.questions.filter(q => questionIds.has(q.id));
  }

  validateResponse(questionId: string, response: any): boolean {
    const validator = this.responseValidators.get(questionId);
    return validator ? validator(response) : false;
  }

  getAllQuestions(): Question[] {
    console.log('getAllQuestions returning:', {
      questionsLength: this.questions.length,
      questions: this.questions
    });
    return this.questions;
  }
} 