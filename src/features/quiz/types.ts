interface IQuizQuestion {
  id: string;
  stem: string;
  options: string[];
  correctAnswer?: string;
}

interface IQuizState {
  currentQuestion: number;
  questions: IQuizQuestion[];
  answers: Record<string, string>;
} 