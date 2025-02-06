import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { DataContainer } from '../DataContainer';
import { useApi } from '../../../hooks/useApi';
import { usePerformanceMonitoring } from '../../../monitoring/hooks/useMonitoring';

// Mock hooks
jest.mock('../../../hooks/useApi');
jest.mock('../../../monitoring/hooks/useMonitoring', () => ({
  usePerformanceMonitoring: jest.fn()
}));

describe('DataContainer', () => {
  const mockUseApi = useApi as jest.Mock;
  const mockData = { id: 1, name: 'Test' };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseApi.mockReturnValue({
      data: null,
      loading: false,
      error: null,
      request: jest.fn()
    });
  });

  it('should render loading state', () => {
    mockUseApi.mockReturnValue({
      loading: true,
      error: null,
      data: null,
      request: jest.fn()
    });

    render(
      <DataContainer endpoint="users.profile">
        {(data) => <div>{data.name}</div>}
      </DataContainer>
    );

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('should render error state', () => {
    mockUseApi.mockReturnValue({
      loading: false,
      error: new Error('Test error'),
      data: null,
      request: jest.fn()
    });

    render(
      <DataContainer endpoint="users.profile">
        {(data) => <div>{data.name}</div>}
      </DataContainer>
    );

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Test error')).toBeInTheDocument();
  });

  it('should render data when loaded', async () => {
    mockUseApi.mockReturnValue({
      loading: false,
      error: null,
      data: mockData,
      request: jest.fn()
    });

    render(
      <DataContainer endpoint="users.profile">
        {(data) => <div>{data.name}</div>}
      </DataContainer>
    );

    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('should handle custom loading component', () => {
    mockUseApi.mockReturnValue({
      loading: true,
      error: null,
      data: null,
      request: jest.fn()
    });

    render(
      <DataContainer 
        endpoint="users.profile"
        loadingFallback={<div>Custom loading...</div>}
      >
        {(data) => <div>{data.name}</div>}
      </DataContainer>
    );

    expect(screen.getByText('Custom loading...')).toBeInTheDocument();
  });

  it('should track performance', () => {
    render(
      <DataContainer endpoint="users.profile">
        {(data) => <div>{data.name}</div>}
      </DataContainer>
    );

    expect(usePerformanceMonitoring).toHaveBeenCalledWith('DataContainer');
  });
}); 