import type { Question } from '../../features/questions/types';
import personalityQuestions from './personality.json';
import professionalQuestions from './professional.json';
import demographicQuestions from './demographic.json';
import interestQuestions from './interests.json';

function validateQuestion(q: any): q is Question {
  const baseFieldsValid = (
    typeof q.id === 'string' &&
    typeof q.type === 'string' &&
    typeof q.text === 'string' &&
    typeof q.label === 'string' &&
    typeof q.category === 'string' &&
    typeof q.number === 'number'
  );

  if (!baseFieldsValid) return false;

  // Validate type-specific fields
  switch (q.type) {
    case 'MC':
      if (!Array.isArray(q.options)) {
        console.warn(`Question ${q.id}: MC question missing options array`);
        return false;
      }
      break;
    case 'NM':
      if (typeof q.min !== 'number' || typeof q.max !== 'number') {
        console.warn(`Question ${q.id}: NM question missing min/max`);
        return false;
      }
      break;
    case 'OP':
      if (typeof q.maxLength !== 'number') {
        console.warn(`Question ${q.id}: OP question missing maxLength`);
        return false;
      }
      break;
  }

  // Ensure onboarding fields are booleans, defaulting to false if missing
  q.requiredForOnboarding = Boolean(q.requiredForOnboarding);
  q.includeInOnboarding = Boolean(q.includeInOnboarding);

  return true;
}

function safeLoadQuestions(jsonData: any): Question[] {
  try {
    if (!jsonData || !jsonData.questions) {
      console.warn('Invalid question data format:', jsonData);
      return [];
    }
    const validQuestions = jsonData.questions.filter(q => {
      const isValid = validateQuestion(q);
      if (!isValid) {
        console.warn('Invalid question format:', q);
      }
      return isValid;
    });
    return validQuestions;
  } catch (error) {
    console.error('Error loading questions:', error);
    return [];
  }
}

export const questionStore = {
  getAllQuestions(): Question[] {
    try {
      const questions = [
        ...safeLoadQuestions(personalityQuestions),
        ...safeLoadQuestions(professionalQuestions),
        ...safeLoadQuestions(demographicQuestions),
        ...safeLoadQuestions(interestQuestions)
      ];
      console.log('Loaded questions from store:', {
        total: questions.length,
        byCategory: {
          personality: questions.filter(q => q.category === 'PERSONALITY').length,
          professional: questions.filter(q => q.category === 'PROFESSIONAL').length,
          demographic: questions.filter(q => q.category === 'DEMOGRAPHIC').length,
          interests: questions.filter(q => q.category === 'INTERESTS').length
        },
        questions: questions.map(q => ({
          id: q.id,
          type: q.type,
          category: q.category,
          text: q.text.substring(0, 30) + '...'
        }))
      });
      return questions;
    } catch (error) {
      console.error('Error loading all questions:', error);
      return [];
    }
  },

  getQuestionsByCategory(category: string): Question[] {
    try {
      const allQuestions = this.getAllQuestions();
      return allQuestions.filter(q => q.category === category);
    } catch (error) {
      console.error('Error filtering questions by category:', error);
      return [];
    }
  },

  getQuestion(id: string): Question | undefined {
    try {
      const allQuestions = this.getAllQuestions();
      return allQuestions.find(q => q.id === id);
    } catch (error) {
      console.error('Error finding question by id:', error);
      return undefined;
    }
  }
}; 