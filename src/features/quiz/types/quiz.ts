import type { 
  Question,
  QuestionResponse,
  MultipleChoiceQuestion,
  NumericQuestion 
} from '../../questions/types/questions';
import type { DelightFactor } from '../../questions/types/delightFactors';

export interface Quiz {
  id: string;
  targetUserId: string;
  questions: QuizQuestion[];
  createdAt: Date;
}

export type QuizQuestion = (
  | (MultipleChoiceQuestion & { correctAnswer: string })
  | (NumericQuestion & { correctAnswer: number })
) & {
  options: (string | number)[];
  delightFactor?: DelightFactor;
};

export interface QuizResponse extends QuestionResponse {
  isCorrect: boolean;
}

export interface QuizGenerator {
  generateQuiz(targetUserId: string): Quiz;
  generateDistractors(questionId: string, targetUserId: string): (string | number)[];
} 