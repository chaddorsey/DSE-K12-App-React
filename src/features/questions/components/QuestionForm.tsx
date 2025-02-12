import React, { useEffect, useCallback } from 'react';
import classNames from 'classnames';
import { useFormNavigation } from '../hooks/useFormNavigation';
import { useQuestionValidation } from '../hooks/useQuestionValidation';
import { MultipleChoiceQuestion } from './MultipleChoiceQuestion';
import { OpenResponseQuestion } from './OpenResponseQuestion';
import { useAccessibility } from '../../accessibility/context/AccessibilityContext';
import type { Question, QuestionCategory, QuestionFormData, QuestionResponse } from '../types';
import './QuestionForm.css';
import { useForm } from 'react-hook-form';

interface QuestionFormProps {
  question?: Question;
  questions?: Question[];
  isNew?: boolean;
  onComplete: (question: Question) => void;
  onClose?: () => void;
}

const createCompleteQuestion = (data: QuestionFormData, existingQuestion?: Question, questionCount: number = 0): Question => {
  const baseQuestion = {
    id: existingQuestion?.id || `q${Date.now()}`,
    number: existingQuestion?.number || questionCount + 1,
    text: data.text,
    label: data.label,
    category: data.category as QuestionCategory,
    requiredForOnboarding: Boolean(data.requiredForOnboarding),
    includeInOnboarding: Boolean(data.includeInOnboarding)
  };

  switch (data.type) {
    case 'MC': {
      // Ensure options is always an array
      let optionsArray: string[];
      if (Array.isArray(data.options)) {
        optionsArray = data.options;
      } else if (typeof data.options === 'string') {
        optionsArray = data.options.split('\n').filter(Boolean);
      } else {
        optionsArray = [];
      }

      return {
        ...baseQuestion,
        type: 'MC',
        options: optionsArray,
        allowMultiple: false
      };
    }
    case 'NM':
      return {
        ...baseQuestion,
        type: 'NM',
        min: Number(data.min) || 0,
        max: Number(data.max) || 100,
        step: Number(data.step) || 1
      };
    case 'SCALE':
      return {
        ...baseQuestion,
        type: 'SCALE',
        min: Number(data.min) || 0,
        max: Number(data.max) || 100,
        step: Number(data.step) || 1,
        labels: data.labels
      };
    case 'OP':
      return {
        ...baseQuestion,
        type: 'OP',
        maxLength: Number(data.maxLength) || 500
      };
    default:
      throw new Error(`Unsupported question type: ${data.type}`);
  }
};

export const QuestionForm: React.FC<QuestionFormProps> = ({
  question,
  questions = [],
  isNew = false,
  onClose,
  onComplete
}) => {
  const { highContrast, fontSize, keyboardMode } = useAccessibility();
  const { register, handleSubmit, watch, setValue } = useForm<QuestionFormData>({
    defaultValues: question ? {
      type: question.type,
      text: question.text,
      label: question.label,
      category: question.category,
      options: 'options' in question ? 
        Array.isArray(question.options) ? 
          question.options.join('\n') : question.options : '',
      min: 'min' in question ? question.min : undefined,
      max: 'max' in question ? question.max : undefined,
      step: 'step' in question ? question.step : undefined,
      maxLength: 'maxLength' in question ? question.maxLength : undefined,
      labels: 'labels' in question ? question.labels : undefined,
      requiredForOnboarding: question.requiredForOnboarding,
      includeInOnboarding: question.includeInOnboarding
    } : {
      type: 'MC',
      text: '',
      label: '',
      category: 'GENERAL',
      options: '',
      requiredForOnboarding: false,
      includeInOnboarding: false
    }
  });

  const {
    currentQuestion,
    isFirstQuestion,
    isLastQuestion,
    progress,
    handleNavigation
  } = useFormNavigation({
    questions: questions || [],
    onComplete: () => onComplete(currentQuestion as Question)
  });

  const { errors, validateQuestion } = useQuestionValidation({
    questions: questions || []
  });

  const questionType = watch('type');

  const handleAnswer = useCallback((response: QuestionResponse) => {
    // TODO: Implement save logic
    console.log('Saving question:', response);
    onClose?.();
  }, [onClose]);

  const renderQuestion = useCallback((question: Question) => {
    switch (question.type) {
      case 'MC':
        return <MultipleChoiceQuestion 
          question={question} 
          onAnswer={handleAnswer}
        />;
      case 'OP':
        return <OpenResponseQuestion 
          question={question} 
          onAnswer={handleAnswer}
        />;
      default:
        return <div>Unsupported question type: {question.type}</div>;
    }
  }, [handleAnswer]);

  const onSubmit = (data: QuestionFormData) => {
    console.log('Form data:', data);
    const completeQuestion = createCompleteQuestion(data, question, questions.length);
    
    if (question) {
      completeQuestion.id = question.id;
      completeQuestion.number = question.number;
    }
    
    onComplete(completeQuestion);
  };

  // If we're in edit/create mode
  if (question || isNew) {
    return (
      <form className="question-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>{isNew ? 'Add New Question' : 'Edit Question'}</h2>

        <div className="form-group">
          <label>Question Text</label>
          <input {...register('text')} type="text" required />
        </div>

        <div className="form-group">
          <label>Question Type</label>
          <select {...register('type')} required>
            <option value="MC">Multiple Choice</option>
            <option value="NM">Numeric</option>
            <option value="OP">Open Response</option>
            <option value="SCALE">Scale</option>
          </select>
        </div>

        <div className="form-group">
          <label>Category</label>
          <select {...register('category')} required>
            <option value="GENERAL">General</option>
          </select>
        </div>

        {questionType === 'MC' && (
          <div className="form-group">
            <label>Options (one per line)</label>
            <textarea {...register('options')} rows={5} />
          </div>
        )}

        {questionType === 'NM' && (
          <>
            <div className="form-group">
              <label>Minimum Value</label>
              <input {...register('min')} type="number" />
            </div>
            <div className="form-group">
              <label>Maximum Value</label>
              <input {...register('max')} type="number" />
            </div>
          </>
        )}

        <div className="form-group">
          <label>
            <input {...register('requiredForOnboarding')} type="checkbox" />
            Required for Onboarding
          </label>
        </div>

        <div className="form-group">
          <label>
            <input {...register('includeInOnboarding')} type="checkbox" />
            Include in Onboarding
          </label>
        </div>

        <div className="form-actions">
          <button type="submit">Save Question</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    );
  }

  // If we're in question answering mode
  return (
    <div 
      className={classNames('question-form', {
        'high-contrast': highContrast,
        [`font-size-${fontSize}`]: true,
        'keyboard-mode': keyboardMode
      })}
    >
      <div 
        role="progressbar" 
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        className="progress-bar"
      >
        <div 
          className="progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      {currentQuestion && (
        <>
          {renderQuestion(currentQuestion)}
          {errors[currentQuestion.id] && (
            <div 
              id={`error-${currentQuestion.id}`}
              className="error-message"
              role="alert"
            >
              {errors[currentQuestion.id]}
            </div>
          )}
        </>
      )}

      <div className="navigation-buttons">
        <button
          onClick={() => handleNavigation('prev')}
          disabled={isFirstQuestion}
          className="nav-button prev"
        >
          Previous
        </button>
        <button
          onClick={() => handleNavigation('next')}
          disabled={isLastQuestion}
          className="nav-button next"
        >
          Next
        </button>
      </div>
    </div>
  );
}; 