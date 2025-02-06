import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { FormContainer } from '../FormContainer';
import { useApi } from '../../../hooks/useApi';
import { usePerformanceMonitoring } from '../../../monitoring/hooks/useMonitoring';
import * as yup from 'yup';
import { MonitoringService } from '../../../monitoring/MonitoringService';
import { EndpointPath } from '../../../api/types/endpoints';

// Mock hooks
jest.mock('../../../hooks/useApi');
jest.mock('../../../monitoring/hooks/useMonitoring', () => ({
  usePerformanceMonitoring: jest.fn()
}));

// Mock MonitoringService
jest.mock('../../../monitoring/MonitoringService', () => ({
  MonitoringService: {
    getInstance: jest.fn(() => ({
      trackPerformance: jest.fn()
    }))
  }
}));

const TEST_ENDPOINT = 'users.settings' as EndpointPath;

interface IFormValues extends Record<string, unknown> {
  name: string;
  email: string;
}

describe('FormContainer', () => {
  const mockUseApi = useApi as jest.Mock;
  const mockInitialValues: IFormValues = { name: '', email: '' };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseApi.mockReturnValue({
      loading: false,
      error: null,
      request: jest.fn()
    });
  });

  it('renders form with initial values', () => {
    const initialValues: IFormValues = {
      name: 'John Doe',
      email: 'john@example.com'
    };

    render(
      <FormContainer
        endpoint={TEST_ENDPOINT}
        initialValues={initialValues}
        onSubmit={jest.fn()}
      >
        {({ data, handleChange }) => (
          <form>
            <input
              type="text"
              name="name"
              value={data.name as string}
              onChange={e => handleChange('name', e.target.value)}
              data-testid="name-input"
            />
            <input
              type="email"
              name="email"
              value={data.email as string}
              onChange={e => handleChange('email', e.target.value)}
              data-testid="email-input"
            />
          </form>
        )}
      </FormContainer>
    );

    expect(screen.getByTestId('name-input')).toHaveValue('John Doe');
    expect(screen.getByTestId('email-input')).toHaveValue('john@example.com');
  });

  it('handles form submission', async () => {
    const onSubmit = jest.fn();

    render(
      <FormContainer
        endpoint={TEST_ENDPOINT}
        initialValues={mockInitialValues}
        onSubmit={onSubmit}
      >
        {({ data, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={data.name as string}
              onChange={e => handleChange('name', e.target.value)}
              data-testid="name-input"
            />
            <input
              type="email"
              name="email"
              value={data.email as string}
              onChange={e => handleChange('email', e.target.value)}
              data-testid="email-input"
            />
            <button type="submit">Submit</button>
          </form>
        )}
      </FormContainer>
    );

    fireEvent.change(screen.getByTestId('name-input'), {
      target: { value: 'John Doe' }
    });

    fireEvent.change(screen.getByTestId('email-input'), {
      target: { value: 'john@example.com' }
    });

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com'
      });
    });
  });

  it('tracks form performance', () => {
    const trackPerformance = jest.fn();
    (MonitoringService.getInstance as jest.Mock).mockReturnValue({
      trackPerformance
    });

    render(
      <FormContainer
        endpoint={TEST_ENDPOINT}
        initialValues={mockInitialValues}
        onSubmit={jest.fn()}
      >
        {() => <form />}
      </FormContainer>
    );

    expect(trackPerformance).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'form_init',
        totalTime: expect.any(Number)
      })
    );
  });

  it('should handle field changes', async () => {
    render(
      <FormContainer
        endpoint={TEST_ENDPOINT}
        initialValues={mockInitialValues}
        onSubmit={jest.fn()}
      >
        {({ data, handleChange }) => (
          <form>
            <input
              value={data.name as string}
              onChange={e => handleChange('name', e.target.value)}
            />
          </form>
        )}
      </FormContainer>
    );

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Test Name' } });

    await waitFor(() => {
      expect(input).toHaveValue('Test Name');
    });
  });

  it('should validate fields', async () => {
    const schema = yup.object({
      name: yup.string().required('Name is required')
    });

    render(
      <FormContainer
        endpoint={TEST_ENDPOINT}
        initialValues={mockInitialValues}
        validationSchema={schema}
        onSubmit={jest.fn()}
      >
        {({ data, errors, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <input
              value={data.name as string}
              onChange={e => handleChange('name', e.target.value)}
            />
            {errors.name && <span role="alert">{errors.name}</span>}
            <button type="submit">Submit</button>
          </form>
        )}
      </FormContainer>
    );

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Name is required');
    });
  });

  it('should handle successful submission', async () => {
    const onSubmit = jest.fn();
    const validValues = { name: 'Test', email: 'test@example.com' };

    render(
      <FormContainer
        endpoint={TEST_ENDPOINT}
        initialValues={mockInitialValues}
        onSubmit={onSubmit}
      >
        {({ data, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <input
              value={data.name as string}
              onChange={e => handleChange('name', e.target.value)}
            />
            <button type="submit">Submit</button>
          </form>
        )}
      </FormContainer>
    );

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: validValues.name } });
    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({
        name: validValues.name
      }));
    });
  });
}); 