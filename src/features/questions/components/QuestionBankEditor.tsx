import React, { useState } from 'react';
import { useQuestionBank } from '../context/QuestionBankContext';
import { Question, QuestionCategory } from '../types/question';
import { QuestionList } from './QuestionList';
import { QuestionForm } from './QuestionForm';
import './QuestionBankEditor.css';

export const QuestionBankEditor: React.FC = () => {
  const { getAllQuestions } = useQuestionBank();
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const handleAddNew = () => {
    setSelectedQuestion(null);
    setIsAddingNew(true);
  };

  const handleEdit = (question: Question) => {
    setSelectedQuestion(question);
    setIsAddingNew(false);
  };

  return (
    <div className="question-bank-editor">
      <header className="editor-header">
        <h1>Question Bank Editor</h1>
        <button 
          className="add-question-btn"
          onClick={handleAddNew}
        >
          Add New Question
        </button>
      </header>

      <div className="editor-content">
        <QuestionList 
          questions={getAllQuestions()}
          onSelectQuestion={handleEdit}
          selectedQuestionId={selectedQuestion?.id}
        />
        
        <div className="editor-form">
          {(isAddingNew || selectedQuestion) && (
            <QuestionForm
              question={selectedQuestion}
              isNew={isAddingNew}
              onClose={() => {
                setSelectedQuestion(null);
                setIsAddingNew(false);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}; 