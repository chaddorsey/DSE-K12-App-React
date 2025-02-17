import React, { useState, useEffect, useCallback } from 'react';
import { MultipleChoiceQuestionComponent } from './MultipleChoiceQuestion';
import { OpenResponseQuestionComponent } from './OpenResponseQuestion';
import { NumericQuestionComponent } from './NumericQuestion';
import { SliderQuestionComponent } from './SliderQuestion';
import { DelightFactor } from './DelightFactor/DelightFactor';
import { QuestionProvider, useQuestionContext } from '../context/QuestionContext';
import { OnboardingProvider, useOnboardingContext } from '../../onboarding/OnboardingProvider';
import { QuizProvider, useQuizContext } from '../context/QuizContext';
import type { 
  Question,
  QuestionResponse,
  QuizResponse,
  QuizQuestion,
  MultipleChoiceQuestion,
  OpenResponseQuestion,
  NumericQuestion,
  SliderQuestion,
  SegmentedSliderQuestion,
  XYContinuumQuestion,
  QuestionCategory,
  QuestionTypeString,
  QuestionContextValue
} from '../types/questions';
import './QuestionPlayground.css';
import { MockDataProvider } from '../../../mocks/MockDataProvider.prod';
import { XYContinuumQuestionComponent } from './XYContinuumQuestion';
import type { DelightFactor as DelightFactorType } from '../types/delightFactors';
import { SegmentedSliderQuestionComponent } from './SegmentedSliderQuestion';
import { AccessibilityProvider } from '../../accessibility/context/AccessibilityContext';
import { SessionService } from '../services/SessionService';
import { ResponseService } from '../services/ResponseService';
import { db } from '../../../config/firebase';
import { logger } from '../../../utils/logger';

const standardQuestions: Question[] = [
  {
    id: 'std1',
    type: 'MC',
    prompt: 'What brings you here today?',
    options: ['Learning', 'Career Growth', 'Curiosity', 'Other'],
    text: 'What brings you here today?',
    label: '',
    category: 'GENERAL',
    number: 1,
    requiredForOnboarding: true,
    includeInOnboarding: true
  },
  {
    id: 'std2',
    type: 'OP',
    prompt: 'What are your main goals?',
    maxLength: 500,
    text: 'What are your main goals?',
    label: '',
    category: 'PREFERENCES',
    number: 1,
    requiredForOnboarding: false,
    includeInOnboarding: false
  },
  {
    id: 'std3',
    type: 'NM',
    prompt: 'Years of experience?',
    min: 0,
    max: 50,
    step: 1,
    text: 'Years of experience?',
    label: '',
    category: 'PREFERENCES',
    number: 1,
    requiredForOnboarding: false,
    includeInOnboarding: false
  },
  {
    id: 'std4',
    type: 'MC',
    prompt: 'Preferred learning style?',
    options: ['Visual', 'Audio', 'Reading', 'Hands-on'],
    text: 'Preferred learning style?',
    label: '',
    category: 'PREFERENCES',
    number: 1,
    requiredForOnboarding: false,
    includeInOnboarding: false
  },
  {
    id: 'std5',
    type: 'SCALE',
    prompt: 'How do you prefer to balance theory and practice?',
    leftOption: 'Pure Theory',
    rightOption: 'Pure Practice',
    defaultValue: 0.5,
    text: 'How do you prefer to balance theory and practice?',
    label: '',
    category: 'PREFERENCES',
    number: 1,
    requiredForOnboarding: false,
    includeInOnboarding: false
  },
  {
    id: 'std6',
    type: 'SEGMENTED_SLIDER',
    prompt: 'How comfortable are you with public speaking?',
    segments: [
      { value: 1, label: 'Very Uncomfortable' },
      { value: 2, label: 'Uncomfortable' },
      { value: 3, label: 'Neutral' },
      { value: 4, label: 'Comfortable' },
      { value: 5, label: 'Very Comfortable' }
    ],
    defaultSegment: 3,
    text: 'How comfortable are you with public speaking?',
    label: '',
    category: 'PREFERENCES',
    number: 1,
    requiredForOnboarding: false,
    includeInOnboarding: false
  },
  {
    id: 'std7',
    type: 'XY_CONTINUUM',
    prompt: 'Plot your learning style preferences:',
    xAxis: {
      left: 'Theory',
      right: 'Practice'
    },
    yAxis: {
      top: 'Individual',
      bottom: 'Group'
    },
    defaultPosition: { x: 0.5, y: 0.5 },
    text: 'Plot your learning style preferences:',
    label: '',
    category: 'PREFERENCES',
    number: 1,
    requiredForOnboarding: false,
    includeInOnboarding: false
  }
];

const questionPool: Question[] = [
  {
    id: 'pool1',
    type: 'MC',
    prompt: 'What brings you here today?',
    options: ['Learning', 'Career Growth', 'Curiosity', 'Other'],
    text: 'What brings you here today?',
    label: '',
    category: 'GENERAL',
    number: 1,
    requiredForOnboarding: false,
    includeInOnboarding: false
  },
  {
    id: 'pool2',
    type: 'OP',
    prompt: 'What specific topics interest you?',
    maxLength: 300,
    text: 'What specific topics interest you?',
    label: '',
    category: 'PREFERENCES',
    number: 1,
    requiredForOnboarding: false,
    includeInOnboarding: false
  },
  {
    id: 'pool3',
    type: 'NM',
    prompt: 'Hours per week available for learning?',
    min: 1,
    max: 40,
    step: 1,
    text: 'Hours per week available for learning?',
    label: '',
    category: 'PREFERENCES',
    number: 1,
    requiredForOnboarding: false,
    includeInOnboarding: false
  },
  {
    id: 'pool4',
    type: 'SCALE',
    prompt: 'What mix of individual vs group work do you prefer?',
    leftOption: 'Individual',
    rightOption: 'Group',
    defaultValue: 0.5,
    text: 'What mix of individual vs group work do you prefer?',
    label: '',
    category: 'PREFERENCES',
    number: 1,
    requiredForOnboarding: false,
    includeInOnboarding: false
  },
  {
    id: 'pool5',
    type: 'SEGMENTED_SLIDER',
    prompt: 'Rate your programming experience level:',
    segments: [
      { value: 1, label: 'Beginner' },
      { value: 2, label: 'Intermediate' },
      { value: 3, label: 'Advanced' },
      { value: 4, label: 'Expert' },
      { value: 5, label: 'Master' }
    ],
    defaultSegment: 3,
    text: 'Rate your programming experience level:',
    label: '',
    category: 'PREFERENCES',
    number: 1,
    requiredForOnboarding: false,
    includeInOnboarding: false
  }
];

const mockQuizQuestions: QuizQuestion[] = [
  {
    id: 'quiz1',
    type: 'MC',
    prompt: 'What is John\'s favorite color?',
    options: ['Red', 'Blue', 'Green', 'Yellow'],
    correctAnswer: 'Blue',
    distractors: ['Red', 'Green', 'Yellow'],
    text: 'What is John\'s favorite color?',
    label: '',
    category: 'PREFERENCES',
    number: 1,
    requiredForOnboarding: false,
    includeInOnboarding: false
  },
  {
    id: 'quiz3',
    type: 'SCALE',
    prompt: 'What is John\'s preferred balance of coding vs architecture?',
    leftOption: 'Pure Coding',
    rightOption: 'Pure Architecture',
    defaultValue: 0.5,
    correctAnswer: '0.7', // 70% architecture, 30% coding
    distractors: ['0.3', '0.5', '0.9'],
    text: 'What is John\'s preferred balance of coding vs architecture?',
    label: '',
    category: 'PREFERENCES',
    number: 1,
    requiredForOnboarding: false,
    includeInOnboarding: false
  },
  {
    id: 'quiz2',
    type: 'MC',
    prompt: 'How does John prefer to learn?',
    options: ['Visual', 'Audio', 'Reading', 'Hands-on'],
    correctAnswer: 'Visual',
    distractors: ['Audio', 'Reading', 'Hands-on'],
    text: 'How does John prefer to learn?',
    label: '',
    category: 'PREFERENCES',
    number: 1,
    requiredForOnboarding: false,
    includeInOnboarding: false
  },
  {
    id: 'quiz4',
    type: 'SEGMENTED_SLIDER',
    prompt: 'What is John\'s self-rated expertise in React?',
    segments: [
      { value: 1, label: 'Beginner' },
      { value: 2, label: 'Intermediate' },
      { value: 3, label: 'Advanced' },
      { value: 4, label: 'Expert' },
      { value: 5, label: 'Master' }
    ],
    defaultSegment: 3,
    correctAnswer: '4', // Expert level
    distractors: ['2', '3', '5'],
    text: 'What is John\'s self-rated expertise in React?',
    label: '',
    category: 'PREFERENCES',
    number: 1,
    requiredForOnboarding: false,
    includeInOnboarding: false
  },
  {
    id: 'quiz5',
    type: 'XY_CONTINUUM',
    prompt: 'Where did John plot his work preferences?',
    xAxis: {
      left: 'Process-Oriented',
      right: 'Results-Oriented'
    },
    yAxis: {
      top: 'Independent',
      bottom: 'Collaborative'
    },
    correctAnswer: '0.25,0.25', // Center of Process-oriented & Independent quadrant
    distractors: ['0.75,0.25', '0.75,0.75', '0.25,0.75'],
    text: 'Where did John plot his work preferences?',
    label: '',
    category: 'PREFERENCES',
    number: 1,
    requiredForOnboarding: false,
    includeInOnboarding: false
  },
  {
    id: 'quiz6',
    type: 'XY_CONTINUUM',
    prompt: 'Where did John plot his work preferences?',
    xAxis: {
      left: 'Process-Oriented',
      right: 'Results-Oriented'
    },
    yAxis: {
      top: 'Independent',
      bottom: 'Collaborative'
    },
    correctAnswer: '0.375,0.375', // On the boundary of a centered square
    distractors: ['0.625,0.375', '0.375,0.625', '0.625,0.625'],
    text: 'Where did John plot his work preferences?',
    label: '',
    category: 'PREFERENCES',
    number: 1,
    requiredForOnboarding: false,
    includeInOnboarding: false
  }
];

// Add type guard function at the top of the file
function isQuestionType(type: unknown): type is QuestionTypeString {
  return typeof type === 'string' && [
    'MC', 'OP', 'NM', 'SCALE', 'SEGMENTED_SLIDER', 'XY_CONTINUUM'
  ].includes(type as string);
}

const OnboardingFlow = () => {
  // All hooks at the top
  const { state: onboardingState, actions: onboardingActions } = useOnboardingContext();
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [guessCount, setGuessCount] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // All callbacks defined together
  const handleAnswer = useCallback((response: QuestionResponse) => {
    if (!currentQuestion) return;
    
    if (currentQuestion.type === 'MC' && 'selectedOption' in response.value) {
      const mcQuestion = currentQuestion as MultipleChoiceQuestion;
      setIsCorrect(response.value.selectedOption === mcQuestion.correctAnswer);
    }
    
    onboardingActions.handleResponse(response);
    setHasAnswered(true);
    setGuessCount(prev => prev + 1);
  }, [currentQuestion, onboardingActions]);

  const handleNext = useCallback(() => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    onboardingActions.advanceToNext();

    // Use RAF to ensure smooth transition
    requestAnimationFrame(() => {
      setHasAnswered(false);
      setIsCorrect(false);
      setGuessCount(0);
      setIsTransitioning(false);
    });
  }, [onboardingActions, isTransitioning]);

  // Effects
  useEffect(() => {
    if (onboardingState.selectedQuestions.length > 0) {
      const question = onboardingState.selectedQuestions[onboardingState.currentQuestionIndex];
      setCurrentQuestion(question);
    }
  }, [onboardingState.selectedQuestions, onboardingState.currentQuestionIndex]);

  const isLastQuestion = onboardingState.currentQuestionIndex === onboardingState.selectedQuestions.length - 1;

  if (!onboardingState.selectedQuestions.length) {
    return <div>Initializing question sequence...</div>;
  }

  if (!currentQuestion) {
    return <div>Loading current question...</div>;
  }

  return (
    <div className="onboarding-flow">
      {(() => {
        switch (currentQuestion.type) {
          case 'MC':
            return (
              <MultipleChoiceQuestionComponent
                question={currentQuestion as MultipleChoiceQuestion}
                onAnswer={handleAnswer}
                disabled={hasAnswered || isTransitioning}
              />
            );
          case 'SCALE':
            return (
              <SliderQuestionComponent
                question={currentQuestion as SliderQuestion}
                onAnswer={handleAnswer}
              />
            );
          case 'OP':
            return (
              <OpenResponseQuestionComponent
                question={currentQuestion as OpenResponseQuestion}
                onAnswer={handleAnswer}
              />
            );
          case 'NM':
            return (
              <NumericQuestionComponent
                question={currentQuestion as NumericQuestion}
                onAnswer={handleAnswer}
              />
            );
          case 'XY_CONTINUUM':
            return (
              <XYContinuumQuestionComponent
                question={currentQuestion as XYContinuumQuestion}
                onAnswer={handleAnswer}
              />
            );
          case 'SEGMENTED_SLIDER':
            return (
              <SegmentedSliderQuestionComponent
                question={currentQuestion as SegmentedSliderQuestion}
                onAnswer={handleAnswer}
              />
            );
          default:
            return null;
        }
      })()}
      {hasAnswered && !onboardingState.completed && !isTransitioning && (
        <button 
          onClick={handleNext}
          className="next-button"
          disabled={
            isTransitioning || 
            (currentQuestion.type === 'XY_CONTINUUM' && !isCorrect && guessCount < 2)
          }
        >
          {isLastQuestion ? 'Complete' : 'Next Question'}
        </button>
      )}
    </div>
  );
};

const ContextControls = () => {
  const { state, actions } = useQuestionContext();
  const { state: onboardingState, actions: onboardingActions } = useOnboardingContext();
  const { state: quizState, actions: quizActions } = useQuizContext();
  const [isSessionActive, setIsSessionActive] = useState(false);
  
  const handleExperienceChange = (experience: QuestionContextValue['experience']) => {
    actions.setExperience(experience);
    
    if (experience === 'ONBOARDING') {
      logger.debug('Initializing onboarding experience');
      onboardingActions.initializeSequence();
    }
  };

  const handleModeChange = (mode: NonNullable<QuestionContextValue['mode']>) => {
    if (isSessionActive) return;
    actions.setMode(mode);
  };

  useEffect(() => {
    // Session is active if onboarding has questions or quiz is initialized
    setIsSessionActive(
      (state.experience === 'ONBOARDING' && onboardingState.selectedQuestions.length > 0) ||
      (state.experience === 'QUIZ' && quizState.questions.length > 0)
    );
  }, [state.experience, onboardingState.selectedQuestions, quizState.questions]);

  return (
    <div className="context-controls-wrapper">
      <div className="context-controls">
        <div className="control-group">
          <label>
            Experience:
            <select 
              value={state.experience}
              onChange={(e) => handleExperienceChange(e.target.value as any)}
              disabled={isSessionActive}
            >
              <option value="ONBOARDING">Onboarding</option>
              <option value="QUIZ">Quiz</option>
              <option value="HEAD_TO_HEAD">Head to Head</option>
            </select>
          </label>
        </div>

        <div className="control-group">
          <label>
            Mode:
            <select 
              value={state.mode}
              onChange={(e) => handleModeChange(e.target.value as any)}
              disabled={isSessionActive}
            >
              <option value="PRACTICE">Practice</option>
              <option value="COMPETITION">Competition</option>
            </select>
          </label>
        </div>

        {state.experience === 'QUIZ' && !isSessionActive && (
          <button 
            onClick={() => quizActions.initializeQuiz('user1', mockQuizQuestions)}
            className="start-button"
          >
            Start Quiz
          </button>
        )}
      </div>
    </div>
  );
};

const QuizFlow = () => {
  const { state, actions } = useQuizContext();
  const [currentDelight, setCurrentDelight] = useState<DelightFactorType | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [guessCount, setGuessCount] = useState(0);

  const handleAnswer = useCallback((response: QuestionResponse) => {
    const currentQuestion = state.questions[state.currentQuestionIndex];
    
    if (!response.value) {
      console.error('Response value is undefined');
      return;
    }

    // Type guard for response value based on question type
    const normalizedValue = (() => {
      switch (currentQuestion.type) {
        case 'MC':
          if ('selectedOption' in response.value) {
            return {
              type: 'MC' as const,
              selectedOption: response.value.selectedOption
            };
          }
          break;
        case 'SCALE':
          if ('position' in response.value) {
            return {
              type: 'SCALE' as const,
              position: response.value.position
            };
          }
          break;
        case 'XY_CONTINUUM':
          if ('coordinates' in response.value) {
            return {
              type: 'XY_CONTINUUM' as const,
              coordinates: response.value.coordinates
            };
          }
          break;
        case 'SEGMENTED_SLIDER':
          if ('segment' in response.value) {
            return {
              type: 'SEGMENTED_SLIDER' as const,
              segment: response.value.segment
            };
          }
          break;
      }
      throw new Error(`Invalid response value for question type ${currentQuestion.type}`);
    })();

    const normalizedResponse: QuizResponse = {
      id: response.id,
      userId: response.userId,
      questionId: response.questionId,
      timestamp: response.timestamp,
      value: normalizedValue,
      correct: false,
      metadata: {
        ...response.metadata,
        confidence: 0
      }
    };

    // Validate answer based on question type
    let correct = false;
    switch (currentQuestion.type) {
      case 'SCALE':
        if (normalizedValue.type === 'SCALE' && normalizedValue.position !== undefined) {
          const submittedPosition = normalizedValue.position;
          const targetPosition = parseFloat(currentQuestion.correctAnswer);
          correct = Math.abs(submittedPosition - targetPosition) <= 0.1;
        }
        break;
      case 'XY_CONTINUUM':
        if (normalizedValue.type === 'XY_CONTINUUM' && normalizedValue.coordinates) {
          const coords = normalizedValue.coordinates;
          const [correctX, correctY] = currentQuestion.correctAnswer.split(',').map(Number);
          correct = 
            Math.abs(coords.x - correctX) <= 0.1 &&
            Math.abs(coords.y - correctY) <= 0.1;
        }
        break;
      case 'SEGMENTED_SLIDER':
        if (normalizedValue.type === 'SEGMENTED_SLIDER' && normalizedValue.segment !== undefined) {
          correct = normalizedValue.segment.toString() === currentQuestion.correctAnswer;
        }
        break;
      case 'MC':
        if (normalizedValue.type === 'MC') {
          correct = normalizedValue.selectedOption === currentQuestion.correctAnswer;
        }
        break;
    }

    normalizedResponse.correct = correct;
    actions.submitAnswer(normalizedResponse);
    setHasAnswered(true);
    setIsCorrect(correct);

    // Show confetti for all correct answers
    if (correct) {
      setCurrentDelight({
        id: 'confetti',
        type: 'ANIMATION',
        timing: 'POST_ANSWER',
        trigger: 'IMMEDIATE',
        content: {
          animation: 'confetti',
          duration: 2000,
          customParams: {
            type: 'CELEBRATION'
          }
        },
        questionTypes: ['MC', 'SCALE', 'XY_CONTINUUM', 'NM', 'SEGMENTED_SLIDER']
      });
    }
  }, [state.currentQuestionIndex, state.questions, state.responses, actions]);

  const handleNext = useCallback(() => {
    actions.advanceToNext();
    setHasAnswered(false);
    setCurrentDelight(null);
    setIsCorrect(false);
    setGuessCount(0);
  }, [actions]);

  const renderCurrentQuestion = () => {
    const currentQuestion = state.questions[state.currentQuestionIndex] as Question;
    if (!currentQuestion) return null;

    const renderQuestionContent = () => {
      // Type guard to check if it's a valid question type
      if (!isQuestionType(currentQuestion.type)) {
        return null;  // Just return null, no logging needed here
      }

      switch (currentQuestion.type) {
        case 'MC':
          const lastResponse = state.responses[state.responses.length - 1];
          return (
            <MultipleChoiceQuestionComponent
              question={{
                ...currentQuestion,
                type: 'MC' as const,
                text: currentQuestion.prompt,
                label: '',
                category: 'PREFERENCES' as QuestionCategory,
                number: 1,
                requiredForOnboarding: false,
                includeInOnboarding: false,
                options: currentQuestion.options || []
              }}
              onAnswer={handleAnswer}
              correctAnswer={hasAnswered ? currentQuestion.correctAnswer : undefined}
              selected={lastResponse?.value.selectedOption}
              disabled={hasAnswered}
            />
          );
        case 'SCALE':
          return (
            <SliderQuestionComponent
              question={{
                ...currentQuestion,
                type: 'SCALE' as const,
                text: currentQuestion.prompt,
                label: '',
                category: 'PREFERENCES' as QuestionCategory,
                number: 1,
                requiredForOnboarding: false,
                includeInOnboarding: false
              }}
              onAnswer={handleAnswer}
              correctAnswer={hasAnswered ? currentQuestion.correctAnswer : undefined}
              disabled={hasAnswered}
            />
          );
        case 'SEGMENTED_SLIDER':
          if (!currentQuestion.segments) return null;
          return (
            <SegmentedSliderQuestionComponent
              question={{
                ...currentQuestion,
                type: 'SEGMENTED_SLIDER' as const,
                text: currentQuestion.prompt,
                label: '',
                category: 'PREFERENCES' as QuestionCategory,
                number: 1,
                requiredForOnboarding: false,
                includeInOnboarding: false,
                segments: currentQuestion.segments
              }}
              onAnswer={handleAnswer}
              correctAnswer={hasAnswered ? currentQuestion.correctAnswer : undefined}
              disabled={hasAnswered}
            />
          );
        case 'XY_CONTINUUM':
          if (!currentQuestion.xAxis || !currentQuestion.yAxis) return null;
          return (
            <XYContinuumQuestionComponent
              question={{
                ...currentQuestion,
                type: 'XY_CONTINUUM' as const,
                text: currentQuestion.prompt,
                label: '',
                category: 'PREFERENCES' as QuestionCategory,
                number: 1,
                requiredForOnboarding: false,
                includeInOnboarding: false,
                xAxis: currentQuestion.xAxis,
                yAxis: currentQuestion.yAxis
              }}
              onAnswer={handleAnswer}
              correctAnswer={currentQuestion.correctAnswer}
              disabled={hasAnswered}
              mode="QUIZ"
            />
          );
        case 'OP':
          return (
            <OpenResponseQuestionComponent
              question={{
                ...currentQuestion,
                type: 'OP' as const,
                text: currentQuestion.prompt,
                label: '',
                category: 'PREFERENCES' as QuestionCategory,
                number: 1,
                requiredForOnboarding: false,
                includeInOnboarding: false,
                maxLength: currentQuestion.maxLength || 500
              }}
              onAnswer={handleAnswer}
            />
          );
        case 'NM':
          return (
            <NumericQuestionComponent
              question={{
                ...currentQuestion,
                type: 'NM' as const,
                text: currentQuestion.prompt,
                label: '',
                category: 'PREFERENCES' as QuestionCategory,
                number: 1,
                requiredForOnboarding: false,
                includeInOnboarding: false,
                min: currentQuestion.min || 0,
                max: currentQuestion.max || 100,
                step: currentQuestion.step || 1
              }}
              onAnswer={handleAnswer}
            />
          );
        default:
          return null;  // Just return null, no logging needed here
      }
    };

    return (
      <div className="quiz-question">
        {renderQuestionContent()}
        {hasAnswered && !state.completed && (
          (isQuestionType(currentQuestion.type) && currentQuestion.type === 'XY_CONTINUUM') ? (
            (isCorrect || guessCount >= 2) && (
              <button 
                onClick={handleNext}
                className="next-button"
              >
                Next Question
              </button>
            )
          ) : (
            <button 
              onClick={handleNext}
              className="next-button"
            >
              Next Question
            </button>
          )
        )}
      </div>
    );
  };

  return (
    <div className="quiz-container">
      {currentDelight && (
        <DelightFactor
          factor={currentDelight}
          onComplete={() => {
            console.log('Delight complete');
            setCurrentDelight(null);
          }}
        />
      )}
      <div className="quiz-header">
        <h2>Quiz Questions</h2>
        <div className="quiz-progress">
          Question {state.currentQuestionIndex + 1} of {state.questions.length}
          <div className="quiz-score">Score: {state.score}</div>
        </div>
      </div>

      <div className="question-container">
        {renderCurrentQuestion()}
      </div>

      {state.completed && (
        <div className="completion-message">
          Quiz Complete! Final Score: {state.score}/{state.questions.length}
        </div>
      )}
    </div>
  );
};

export const QuestionPlayground = () => {
  // Log the questions at the top level
  logger.debug('QuestionPlayground: Questions available', {
    standardCount: standardQuestions.length,
    poolCount: questionPool.length,
    standardQuestions,
    questionPool
  });

  return (
    <AccessibilityProvider>
      <MockDataProvider>
        <div className="question-playground">
          <QuestionProvider>
            <OnboardingProvider
              standardQuestions={standardQuestions}
              questionPool={questionPool}
            >
              <QuizProvider>
                <ContextControls />
                <QuestionContent />
              </QuizProvider>
            </OnboardingProvider>
          </QuestionProvider>
        </div>
      </MockDataProvider>
    </AccessibilityProvider>
  );
};

const QuestionContent = () => {
  const { state } = useQuestionContext();
  const sessionService = new SessionService(db);
  const responseService = new ResponseService(db);
  
  return (
    <>
      {state.experience === 'ONBOARDING' && (
        <OnboardingFlow />
      )}
      {state.experience === 'QUIZ' && <QuizFlow />}
    </>
  );
}; 