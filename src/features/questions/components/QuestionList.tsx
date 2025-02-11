import React from 'react';
import { Question } from '../types/question';
import './QuestionList.css';

interface Props {
  questions: Question[];
  onSelectQuestion: (question: Question) => void;
  selectedQuestionId?: string;
}

export const QuestionList: React.FC<Props> = ({
  questions,
  onSelectQuestion,
  selectedQuestionId
}) => {
  const sortedQuestions = [...questions].sort((a, b) => a.number - b.number);

  return (
    <div className="question-list">
      <div className="list-header">
        <h2>Questions</h2>
        <div className="filter-controls">
          {/* Add filter controls here */}
        </div>
      </div>

      <div className="questions">
        {sortedQuestions.map(question => (
          <div
            key={question.id}
            className={`question-item ${question.id === selectedQuestionId ? 'selected' : ''}`}
            onClick={() => onSelectQuestion(question)}
          >
            <div className="question-number">Q{question.number}</div>
            <div className="question-info">
              <div className="question-text">{question.text}</div>
              <div className="question-meta">
                <span className="question-type">{question.type}</span>
                <span className="question-category">{question.category}</span>
                {question.requiredForOnboarding && (
                  <span className="question-flag">Required Onboarding</span>
                )}
                {question.includeInOnboarding && (
                  <span className="question-flag">Optional Onboarding</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 