/**
 * Tests for FormProvider component
 */

import React from 'react';
import { render, act } from '@testing-library/react';
import { FormProvider } from '../FormProvider';
import { useForm } from '../../../hooks/useForm';
import { mockMonitoring } from '../../../hooks/testing/mockMonitoring';
import * as yup from 'yup';

// Mock monitoring
const mockMonitors = mockMonitoring();

// Update TestForm to satisfy Record<string, unknown>
type TestForm = Record<string, unknown> & {
  name: string;
  email: string;
};

const schema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required()
});

describe('FormProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should provide form context', () => {
    const TestComponent = () => {
      const form = useForm<TestForm>({
        initialValues: { name: '', email: '' },
        validationSchema: schema
      });
      return (
        <div>
          <span>Valid: {form.isValid.toString()}</span>
          <span>Values: {JSON.stringify(form.values)}</span>
        </div>
      );
    };

    const { getByText } = render(
      <FormProvider<TestForm>
        initialValues={{ name: '', email: '' }}
        validationSchema={schema}
        onSubmit={jest.fn()}
      >
        <TestComponent />
      </FormProvider>
    );

    expect(getByText('Valid: true')).toBeInTheDocument();
    expect(getByText('Values: {"name":"","email":""}')).toBeInTheDocument();
  });

  it('should track form initialization', () => {
    render(
      <FormProvider<TestForm>
        formId="test-form"
        initialValues={{ name: '', email: '' }}
        validationSchema={schema}
        onSubmit={jest.fn()}
      >
        <div />
      </FormProvider>
    );

    expect(mockMonitors.trackPerformance).toHaveBeenCalledWith({
      type: 'form_init',
      formId: 'test-form',
      success: true,
      duration: expect.any(Number)
    });
  });
}); 