import React, { useState, useEffect, useRef } from 'react';
import { QuizQuestion as QuizQuestionType, QuestionResponse } from '../../questions/types/questions';
import { logger } from '@/utils/logger';
import './QuizQuestion.css';

interface QuizQuestionProps {
  question: QuizQuestionType;
  onAnswer: (response: QuestionResponse) => void;
  showFeedback: boolean;
}

interface InteractionMetadata {
  timeToAnswer: number;
  interactionCount: number;
  device: {
    type: 'mobile' | 'desktop' | 'tablet';
    input: 'touch' | 'mouse' | 'keyboard';
  };
}

export const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  onAnswer,
  showFeedback
}) => {
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [interactionCount, setInteractionCount] = useState(0);
  
  const startTime = useRef(Date.now());
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reset state when question changes
    setAnswered(false);
    setIsCorrect(null);
    setInteractionCount(0);
    startTime.current = Date.now();
  }, [question.id]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleInteraction = () => {
      if (!answered) {
        setInteractionCount(prev => prev + 1);
      }
    };

    container.addEventListener('mousemove', handleInteraction);
    container.addEventListener('click', handleInteraction);
    container.addEventListener('touchstart', handleInteraction);
    container.addEventListener('keydown', handleInteraction);

    return () => {
      container.removeEventListener('mousemove', handleInteraction);
      container.removeEventListener('click', handleInteraction);
      container.removeEventListener('touchstart', handleInteraction);
      container.removeEventListener('keydown', handleInteraction);
    };
  }, [answered]);

  const handleSubmitAnswer = (value: any) => {
    const timeToAnswer = Date.now() - startTime.current;
    const correct = value === question.correctAnswer;
    
    const metadata: InteractionMetadata = {
      timeToAnswer,
      interactionCount,
      device: {
        type: detectDeviceType(),
        input: detectInputType()
      }
    };

    setAnswered(true);
    setIsCorrect(correct);

    const response: QuestionResponse = {
      questionId: question.id,
      value,
      metadata
    };

    logger.info('Submitting answer:', { 
      questionId: question.id, 
      timeToAnswer, 
      interactionCount 
    });

    onAnswer(response);
  };

  const detectDeviceType = (): 'mobile' | 'desktop' | 'tablet' => {
    // Basic device detection - could be enhanced
    if (/Mobi|Android/i.test(navigator.userAgent)) return 'mobile';
    if (/iPad|Tablet/i.test(navigator.userAgent)) return 'tablet';
    return 'desktop';
  };

  const detectInputType = (): 'touch' | 'mouse' | 'keyboard' => {
    if ('ontouchstart' in window) return 'touch';
    return 'mouse'; // Default to mouse, keyboard detected on interaction
  };

  return (
    <div 
      ref={containerRef}
      className={`quiz-question ${answered ? 'answered' : ''}`}
      data-testid="quiz-question"
    >
      <div className="question-prompt">
        {question.prompt}
      </div>

      {/* Question content rendered by specific question type components */}
      {/* {renderQuestionContent()} */}

      {showFeedback && answered && (
        <div className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
          {isCorrect ? 'Correct!' : 'Incorrect. The correct answer was: ' + question.correctAnswer}
        </div>
      )}
    </div>
  );
}; 