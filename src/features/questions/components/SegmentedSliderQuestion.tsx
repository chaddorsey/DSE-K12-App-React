import React, { useState, useRef } from 'react';
import type { SegmentedSliderQuestion } from '../types/questions';
import type { QuestionResponse } from '../types/responses';
import './SegmentedSliderQuestion.css';

interface Props {
  question: SegmentedSliderQuestion;
  onAnswer: (response: QuestionResponse) => void;
  disabled?: boolean;
  showFeedback?: boolean;
}

export const SegmentedSliderQuestionComponent: React.FC<Props> = ({
  question,
  onAnswer,
  disabled = false,
  showFeedback = false
}) => {
  const [selectedSegment, setSelectedSegment] = useState<number | null>(question.defaultSegment ?? null);
  const [interactionCount, setInteractionCount] = useState(0);
  const startTime = useRef(Date.now());

  const handleSegmentClick = (index: number) => {
    if (disabled) return;
    
    setSelectedSegment(index);
    setInteractionCount(prev => prev + 1);
  };

  const handleSubmit = () => {
    if (selectedSegment === null || disabled) return;

    const response: QuestionResponse = {
      questionId: question.id,
      value: {
        type: 'SEGMENTED',
        selectedSegment,
        segmentLabel: question.segments[selectedSegment].label,
        normalizedValue: selectedSegment / (question.segments.length - 1)
      },
      metadata: {
        timeToAnswer: Date.now() - startTime.current,
        interactionCount,
        device: {
          type: 'desktop',
          input: 'mouse'
        }
      }
    };

    onAnswer(response);
  };

  return (
    <div className="segmented-slider-question">
      <div className="segmented-prompt">{question.prompt}</div>
      
      <div className="segments-container">
        {question.segments.map((segment, index) => (
          <button
            key={index}
            className={`segment ${selectedSegment === index ? 'selected' : ''}`}
            onClick={() => handleSegmentClick(index)}
            disabled={disabled}
          >
            <div className="segment-label">{segment.label}</div>
            <div className="segment-description">{segment.description}</div>
          </button>
        ))}
      </div>

      <button
        className="submit-button"
        onClick={handleSubmit}
        disabled={selectedSegment === null || disabled}
      >
        Submit
      </button>
    </div>
  );
}; 