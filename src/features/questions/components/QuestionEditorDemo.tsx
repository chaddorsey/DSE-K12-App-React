import React, { useState, useCallback } from 'react';
import { QuestionForm } from './QuestionForm';
import { QuestionListView } from './QuestionListView';
import { useQuestionBank } from '../context/QuestionBankContext';
import type { Question, QuestionType } from '../types';
import { ensureQuestionFields } from '../utils/questionUtils';
import './QuestionEditorDemo.css';

export const QuestionEditorDemo: React.FC = () => {
  const { 
    questions,
    deleteQuestion, 
    duplicateQuestion, 
    updateQuestion,
    isLoading,
    error 
  } = useQuestionBank();
  const [editingQuestion, setEditingQuestion] = useState<Question | undefined>();
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  const handleSave = useCallback((question: Question) => {
    console.log('Saving question:', question);
    try {
      updateQuestion(question);
      setEditingQuestion(undefined);
      setIsCreatingNew(false);
    } catch (error) {
      console.error('Error saving question:', error);
    }
  }, [updateQuestion]);

  const handleEdit = useCallback((id: string) => {
    const question = questions.find(q => q.id === id);
    if (question) {
      console.log('Editing question:', question);
      setEditingQuestion(ensureQuestionFields(question));
    }
  }, [questions]);

  const handleDelete = useCallback((ids: string[]) => {
    ids.forEach(id => deleteQuestion(id));
  }, [deleteQuestion]);

  const handleDuplicate = useCallback((id: string) => {
    duplicateQuestion(id);
  }, [duplicateQuestion]);

  if (isLoading) {
    return (
      <div className="question-editor-demo loading">
        <div className="loading-spinner">Loading questions...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="question-editor-demo error">
        <div className="error-message">
          Error loading questions: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="question-editor-demo">
      <header className="editor-header">
        <h1>Question Bank Editor</h1>
        <button 
          onClick={() => setIsCreatingNew(true)}
          disabled={isCreatingNew || !!editingQuestion}
        >
          Create New Question
        </button>
      </header>

      {(editingQuestion || isCreatingNew) ? (
        <div className="editor-container">
          <QuestionForm
            question={editingQuestion}
            questions={questions}
            isNew={isCreatingNew}
            onComplete={handleSave}
            onClose={() => {
              setEditingQuestion(undefined);
              setIsCreatingNew(false);
            }}
          />
        </div>
      ) : (
        <QuestionListView
          questions={questions}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onDuplicate={handleDuplicate}
        />
      )}
    </div>
  );
}; 