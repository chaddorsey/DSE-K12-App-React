/**
 * Tests for TextField component
 */

import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { TextField } from '../TextField';
import { FormProvider } from '../../FormProvider';
import { mockMonitoring } from '../../../../hooks/testing/mockMonitoring';
import { verifyPerformanceTracking } from './testUtils';

const mockMonitors = mockMonitoring();

type TestForm = Record<string, unknown> & {
  name: string;
  email: string;
};

describe('TextField', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render with label and input', () => {
    render(
      <FormProvider<TestForm>
        initialValues={{ name: '', email: '' }}
        onSubmit={jest.fn()}
      >
        <TextField<TestForm>
          name="name"
          label="Name"
          required
        />
      </FormProvider>
    );

    expect(screen.getByLabelText('Name *')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveAttribute('name', 'name');
  });

  it('should show error message when invalid', () => {
    render(
      <FormProvider<TestForm>
        initialValues={{ name: '', email: '' }}
        onSubmit={jest.fn()}
      >
        <TextField<TestForm>
          name="name"
          label="Name"
          error="Name is required"
        />
      </FormProvider>
    );

    expect(screen.getByText('Name is required')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('should call form handlers on change and blur', () => {
    const handleChange = jest.fn();
    const handleBlur = jest.fn();

    render(
      <FormProvider<TestForm>
        initialValues={{ name: '', email: '' }}
        onSubmit={jest.fn()}
      >
        <TextField<TestForm>
          name="name"
          label="Name"
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </FormProvider>
    );

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.blur(input);

    expect(handleChange).toHaveBeenCalled();
    expect(handleBlur).toHaveBeenCalled();
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
          initialValues={{ username: '' }}
          onSubmit={jest.fn()}
        >
          <TextField<TestForm>
            name="username"
            label="Username"
            onChange={handleChange}
          />
        </FormProvider>
      );

      fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test' } });
      verifyPerformanceTracking(mockMonitors);
    });

    it('should track successful blur interactions', async () => {
      const handleBlur = jest.fn();
      
      render(
        <FormProvider<TestForm>
          initialValues={{ username: '' }}
          onSubmit={jest.fn()}
        >
          <TextField<TestForm>
            name="username"
            label="Username"
            onBlur={handleBlur}
          />
        </FormProvider>
      );

      fireEvent.blur(screen.getByRole('textbox'));
      verifyPerformanceTracking(mockMonitors);
    });

    it('should track failed interactions', async () => {
      const error = new Error('Test error');
      const handleChange = jest.fn().mockRejectedValue(error);
      
      render(
        <FormProvider<TestForm>
          initialValues={{ username: '' }}
          onSubmit={jest.fn()}
        >
          <TextField<TestForm>
            name="username"
            label="Username"
            onChange={handleChange}
          />
        </FormProvider>
      );

      fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test' } });
      
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