import type { Question, QuestionType } from '../types';

export const ensureQuestionFields = (q: QuestionType): Question => {
  const base = {
    ...q,
    requiredForOnboarding: Boolean(q.requiredForOnboarding ?? false),
    includeInOnboarding: Boolean(q.includeInOnboarding ?? false)
  };

  switch (q.type) {
    case 'MC':
      return {
        ...base,
        type: 'MC',
        options: Array.isArray(q.options) ? q.options : [],
        allowMultiple: Boolean(q.allowMultiple)
      } as Question;
    case 'NM':
      return {
        ...base,
        type: 'NM',
        min: Number(q.min ?? 0),
        max: Number(q.max ?? 100),
        step: Number(q.step ?? 1)
      } as Question;
    case 'OP':
      return {
        ...base,
        type: 'OP',
        maxLength: Number(q.maxLength ?? 500)
      } as Question;
    case 'SCALE':
      return {
        ...base,
        type: 'SCALE',
        min: Number(q.min ?? 0),
        max: Number(q.max ?? 100),
        step: Number(q.step ?? 1),
        labels: q.labels ?? { min: '', max: '' }
      } as Question;
    default:
      return base as Question;
  }
}; 