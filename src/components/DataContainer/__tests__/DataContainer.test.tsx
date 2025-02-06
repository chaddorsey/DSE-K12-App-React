import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { DataContainer } from '../DataContainer';
import { useApi } from '../../../hooks/useApi';
import { ApiError } from '../../../api/types/errors';

// Mock useApi hook
jest.mock('../../../hooks/useApi');

describe('DataContainer', () => {
  const mockData = { id: 1, name: 'Test' };
  const mockEndpoint = 'users.profile';

  beforeEach(() => {
    (useApi as jest.Mock).mockReturnValue({
      data: null,
      loading: true,
      error: null,
      errorMessage: null,
      request: jest.fn()
    });
  });

  it('should show loading state', () => {
    render(
      <DataContainer endpoint={mockEndpoint}>
        {(data) => <div>{data.name}</div>}
      </DataContainer>
    );

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('should show custom loading component', () => {
    render(
      <DataContainer 
        endpoint={mockEndpoint}
        loadingFallback={<div>Custom loading...</div>}
      >
        {(data) => <div>{data.name}</div>}
      </DataContainer>
    );

    expect(screen.getByText('Custom loading...')).toBeInTheDocument();
  });

  it('should render data when loaded', async () => {
    (useApi as jest.Mock).mockReturnValue({
      data: mockData,
      loading: false,
      error: null,
      errorMessage: null,
      request: jest.fn()
    });

    render(
      <DataContainer endpoint={mockEndpoint}>
        {(data) => <div>Name: {data.name}</div>}
      </DataContainer>
    );

    expect(screen.getByText('Name: Test')).toBeInTheDocument();
  });

  it('should show error state', () => {
    const error = new ApiError('Test error', 500);
    (useApi as jest.Mock).mockReturnValue({
      data: null,
      loading: false,
      error,
      errorMessage: {
        title: 'Error',
        message: 'Test error'
      },
      request: jest.fn()
    });

    render(
      <DataContainer endpoint={mockEndpoint}>
        {(data) => <div>{data.name}</div>}
      </DataContainer>
    );

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Test error')).toBeInTheDocument();
  });

  it('should show custom error component', () => {
    const error = new ApiError('Test error', 500);
    (useApi as jest.Mock).mockReturnValue({
      data: null,
      loading: false,
      error,
      errorMessage: null,
      request: jest.fn()
    });

    render(
      <DataContainer 
        endpoint={mockEndpoint}
        errorFallback={<div>Custom error view</div>}
      >
        {(data) => <div>{data.name}</div>}
      </DataContainer>
    );

    expect(screen.getByText('Custom error view')).toBeInTheDocument();
  });
}); 