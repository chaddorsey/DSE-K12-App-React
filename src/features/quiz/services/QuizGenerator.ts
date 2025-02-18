import { v4 as uuidv4 } from 'uuid';
import type { Question, QuestionResponse } from '../../questions/types/questions';
import type { Quiz, QuizQuestion } from '../types/quiz';
import { logger } from '../../../utils/logger';

export class QuizGenerator {
  constructor(
    private questions: Question[],
    private responses: QuestionResponse[]
  ) {}

  generateQuiz(targetUserId: string): Quiz {
    logger.debug('Generating quiz for user:', targetUserId);

    // Get questions the target user has answered
    const answeredQuestionIds = new Set(
      this.responses
        .filter(r => r.userId === targetUserId)
        .map(r => r.questionId)
    );

    // Filter questions to only those answered by target
    const availableQuestions = this.questions.filter(q => 
      answeredQuestionIds.has(q.id)
    );

    // Transform questions into quiz questions with options
    const quizQuestions = availableQuestions.map(question => {
      const targetResponse = this.responses.find(
        r => r.userId === targetUserId && r.questionId === question.id
      );

      if (!targetResponse) {
        throw new Error(`No response found for question ${question.id}`);
      }

      const distractors = this.generateDistractors(question.id, targetUserId);
      const correctAnswer = this.getResponseValue(targetResponse);
      
      // Combine correct answer with distractors and sort
      const options = [...distractors, correctAnswer].sort((a, b) => {
        if (typeof a === 'number' && typeof b === 'number') {
          return a - b;
        }
        return String(a).localeCompare(String(b));
      });

      return {
        ...question,
        options,
        correctAnswer
      };
    });

    return {
      id: uuidv4(),
      targetUserId,
      questions: quizQuestions,
      createdAt: new Date()
    };
  }

  generateDistractors(questionId: string, targetUserId: string): (string | number)[] {
    const question = this.questions.find(q => q.id === questionId);
    const targetResponse = this.responses.find(
      r => r.userId === targetUserId && r.questionId === questionId
    );

    if (!question || !targetResponse) {
      throw new Error(`Question or response not found: ${questionId}`);
    }

    const targetValue = this.getResponseValue(targetResponse);

    switch (question.type) {
      case 'MC': {
        // For MC, use standard distractors if available
        const availableDistractors = question.standardDistractors || 
          question.options.filter(opt => opt !== targetValue);
        return this.selectRandomItems(availableDistractors, 2);
      }

      case 'NM': {
        // For numeric, use other users' responses as distractors
        const otherResponses = this.responses
          .filter(r => 
            r.questionId === questionId && 
            r.userId !== targetUserId &&
            r.value.type === 'NM'
          )
          .map(r => r.value.number);

        if (otherResponses.length < 2) {
          // If not enough responses, generate reasonable numbers within range
          const range = question.max - question.min;
          const step = question.step || 1;
          const generated = new Set<number>();
          while (generated.size < 2) {
            const value = Math.round((Math.random() * range + question.min) / step) * step;
            if (value !== targetValue) {
              generated.add(value);
            }
          }
          return Array.from(generated);
        }

        return this.selectRandomItems(
          otherResponses.filter(n => n !== targetValue),
          2
        );
      }

      default:
        throw new Error(`Unsupported question type: ${question.type}`);
    }
  }

  private getResponseValue(response: QuestionResponse): string | number {
    switch (response.value.type) {
      case 'MC':
        return response.value.selectedOption;
      case 'NM':
        return response.value.number;
      default:
        throw new Error(`Unsupported response type: ${response.value.type}`);
    }
  }

  private selectRandomItems<T>(items: T[], count: number): T[] {
    const shuffled = [...items].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }
} 