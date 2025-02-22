import { collection, query, where, getDocs, doc, setDoc } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { 
  Question,
  QuestionType,
  QuestionCategory,
  QuestionContext,
  QuizQuestion,
  QuizResponse
} from '../types/questions';
import { QuestionService } from './QuestionService';
import { logger } from '@/utils/logger';

interface Quiz {
  id: string;
  userId: string;
  targetUserId: string;
  questions: QuizQuestion[];
  context: QuestionContext.QUIZ;
  startedAt: string;
  completedAt?: string;
  score?: number;
}

export class QuizService {
  private readonly COLLECTION = 'quizzes';
  private readonly RESPONSES_COLLECTION = 'quiz_responses';

  constructor(
    private readonly questionService: QuestionService
  ) {}

  async generateQuiz(userId: string, targetUserId: string): Promise<Quiz> {
    try {
      // Get questions from each category
      const [preferences, skills] = await Promise.all([
        this.questionService.getQuestionsByCategory(QuestionCategory.PREFERENCES),
        this.questionService.getQuestionsByCategory(QuestionCategory.SKILLS)
      ]);

      // Transform into quiz questions with correct answers
      const quizQuestions = [...preferences, ...skills].map(q => ({
        ...q,
        correctAnswer: this.generateCorrectAnswer(q),
        distractors: this.generateDistractors(q)
      }));

      const quiz: Quiz = {
        id: doc(collection(db, this.COLLECTION)).id,
        userId,
        targetUserId,
        questions: quizQuestions,
        context: QuestionContext.QUIZ,
        startedAt: new Date().toISOString()
      };

      await setDoc(doc(db, this.COLLECTION, quiz.id), quiz);
      return quiz;
    } catch (error) {
      logger.error('Error generating quiz:', error);
      throw error;
    }
  }

  async submitQuizResponse(response: QuizResponse): Promise<QuizResponse> {
    try {
      const question = await this.questionService.getQuestionById(response.questionId);
      if (!question) {
        throw new Error('Question not found');
      }

      const scored = this.scoreResponse(response, question as QuizQuestion);
      const docRef = doc(collection(db, this.RESPONSES_COLLECTION));

      await setDoc(docRef, {
        ...scored,
        timestamp: new Date()
      });

      return {
        ...scored,
        id: docRef.id
      };
    } catch (error) {
      logger.error('Error submitting quiz response:', error);
      throw error;
    }
  }

  private generateCorrectAnswer(question: Question): string {
    switch (question.type) {
      case QuestionType.MC:
        return question.options[0]; // First option is correct for demo
      case QuestionType.SLIDER:
        return '50'; // Middle value for demo
      case QuestionType.XY:
        return JSON.stringify({ x: 0.5, y: 0.5 }); // Center point for demo
      default:
        return '';
    }
  }

  private generateDistractors(question: Question): string[] {
    if (question.type === QuestionType.MC) {
      return question.options.slice(1); // All options except first
    }
    return [];
  }

  private scoreResponse(response: QuizResponse, question: QuizQuestion): QuizResponse {
    const isCorrect = this.checkAnswer(response.value, question.correctAnswer);
    const points = isCorrect ? this.calculatePoints(response.metadata.timeToAnswer) : 0;

    return {
      ...response,
      isCorrect,
      points
    };
  }

  private checkAnswer(value: any, correctAnswer: string): boolean {
    if (typeof value === 'object' && value.selectedOption) {
      return value.selectedOption === correctAnswer;
    }
    return String(value) === correctAnswer;
  }

  private calculatePoints(timeToAnswer: number): number {
    // Base points for correct answer
    const basePoints = 100;
    
    // Time bonus: faster answers get more points
    const timeBonus = Math.max(0, 50 - Math.floor(timeToAnswer / 1000));
    
    return basePoints + timeBonus;
  }
} 