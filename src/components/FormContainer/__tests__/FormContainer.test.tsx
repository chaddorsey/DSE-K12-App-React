import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { FormContainer } from '../FormContainer';
import { useApi } from '../../../hooks/useApi';
import { usePerformanceMonitoring } from '../../../monitoring/hooks/useMonitoring';
import * as yup from 'yup';

// Mock hooks
jest.mock('../../../hooks/useApi');
jest.mock('../../../monitoring/hooks/useMonitoring', () => ({
  usePerformanceMonitoring: jest.fn()
}));

describe('FormContainer', () => {
  const mockUseApi = useApi as jest.Mock;
  const mockInitialValues = { name: '', email: '' };
  const mockEndpoint = 'users.settings';

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseApi.mockReturnValue({
      loading: false,
      error: null,
      request: jest.fn()
    });
  });

  it('should render form with initial values', () => {
    render(
      <FormContainer
        endpoint={mockEndpoint}
        initialValues={mockInitialValues}
        onSubmit={jest.fn()}
      >
        {({ data }) => (
          <form>
            <input value={data.name} readOnly />
            <input value={data.email} readOnly />
          </form>
        )}
      </FormContainer>
    );

    const inputs = screen.getAllByRole('textbox');
    expect(inputs[0]).toHaveValue('');
    expect(inputs[1]).toHaveValue('');
  });

  it('should handle field changes', async () => {
    render(
      <FormContainer
        endpoint={mockEndpoint}
        initialValues={mockInitialValues}
        onSubmit={jest.fn()}
      >
        {({ data, setFieldValue }) => (
          <form>
            <input
              value={data.name}
              onChange={e => setFieldValue('name', e.target.value)}
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
        endpoint={mockEndpoint}
        initialValues={mockInitialValues}
        validationSchema={schema}
        onSubmit={jest.fn()}
      >
        {({ data, errors, setFieldValue, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <input
              value={data.name}
              onChange={e => setFieldValue('name', e.target.value)}
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
        endpoint={mockEndpoint}
        initialValues={mockInitialValues}
        onSubmit={onSubmit}
      >
        {({ data, setFieldValue, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <input
              value={data.name}
              onChange={e => setFieldValue('name', e.target.value)}
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

  it('should track performance', () => {
    render(
      <FormContainer
        endpoint={mockEndpoint}
        initialValues={mockInitialValues}
        onSubmit={jest.fn()}
      >
        {() => <form />}
      </FormContainer>
    );

    expect(usePerformanceMonitoring).toHaveBeenCalledWith('FormContainer');
  });
}); 