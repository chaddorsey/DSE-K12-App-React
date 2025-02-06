/**
 * Tests for FormProvider component
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { FormProvider } from '../FormProvider';
import { useForm } from '../../../hooks/useForm';
import { MonitoringService } from '../../../monitoring/MonitoringService';

// Mock MonitoringService
jest.mock('../../../monitoring/MonitoringService', () => ({
  MonitoringService: {
    getInstance: jest.fn(() => ({
      trackPerformance: jest.fn()
    }))
  }
}));

interface TestForm {
  name: string;
  email: string;
  [key: string]: unknown;
}

const mockInitialValues: TestForm = {
  name: '',
  email: ''
};

const mockOnSubmit = async (values: TestForm) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 100));
  console.log('Submitted:', values);
};

const TestComponent = () => {
  const {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit
  } = useForm<TestForm>({
    initialValues: mockInitialValues,
    onSubmit: mockOnSubmit
  });

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={values.name}
        onChange={e => handleChange('name', e.target.value)}
        data-testid="name-input"
      />
      {errors?.name && <span data-testid="name-error">{errors.name}</span>}
      
      <input
        type="email"
        name="email"
        value={values.email}
        onChange={e => handleChange('email', e.target.value)}
        data-testid="email-input"
      />
      {errors?.email && <span data-testid="email-error">{errors.email}</span>}
      
      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>
    </form>
  );
};

describe('FormProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('provides form context to children', () => {
    render(
      <FormProvider
        initialValues={mockInitialValues}
        onSubmit={mockOnSubmit}
      >
        <TestComponent />
      </FormProvider>
    );

    expect(screen.getByTestId('name-input')).toBeInTheDocument();
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
  });

  it('handles form submission', async () => {
    const onSubmit = jest.fn(mockOnSubmit);
    
    render(
      <FormProvider
        initialValues={mockInitialValues}
        onSubmit={onSubmit}
      >
        <TestComponent />
      </FormProvider>
    );

    fireEvent.change(screen.getByTestId('name-input'), {
      target: { value: 'John Doe' }
    });

    fireEvent.change(screen.getByTestId('email-input'), {
      target: { value: 'john@example.com' }
    });

    fireEvent.submit(screen.getByRole('button'));

    await waitFor(() => {
      expect(screen.getByRole('button')).not.toBeDisabled();
      expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({
        name: 'John Doe',
        email: 'john@example.com'
      }));
    });
  });

  it('tracks form performance', async () => {
    const trackPerformance = jest.fn();
    (MonitoringService.getInstance as jest.Mock).mockReturnValue({
      trackPerformance
    });

    render(
      <FormProvider
        initialValues={mockInitialValues}
        onSubmit={mockOnSubmit}
      >
        <TestComponent />
      </FormProvider>
    );

    fireEvent.change(screen.getByTestId('name-input'), {
      target: { value: 'John Doe' }
    });

    expect(trackPerformance).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'form_field_change',
        totalTime: expect.any(Number)
      })
    );
  });
}); 