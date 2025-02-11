import React, { useState } from 'react';
import { MultipleChoiceQuestion } from './MultipleChoiceQuestion';
import { OpenResponseQuestion } from './OpenResponseQuestion';
import { SliderQuestion } from './SliderQuestion';
import type { QuestionResponse } from '../types';
import './QuestionTypesDemo.css';

export const QuestionTypesDemo: React.FC = () => {
  const [responses, setResponses] = useState<Record<string, QuestionResponse>>({});

  const handleAnswer = (id: string, response: QuestionResponse) => {
    setResponses(prev => ({ ...prev, [id]: response }));
    console.log(`Question ${id} response:`, response);
  };

  return (
    <div className="question-types-demo">
      <h1>Question Types Demo</h1>
      
      <section className="demo-section">
        <h2>Multiple Choice Question</h2>
        <MultipleChoiceQuestion
          question={{
            id: 'demo-mc-1',
            type: 'MULTIPLE_CHOICE',
            prompt: "What is your preferred programming language?",
            options: ['TypeScript', 'Python', 'R', 'Julia'],
            defaultValue: null
          }}
          onAnswer={response => handleAnswer('demo-mc-1', response)}
        />
      </section>

      <section className="demo-section">
        <h2>Open Response Question</h2>
        <OpenResponseQuestion
          question={{
            id: 'demo-or-1',
            type: 'OPEN_RESPONSE',
            prompt: "What interests you most about data science education?",
            defaultValue: ''
          }}
          onAnswer={response => handleAnswer('demo-or-1', response)}
        />
      </section>

      <section className="demo-section">
        <h2>Slider Question</h2>
        <SliderQuestion
          question={{
            id: 'demo-slider-1',
            type: 'SLIDER',
            prompt: "How many years of programming experience do you have?",
            min: 0,
            max: 20,
            step: 1,
            defaultValue: 0
          }}
          onAnswer={response => handleAnswer('demo-slider-1', response)}
        />
      </section>

      <div className="response-display">
        <h3>Current Responses:</h3>
        <pre>{JSON.stringify(responses, null, 2)}</pre>
      </div>
    </div>
  );
}; 