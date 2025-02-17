import React, { useState, useEffect } from 'react';
import { MultipleChoiceQuestionComponent } from './MultipleChoiceQuestion';
import { OpenResponseQuestionComponent } from './OpenResponseQuestion';
import { NumericQuestionComponent } from './NumericQuestion';
import { SliderQuestionComponent } from './SliderQuestion';
import { DelightFactor } from './DelightFactor/DelightFactor';
import { QuestionProvider, useQuestionContext } from '../context/QuestionContext';
import { OnboardingProvider, useOnboardingContext } from '../context/OnboardingContext';
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

const OnboardingFlow = () => {
  const { state, actions } = useOnboardingContext();
  const { state: questionState } = useQuestionContext();
  const [currentDelight, setCurrentDelight] = useState<DelightFactorType | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);

  const handleDelightComplete = () => {
    setCurrentDelight(null);
  };

  const getDelightFactor = (question: Question, response: QuestionResponse): DelightFactorType | null => {
    switch (question.type) {
      case 'MC':
        return {
          id: 'confetti',
          type: 'ANIMATION',
          timing: 'POST_ANSWER',
          trigger: 'IMMEDIATE',
          content: {
            animation: 'confetti',
            duration: 2000
          },
          questionTypes: ['MC']
        };
      case 'NM':
        if (response.value.type === 'NM' && response.value.number !== undefined) {
          return {
            id: 'number',
            type: 'NUMBER_ANIMATION',
            timing: 'POST_ANSWER',
            trigger: 'IMMEDIATE',
            content: {
              number: response.value.number,
              color: `hsl(${Math.random() * 360}, 80%, 60%)`,
              duration: 1000
            },
            questionTypes: ['NM']
          };
        }
        return null;
      default:
        return null;
    }
  };

  const handleAnswer = (response: QuestionResponse) => {
    const currentQuestion = state.selectedQuestions[state.currentQuestionIndex];
    const delightFactor = getDelightFactor(currentQuestion, response);
    
    if (delightFactor) {
      setCurrentDelight(delightFactor);
      setTimeout(() => {
        actions.handleResponse(response);
      }, delightFactor.content.duration + 100);
    } else {
      actions.handleResponse(response);
    }
  };

  const renderCurrentQuestion = () => {
    if (!state.selectedQuestions.length) return null;
    
    const currentQuestion = state.selectedQuestions[state.currentQuestionIndex];
    if (typeof currentQuestion === 'string') return null;
    
    switch (currentQuestion.type) {
      case 'MC':
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
            disabled={hasAnswered}
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
              min: currentQuestion.min ?? 0,
              max: currentQuestion.max ?? 100,
              step: currentQuestion.step ?? 1,
              text: currentQuestion.prompt,
              label: '',
              category: 'PREFERENCES' as QuestionCategory,
              number: 1,
              requiredForOnboarding: false,
              includeInOnboarding: false
            }}
            onAnswer={handleAnswer}
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
      default:
        return null;
    }
  };

  return (
    <div className="onboarding-container">
      <div className="onboarding-header">
        <h2>Onboarding Questions</h2>
        <div className="progress">
          Question {state.currentQuestionIndex + 1} of 7
        </div>
      </div>

      {!state.selectedQuestions.length ? (
        <button 
          onClick={actions.initializeSequence}
          className="start-button"
        >
          Start Onboarding
        </button>
      ) : (
        <div className="question-container">
          {renderCurrentQuestion()}
          {currentDelight && (
            <DelightFactor
              factor={currentDelight}
              onComplete={handleDelightComplete}
            />
          )}
        </div>
      )}

      {state.completed && (
        <div className="completion-message">
          Onboarding Complete!
        </div>
      )}
    </div>
  );
};

const ContextControls = () => {
  const { state, actions } = useQuestionContext();
  const quiz = useQuizContext();
  const onboarding = useOnboardingContext();
  const [isSessionActive, setIsSessionActive] = useState(false);
  
  const handleExperienceChange = (experience: QuestionContextValue['experience']) => {
    if (isSessionActive) return;
    actions.setExperience(experience);
  };

  const handleModeChange = (mode: NonNullable<QuestionContextValue['mode']>) => {
    if (isSessionActive) return;
    actions.setMode(mode);
  };

  useEffect(() => {
    // Session is active if onboarding has questions or quiz is initialized
    setIsSessionActive(
      (state.experience === 'ONBOARDING' && onboarding.state.selectedQuestions.length > 0) ||
      (state.experience === 'QUIZ' && quiz.state.questions.length > 0)
    );
  }, [state.experience, onboarding.state.selectedQuestions, quiz.state.questions]);

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
            onClick={() => quiz.actions.initializeQuiz('user1', mockQuizQuestions)}
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

  const handleAnswer = (response: QuestionResponse) => {
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
  };

  // Add effect to monitor delight state
  useEffect(() => {
    console.log('Current delight:', currentDelight); // Debug log
  }, [currentDelight]);

  const handleNext = () => {
    actions.advanceToNext();
    setHasAnswered(false);
    setCurrentDelight(null);
    setIsCorrect(false);
    setGuessCount(0);
  };

  const renderCurrentQuestion = () => {
    if (!state.questions.length) return null;
    
    const currentQuestion = state.questions[state.currentQuestionIndex];
    return (
      <div className="quiz-question">
        {(() => {
          switch (currentQuestion.type) {
            case 'MC':
              const lastResponse = state.responses[state.responses.length - 1];
              const isCorrect = lastResponse?.correct;
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
            default:
              return null;
          }
        })()}
        {hasAnswered && !state.completed && (
          currentQuestion.type === 'XY_CONTINUUM' ? (
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
  return (
    <AccessibilityProvider>
      <MockDataProvider>
        <div className="playground-container">
          <QuestionProvider>
            <OnboardingProvider
              standardQuestions={standardQuestions.map(q => ({
                ...q,
                text: q.prompt,
                label: '',
                category: 'PREFERENCES' as QuestionCategory,
                number: 1,
                requiredForOnboarding: false,
                includeInOnboarding: false
              })) as Question[]}
              questionPool={questionPool.map(q => ({
                ...q,
                text: q.prompt,
                label: '',
                category: 'PREFERENCES' as QuestionCategory,
                number: 1,
                requiredForOnboarding: false,
                includeInOnboarding: false
              })) as Question[]}
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
  
  return (
    <>
      {state.experience === 'ONBOARDING' && <OnboardingFlow />}
      {state.experience === 'QUIZ' && <QuizFlow />}
    </>
  );
}; 