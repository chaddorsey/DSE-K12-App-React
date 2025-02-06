import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { FormContainer } from '../FormContainer';
import { useApi } from '../../../hooks/useApi';
import { ApiError } from '../../../api/types/errors';

jest.mock('../../../hooks/useApi');
jest.mock('../../../utils/logger');

describe('FormContainer', () => {
  const mockEndpoint = 'users.settings';
  const mockInitialData = { name: 'Test User' };

  beforeEach(() => {
    (useApi as jest.Mock).mockReturnValue({
      loading: false,
      error: null,
      errorMessage: null,
      request: jest.fn().mockResolvedValue({})
    });
  });

  it('should render form with initial data', () => {
    render(
      <FormContainer 
        endpoint={mockEndpoint}
        initialData={mockInitialData}
      >
        {({ data, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <input value={data.name} readOnly />
          </form>
        )}
      </FormContainer>
    );

    expect(screen.getByDisplayValue('Test User')).toBeInTheDocument();
  });

  it('should handle field updates', () => {
    render(
      <FormContainer endpoint={mockEndpoint}>
        {({ data, setFieldValue }) => (
          <input
            value={data.name || ''}
            onChange={e => setFieldValue('name', e.target.value)}
          />
        )}
      </FormContainer>
    );

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'New Name' } });

    expect(input).toHaveValue('New Name');
  });

  it('should validate form before submission', async () => {
    const mockValidate = jest.fn().mockReturnValue({ name: 'Required' });
    const mockRequest = jest.fn();
    (useApi as jest.Mock).mockReturnValue({
      loading: false,
      error: null,
      request: mockRequest
    });

    render(
      <FormContainer 
        endpoint={mockEndpoint}
        validate={mockValidate}
      >
        {({ errors, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <button type="submit">Submit</button>
            {errors.name && <span>{errors.name}</span>}
          </form>
        )}
      </FormContainer>
    );

    fireEvent.click(screen.getByText('Submit'));

    expect(mockRequest).not.toHaveBeenCalled();
    expect(screen.getByText('Required')).toBeInTheDocument();
  });

  it('should submit form when valid', async () => {
    const mockOnSuccess = jest.fn();
    const mockRequest = jest.fn().mockResolvedValue({});
    (useApi as jest.Mock).mockReturnValue({
      loading: false,
      error: null,
      request: mockRequest
    });

    render(
      <FormContainer 
        endpoint={mockEndpoint}
        initialData={mockInitialData}
        onSuccess={mockOnSuccess}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <button type="submit">Submit</button>
          </form>
        )}
      </FormContainer>
    );

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(mockRequest).toHaveBeenCalledWith(
        mockEndpoint,
        expect.objectContaining({
          body: mockInitialData
        })
      );
      expect(mockOnSuccess).toHaveBeenCalled();
    });
  });

  it('should show error message on submission failure', async () => {
    const error = new ApiError('Submission failed', 500);
    (useApi as jest.Mock).mockReturnValue({
      loading: false,
      error,
      errorMessage: {
        title: 'Error',
        message: 'Submission failed'
      },
      request: jest.fn().mockRejectedValue(error)
    });

    render(
      <FormContainer endpoint={mockEndpoint}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <button type="submit">Submit</button>
          </form>
        )}
      </FormContainer>
    );

    fireEvent.click(screen.getByText('Submit'));

    expect(await screen.findByText('Submission failed')).toBeInTheDocument();
  });
}); 