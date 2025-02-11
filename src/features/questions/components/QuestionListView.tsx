import React, { useState, useMemo, useEffect } from 'react';
import { useQuestionBank } from '../context/QuestionBankContext';
import type { Question } from '../types';
import './QuestionListView.css';

export interface QuestionListViewProps {
  questions: readonly Question[];
  onEdit: (id: string) => void;
  onDelete: (ids: string[]) => void;
  onDuplicate: (id: string) => void;
}

const ITEMS_PER_PAGE = 10;

export const QuestionListView: React.FC<QuestionListViewProps> = ({
  questions,
  onEdit,
  onDelete,
  onDuplicate
}) => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    console.log('QuestionListView questions:', questions);
  }, [questions]);

  const filteredQuestions = useMemo(() => {
    return questions.filter(q => {
      const matchesSearch = q.text.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = !typeFilter || q.type === typeFilter;
      const matchesCategory = !categoryFilter || q.category === categoryFilter;
      return matchesSearch && matchesType && matchesCategory;
    });
  }, [questions, searchTerm, typeFilter, categoryFilter]);

  const paginatedQuestions = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredQuestions.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredQuestions, currentPage]);

  const totalPages = Math.ceil(filteredQuestions.length / ITEMS_PER_PAGE);

  useEffect(() => {
    console.log('QuestionListView received:', {
      questionsLength: questions.length,
      questions,
      filteredLength: filteredQuestions.length,
      paginatedLength: paginatedQuestions.length
    });
  }, [questions, filteredQuestions, paginatedQuestions]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(new Set(filteredQuestions.map(q => q.id)));
    } else {
      setSelectedIds(new Set());
    }
  };

  const handleSelect = (id: string, checked: boolean) => {
    const newSelected = new Set(selectedIds);
    if (checked) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
    }
    setSelectedIds(newSelected);
  };

  const handleBulkDelete = () => {
    onDelete(Array.from(selectedIds));
    setSelectedIds(new Set());
  };

  return (
    <div className="question-list-view">
      <div className="list-controls">
        <input
          type="search"
          placeholder="Search questions..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          value={typeFilter}
          onChange={e => setTypeFilter(e.target.value)}
          aria-label="Question Type"
        >
          <option value="">All Types</option>
          <option value="MC">Multiple Choice</option>
          <option value="OP">Open Response</option>
          <option value="NM">Numeric</option>
        </select>
        <select
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
          aria-label="Category"
        >
          <option value="">All Categories</option>
          <option value="PERSONALITY">Personality</option>
          <option value="INTERESTS">Interests</option>
          <option value="PROFESSIONAL">Professional</option>
          <option value="DEMOGRAPHIC">Demographic</option>
        </select>
      </div>

      {selectedIds.size > 0 && (
        <div className="bulk-actions">
          <button onClick={handleBulkDelete}>Delete Selected</button>
        </div>
      )}

      <table className="question-table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={e => handleSelectAll(e.target.checked)}
                checked={selectedIds.size === filteredQuestions.length}
              />
            </th>
            <th>Type</th>
            <th>Question</th>
            <th>Category</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedQuestions.map(question => (
            <tr key={question.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedIds.has(question.id)}
                  onChange={e => handleSelect(question.id, e.target.checked)}
                />
              </td>
              <td>{question.type}</td>
              <td>{question.text}</td>
              <td>{question.category}</td>
              <td>
                {question.requiredForOnboarding && <span className="badge">Required</span>}
                {question.includeInOnboarding && <span className="badge">Onboarding</span>}
              </td>
              <td className="actions">
                <button onClick={() => onEdit(question.id)}>Edit</button>
                <button onClick={() => onDuplicate(question.id)}>Duplicate</button>
                <button onClick={() => onDelete([question.id])}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button
          onClick={() => setCurrentPage(p => p - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="page-info">
          Page {currentPage} of {totalPages} 
          ({filteredQuestions.length} total questions)
        </span>
        <button
          onClick={() => setCurrentPage(p => p + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}; 