import React, { useState } from 'react';
import { XYMultipleChoiceQuestion } from '../components/XYMultipleChoiceQuestion';
import { XYQuestion } from '../components/XYQuestion';
import type { MultipleChoiceQuestion, XYQuestion as XYQuestionType } from '../types';
import { QuestionCategory } from '../types/question';
import './QuestionDemo.css';

const demoQuestions: MultipleChoiceQuestion[] = [
  {
    id: 'demo-1',
    type: 'MC',
    number: 1,
    text: 'How do you prefer to work?',
    label: 'Work Style',
    category: QuestionCategory.PERSONALITY,
    options: [
      'Independent & Focused',
      'Collaborative & Social',
      'Strategic & Planning',
      'Hands-on & Active'
    ],
    requiredForOnboarding: false,
    includeInOnboarding: false
  },
  {
    id: 'demo-2',
    type: 'MC',
    number: 2,
    text: 'Choose your learning style',
    label: 'Learning Style',
    category: QuestionCategory.PERSONALITY,
    options: [
      'Visual',
      'Auditory',
      'Kinesthetic'
    ],
    requiredForOnboarding: false,
    includeInOnboarding: false
  },
  {
    id: 'demo-3',
    type: 'MC',
    number: 3,
    text: 'Select your communication preference',
    label: 'Communication Style',
    category: QuestionCategory.PERSONALITY,
    options: [
      'Direct & Brief',
      'Detailed & Thorough',
      'Casual & Friendly',
      'Formal & Professional',
      'Visual & Demo-based',
      'Written & Documented'
    ],
    requiredForOnboarding: false,
    includeInOnboarding: false
  },
  {
    id: 'demo-4',
    type: 'MC',
    number: 4,
    text: 'Rate your proficiency and interest in different tech areas',
    label: 'Tech Proficiency & Interest',
    category: QuestionCategory.INTERESTS,
    options: [
      'Frontend Development',
      'Backend Development',
      'DevOps',
      'Data Science',
      'Security'
    ],
    config: {
      type: 'segmented-continuous',
      segments: [
        { id: 'frontend', label: 'Frontend', color: '#3b82f6', description: 'UI/UX, Web Apps' },
        { id: 'backend', label: 'Backend', color: '#10b981', description: 'APIs, Databases' },
        { id: 'devops', label: 'DevOps', color: '#8b5cf6', description: 'CI/CD, Infrastructure' },
        { id: 'data', label: 'Data Science', color: '#f59e0b', description: 'ML, Analytics' },
        { id: 'security', label: 'Security', color: '#ef4444', description: 'Cybersecurity, Auth' }
      ],
      intensity: {
        label: 'Proficiency Level',
        min: 0,
        max: 1,
        defaultValue: 0.5,
        labels: {
          0: 'Beginner',
          0.25: 'Basic',
          0.5: 'Intermediate',
          0.75: 'Advanced',
          1: 'Expert'
        }
      },
      requireConfirmation: true
    }
  }
];

const demoXYQuestions: XYQuestionType[] = [
  {
    id: 'xy-demo-1',
    type: 'XY',
    number: 3,
    text: 'How would you describe your work-life balance?',
    label: 'Work-Life Balance',
    category: QuestionCategory.PERSONALITY,
    config: {
      xAxis: {
        min: 0,
        max: 100,
        labels: {
          min: 'All Work',
          max: 'All Life'
        }
      },
      yAxis: {
        min: 0,
        max: 100,
        labels: {
          min: 'Low Energy',
          max: 'High Energy'
        }
      }
    },
    hintStrategy: 'quadrant',
    tolerance: 0.2
  },
  {
    id: 'xy-demo-2',
    type: 'XY',
    number: 4,
    text: 'How do you approach problem solving?',
    label: 'Problem Solving Style',
    category: QuestionCategory.PERSONALITY,
    config: {
      xAxis: {
        min: 0,
        max: 100,
        labels: {
          min: 'Analytical',
          max: 'Creative'
        }
      },
      yAxis: {
        min: 0,
        max: 100,
        labels: {
          min: 'Independent',
          max: 'Collaborative'
        }
      }
    }
  }
];

type QuestionType = MultipleChoiceQuestion | XYQuestionType;

interface DemoConfig {
  colorScheme: 'default' | 'muted' | 'vibrant';
  showLabels: boolean;
  animationSpeed: 'slow' | 'normal' | 'fast';
  size: 'small' | 'medium' | 'large';
}

export const QuestionDemo: React.FC = () => {
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [config, setConfig] = useState<DemoConfig>({
    colorScheme: 'default',
    showLabels: true,
    animationSpeed: 'normal',
    size: 'medium'
  });
  const [questionType, setQuestionType] = useState<'MC' | 'XY'>('MC');

  const questions = questionType === 'MC' ? demoQuestions : demoXYQuestions;
  const currentQuestion = questions[currentIndex];

  const handleAnswer = (response: any) => {
    setResponses(prev => ({
      ...prev,
      [currentQuestion.id]: response
    }));
  };

  const updateConfig = (key: keyof DemoConfig, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const getQuestionConfig = (question: MultipleChoiceQuestion) => {
    if ('config' in question) {
      return {
        ...question.config,
        colorScheme: config.colorScheme,
        showLabels: config.showLabels,
        animationSpeed: config.animationSpeed,
        size: config.size
      };
    }
    return config;
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const toggleQuestionType = () => {
    setQuestionType(prev => prev === 'MC' ? 'XY' : 'MC');
    setCurrentIndex(0);
  };

  return (
    <div className="question-demo">
      <header>
        <h1>Question Type Demo</h1>
        <div className="controls">
          <button 
            onClick={toggleQuestionType}
            className="type-toggle"
          >
            Switch to {questionType === 'MC' ? 'XY' : 'MC'} Questions
          </button>
        </div>
        <div className="question-info">
          <span className="question-type">{questionType} Question</span>
          <span className="question-count">
            Question {currentIndex + 1} of {questions.length}
          </span>
        </div>
      </header>

      <main>
        {questionType === 'MC' ? (
          <XYMultipleChoiceQuestion
            question={currentQuestion as MultipleChoiceQuestion}
            onAnswer={handleAnswer}
            config={getQuestionConfig(currentQuestion as MultipleChoiceQuestion)}
          />
        ) : (
          <XYQuestion
            question={currentQuestion as XYQuestionType}
            onAnswer={handleAnswer}
          />
        )}
      </main>

      <div className="navigation">
        <button onClick={handlePrev} disabled={currentIndex === 0}>
          Previous
        </button>
        <button onClick={handleNext} disabled={currentIndex === questions.length - 1}>
          Next
        </button>
      </div>

      <footer>
        <h2>Debug Info</h2>
        <div className="debug-panels">
          <div className="debug-panel">
            <h3>Responses</h3>
            <pre>{JSON.stringify(responses, null, 2)}</pre>
          </div>
          <div className="debug-panel">
            <h3>Current Configuration</h3>
            <pre>{JSON.stringify(config, null, 2)}</pre>
          </div>
        </div>
      </footer>
    </div>
  );
}; 