import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { FormContainer } from '../FormContainer';
import { ErrorBoundary } from '../../ErrorBoundary';
import { ApiError } from '../../../api/types/errors';
import { useApi } from '../../../hooks/useApi';

// Mock hooks
jest.mock('../../../hooks/useApi');
const mockUseApi = useApi as jest.Mock;

describe('FormContainer Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should work with error boundary', async () => {
    const error = new ApiError('API Error', 500);
    mockUseApi.mockReturnValue({
      loading: false,
      error,
      request: jest.fn()
    });

    render(
      <ErrorBoundary>
        <FormContainer
          endpoint="users.settings"
          initialValues={{ name: '' }}
          onSubmit={jest.fn()}
        >
          {() => { throw error; }}
        </FormContainer>
      </ErrorBoundary>
    );

    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('should handle nested form containers', async () => {
    render(
      <FormContainer endpoint="users.profile" initialValues={{ name: '' }}>
        {({ data: profile }) => (
          <FormContainer endpoint="users.settings" initialValues={{ theme: '' }}>
            {({ data: settings, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <input value={profile.name} readOnly />
                <input value={settings.theme} readOnly />
                <button type="submit">Submit</button>
              </form>
            )}
          </FormContainer>
        )}
      </FormContainer>
    );

    await waitFor(() => {
      expect(screen.getAllByRole('textbox')).toHaveLength(2);
    });
  });
}); 