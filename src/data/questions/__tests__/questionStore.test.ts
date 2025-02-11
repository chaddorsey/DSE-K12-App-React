import { questionStore } from '../index';
import type { Question } from '../../../features/questions/types';

describe('QuestionStore', () => {
  it('loads all questions from JSON files', () => {
    const questions = questionStore.getAllQuestions();
    expect(questions.length).toBeGreaterThan(0);
    expect(questions[0]).toHaveProperty('id');
    expect(questions[0]).toHaveProperty('text');
  });

  it('filters questions by category', () => {
    const personalityQuestions = questionStore.getQuestionsByCategory('PERSONALITY');
    expect(personalityQuestions.length).toBeGreaterThan(0);
    expect(personalityQuestions.every(q => q.category === 'PERSONALITY')).toBe(true);
  });

  it('retrieves a specific question by ID', () => {
    const allQuestions = questionStore.getAllQuestions();
    const testId = allQuestions[0].id;
    const question = questionStore.getQuestion(testId);
    expect(question).toBeDefined();
    expect(question?.id).toBe(testId);
  });

  it('includes all original questions from initial set', () => {
    const questions = questionStore.getAllQuestions();
    
    // Check specific questions exist
    const requiredQuestions = [
      { label: 'cat_dog_preference', category: 'PERSONALITY' },
      { label: 'star_wars_trek', category: 'INTERESTS' },
      { label: 'occupation', category: 'PROFESSIONAL' },
      { label: 'num_tvs', category: 'INTERESTS' },
      { label: 'secret', category: 'PERSONALITY' },
      { label: 'region_current', category: 'DEMOGRAPHIC' },
      { label: 'intro_extrovert', category: 'PERSONALITY' },
      { label: 'favorite_season', category: 'INTERESTS' },
      { label: 'morning_night', category: 'PERSONALITY' }
    ];

    requiredQuestions.forEach(({ label, category }) => {
      const found = questions.find(q => q.label === label && q.category === category);
      expect(found).toBeDefined();
    });
  });

  it('maintains required onboarding flags', () => {
    const questions = questionStore.getAllQuestions();
    
    // Check required onboarding questions
    const requiredLabels = ['cat_dog_preference', 'star_wars_trek', 'occupation', 'num_tvs', 'secret'];
    requiredLabels.forEach(label => {
      const question = questions.find(q => q.label === label);
      expect(question?.requiredForOnboarding).toBe(true);
    });
  });

  it('maintains optional onboarding flags', () => {
    const questions = questionStore.getAllQuestions();
    
    // Check optional onboarding questions
    const optionalLabels = ['region_current', 'intro_extrovert'];
    optionalLabels.forEach(label => {
      const question = questions.find(q => q.label === label);
      expect(question?.includeInOnboarding).toBe(true);
    });
  });
}); 