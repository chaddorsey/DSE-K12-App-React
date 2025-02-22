import { Question, QuestionType } from '../types/questions';
import { MultipleChoiceQuestionComponent } from '../components/MultipleChoiceQuestion';
import { NumericQuestionComponent } from '../components/NumericQuestion';
import { OpenResponseQuestionComponent } from '../components/OpenResponseQuestion';
import { SliderQuestionComponent } from '../components/SliderQuestion';
import { SegmentedSliderQuestionComponent } from '../components/SegmentedSliderQuestion';
import { XYContinuumQuestionComponent } from '../components/XYContinuumQuestion';

export class QuestionFactory {
  createQuestionComponent(question: Question) {
    switch (question.type) {
      case QuestionType.MC:
        return MultipleChoiceQuestionComponent;
      
      case QuestionType.NM:
        return NumericQuestionComponent;
      
      case QuestionType.OP:
        return OpenResponseQuestionComponent;
      
      case QuestionType.SLIDER:
        return SliderQuestionComponent;
      
      case QuestionType.SEGMENTED:
        return SegmentedSliderQuestionComponent;
      
      case QuestionType.XY:
        return XYContinuumQuestionComponent;
      
      default:
        throw new Error('Unknown question type');
    }
  }
} 