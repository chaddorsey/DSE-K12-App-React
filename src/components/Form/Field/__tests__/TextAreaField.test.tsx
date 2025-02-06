/**
 * Tests for TextAreaField component
 */
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { TextAreaField } from '../TextAreaField';
import { FormProvider } from '../../FormProvider';
import { mockMonitoring } from '../../../../hooks/testing/mockMonitoring';
import { verifyPerformanceTracking } from './testUtils';

const mockMonitors = mockMonitoring();

type TestForm = Record<string, unknown> & {
  description: string;
};

describe('TextAreaField', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render with label and textarea', () => {
    render(
      <FormProvider<TestForm>
        initialValues={{ description: '' }}
        onSubmit={jest.fn()}
      >
        <TextAreaField<TestForm>
          name="description"
          label="Description"
          required
        />
      </FormProvider>
    );

    expect(screen.getByLabelText('Description *')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveAttribute('name', 'description');
  });

  it('should show character count when enabled', () => {
    render(
      <FormProvider<TestForm>
        initialValues={{ description: 'Hello' }}
        onSubmit={jest.fn()}
      >
        <TextAreaField<TestForm>
          name="description"
          label="Description"
          maxLength={100}
          showCharacterCount
        />
      </FormProvider>
    );

    expect(screen.getByText('5/100')).toBeInTheDocument();
  });

  it('should handle changes and track performance', async () => {
    const handleChange = jest.fn();

    render(
      <FormProvider<TestForm>
        initialValues={{ description: '' }}
        onSubmit={jest.fn()}
      >
        <TextAreaField<TestForm>
          name="description"
          label="Description"
          onChange={handleChange}
        />
      </FormProvider>
    );

    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'New text' } });

    expect(handleChange).toHaveBeenCalled();
    expect(mockMonitors.trackPerformance).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'form_interaction',
        success: true
      })
    );
  });

  describe('performance tracking', () => {
    it('should track successful change interactions', async () => {
      const handleChange = jest.fn();
      
      render(
        <FormProvider<TestForm>
          initialValues={{ description: '' }}
          onSubmit={jest.fn()}
        >
          <TextAreaField<TestForm>
            name="description"
            label="Description"
            onChange={handleChange}
          />
        </FormProvider>
      );

      fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test content' } });
      verifyPerformanceTracking(mockMonitors);
    });

    it('should track successful blur interactions', async () => {
      const handleBlur = jest.fn();
      
      render(
        <FormProvider<TestForm>
          initialValues={{ description: '' }}
          onSubmit={jest.fn()}
        >
          <TextAreaField<TestForm>
            name="description"
            label="Description"
            onBlur={handleBlur}
          />
        </FormProvider>
      );

      fireEvent.blur(screen.getByRole('textbox'));
      verifyPerformanceTracking(mockMonitors);
    });

    it('should track character count updates', async () => {
      render(
        <FormProvider<TestForm>
          initialValues={{ description: '' }}
          onSubmit={jest.fn()}
        >
          <TextAreaField<TestForm>
            name="description"
            label="Description"
            maxLength={100}
            showCharacterCount
          />
        </FormProvider>
      );

      fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test content' } });
      verifyPerformanceTracking(mockMonitors);
      expect(screen.getByText('12/100')).toBeInTheDocument();
    });

    it('should track failed interactions', async () => {
      const error = new Error('Test error');
      const handleChange = jest.fn().mockRejectedValue(error);
      
      render(
        <FormProvider<TestForm>
          initialValues={{ description: '' }}
          onSubmit={jest.fn()}
        >
          <TextAreaField<TestForm>
            name="description"
            label="Description"
            onChange={handleChange}
          />
        </FormProvider>
      );

      fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test content' } });
      
      expect(mockMonitors.trackPerformance).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'interaction',
          success: false,
          totalTime: expect.any(Number),
          duration: expect.any(Number),
          metadata: expect.objectContaining({
            type: 'change',
            error
          })
        })
      );
    });
  });
}); 