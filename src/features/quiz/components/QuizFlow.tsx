import React, { useState } from 'react';
import type { Quiz, QuizQuestion } from '../types/quiz';
import type { 
  MultipleChoiceQuestion,
  NumericQuestion 
} from '../../questions/types/questions';
import type { 
  QuestionResponse, 
  MCQuestionResponse, 
  NMQuestionResponse 
} from '../../questions/types/responses';
import { MultipleChoiceQuestionComponent } from '../../questions/components/MultipleChoiceQuestion';
import { NumericQuestionComponent } from '../../questions/components/NumericQuestion';
import { DelightFactor } from '../../questions/components/DelightFactor/DelightFactor';
import type { DelightFactor as DelightFactorType } from '../../questions/types/delightFactors';
import { logger } from '../../../utils/logger';
import './QuizFlow.css';

interface QuizFlowProps {
  quiz: Quiz;
  onComplete: (result: {
    score: number;
    totalQuestions: number;
    answers: Array<{
      questionId: string;
      correct: boolean;
      answer: string | number;
    }>;
  }) => void;
}

export const QuizFlow: React.FC<QuizFlowProps> = ({ quiz, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<Array<{
    questionId: string;
    correct: boolean;
    answer: string | number;
  }>>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showDelight, setShowDelight] = useState(false);

  const currentQuestion = quiz.questions[currentIndex];
  const isLastQuestion = currentIndex === quiz.questions.length - 1;

  const handleAnswer = (response: QuestionResponse) => {
    logger.debug('Answer submitted:', {
      response,
      correctAnswer: currentQuestion.correctAnswer,
      type: currentQuestion.type,
      options: 'options' in currentQuestion ? currentQuestion.options : undefined
    });

    let answer: string | number;
    let correct: boolean;

    switch (response.value.type) {
      case 'MC': {
        const mcResponse = response as MCQuestionResponse;
        answer = mcResponse.value.selectedOption;
        correct = answer === currentQuestion.correctAnswer;
        break;
      }
      case 'NM': {
        const nmResponse = response as NMQuestionResponse;
        answer = nmResponse.value.number;
        correct = answer.toString() === currentQuestion.correctAnswer;
        break;
      }
      default:
        throw new Error(`Unsupported response type: ${response.value.type}`);
    }

    // Update score and answers
    if (correct) {
      setScore(prev => prev + 1);
      
      if (currentQuestion.delightFactor?.trigger === 'ON_CORRECT') {
        setShowDelight(true);
        return;
      }
    }
    
    setAnswers(prev => [...prev, {
      questionId: currentQuestion.id,
      correct,
      answer
    }]);

    setShowFeedback(true);
  };

  const handleDelightComplete = () => {
    setShowDelight(false);
    setAnswers(prev => [...prev, {
      questionId: currentQuestion.id,
      correct: true,
      answer: currentQuestion.correctAnswer
    }]);
    setShowFeedback(true);
  };

  const handleNext = async () => {
    setLoading(true);
    setShowFeedback(false);

    if (isLastQuestion) {
      onComplete({
        score,
        totalQuestions: quiz.questions.length,
        answers
      });
    } else {
      // Simulate loading for smoother transitions
      await new Promise(resolve => setTimeout(resolve, 500));
      setCurrentIndex(prev => prev + 1);
    }

    setLoading(false);
  };

  if (loading) {
    return <div className="loading">Loading next question...</div>;
  }

  return (
    <div className="quiz-flow">
      <div className="quiz-header">
        <div className="progress">
          Question {currentIndex + 1} of {quiz.questions.length}
        </div>
        <div className="score">
          Score: {score}/{currentIndex + (showFeedback ? 1 : 0)}
        </div>
      </div>

      <div className="question-container">
        {currentQuestion.type === 'MC' ? (
          <MultipleChoiceQuestionComponent
            question={currentQuestion}
            onAnswer={handleAnswer}
            disabled={showFeedback || showDelight}
          />
        ) : (
          <NumericQuestionComponent
            question={currentQuestion}
            onAnswer={handleAnswer}
            disabled={showFeedback || showDelight}
          />
        )}
      </div>

      {showDelight && currentQuestion.delightFactor && (
        <DelightFactor
          factor={currentQuestion.delightFactor}
          onComplete={handleDelightComplete}
        />
      )}

      {showFeedback && (
        <div className={`feedback ${answers[currentIndex].correct ? 'correct' : 'incorrect'}`}>
          {answers[currentIndex].correct ? (
            <div>Correct!</div>
          ) : (
            <div>
              <div>Incorrect</div>
              <div>The correct answer was {currentQuestion.correctAnswer}</div>
            </div>
          )}
          <button 
            onClick={handleNext}
            className="next-button"
          >
            {isLastQuestion ? 'Finish Quiz' : 'Next Question'}
          </button>
        </div>
      )}

      {currentIndex === quiz.questions.length && (
        <div className="quiz-complete">
          <h2>Quiz Complete!</h2>
          <div className="final-score">
            Final Score: {score}/{quiz.questions.length}
          </div>
        </div>
      )}
    </div>
  );
};