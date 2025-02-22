import { QuestionType, QuizQuestion } from '../../questions/types/questions';
import { MultipleChoiceQuizQuestion } from '../components/MultipleChoiceQuizQuestion';
import { SliderQuizQuestion } from '../components/SliderQuizQuestion';
import { XYContinuumQuizQuestion } from '../components/XYContinuumQuizQuestion';
import { OpenResponseQuizQuestion } from '../components/OpenResponseQuizQuestion';
import { NumericQuizQuestion } from '../components/NumericQuizQuestion';
import { logger } from '@/utils/logger';

export class QuizQuestionFactory {
  createQuestionComponent(question: QuizQuestion): React.ComponentType<any> {
    logger.debug('Creating question component:', { type: question.type });

    switch (question.type) {
      case QuestionType.MC:
        return MultipleChoiceQuizQuestion;
      case QuestionType.OP:
        return OpenResponseQuizQuestion;
      case QuestionType.NM:
        return NumericQuizQuestion;
      case QuestionType.SLIDER:
        return SliderQuizQuestion;
      case QuestionType.XY:
        return XYContinuumQuizQuestion;
      default:
        logger.error('Unsupported question type:', question.type);
        throw new Error(`Unsupported question type: ${question.type}`);
    }
  }
} 