import { useState, useCallback, useRef, useEffect } from 'react';

type TransitionDirection = 'forward' | 'backward' | null;

interface TransitionConfig {
  duration: number;
  fadeDelay?: number;
}

interface QuestionTransitionState {
  direction: TransitionDirection;
  isAnimating: boolean;
  phase: 'exit' | 'enter' | null;
  setPhase: (phase: 'exit' | 'enter' | null) => void;
  setDirection: (direction: TransitionDirection) => void;
  setIsAnimating: (isAnimating: boolean) => void;
  startTransition: (newDirection: 'forward' | 'backward') => void;
}

export const useQuestionTransition = (config: TransitionConfig): QuestionTransitionState => {
  const [direction, setDirection] = useState<TransitionDirection>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [phase, setPhase] = useState<'exit' | 'enter' | null>(null);
  
  const timeoutRef = useRef<NodeJS.Timeout>();

  const startTransition = useCallback((newDirection: 'forward' | 'backward') => {
    if (isAnimating) return;
    setDirection(newDirection);
    setIsAnimating(true);
    setPhase('exit');
  }, [isAnimating]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return {
    direction,
    isAnimating,
    phase,
    setPhase,
    setDirection,
    setIsAnimating,
    startTransition
  };
}; 