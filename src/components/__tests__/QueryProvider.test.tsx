/**
 * Tests for QueryProvider component
 */

import React from 'react';
import { render, act } from '@testing-library/react';
import { QueryProvider } from '../QueryProvider';
import { useQuery } from '../../hooks/useQuery';
import { mockMonitoring } from '../../hooks/testing/mockMonitoring';

describe('QueryProvider', () => {
  const mockMonitors = mockMonitoring();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should provide query cache context', async () => {
    const TestComponent = () => {
      const { data } = useQuery('test', () => Promise.resolve('data'));
      return <div>{data}</div>;
    };

    const { findByText } = render(
      <QueryProvider>
        <TestComponent />
      </QueryProvider>
    );

    expect(await findByText('data')).toBeInTheDocument();
  });

  it('should handle cache invalidation', async () => {
    const fetchData = jest.fn()
      .mockResolvedValueOnce('first')
      .mockResolvedValueOnce('second');

    const TestComponent = () => {
      const { data, invalidate } = useQuery('test', fetchData);
      return (
        <div>
          <span>{data}</span>
          <button onClick={() => invalidate()}>Invalidate</button>
        </div>
      );
    };

    const { getByText, findByText } = render(
      <QueryProvider>
        <TestComponent />
      </QueryProvider>
    );

    expect(await findByText('first')).toBeInTheDocument();

    await act(async () => {
      getByText('Invalidate').click();
    });

    expect(await findByText('second')).toBeInTheDocument();
    expect(fetchData).toHaveBeenCalledTimes(2);
  });

  it('should track cache performance', async () => {
    const TestComponent = () => {
      const { data } = useQuery('test', () => Promise.resolve('data'));
      return <div>{data}</div>;
    };

    render(
      <QueryProvider>
        <TestComponent />
      </QueryProvider>
    );

    expect(mockMonitors.trackPerformance).toHaveBeenCalledWith({
      operation: 'query_cache_init',
      component: 'QueryProvider',
      totalTime: expect.any(Number)
    });
  });

  it('should handle concurrent queries', async () => {
    const TestComponent = () => {
      const { data: data1 } = useQuery('test1', () => Promise.resolve('data1'));
      const { data: data2 } = useQuery('test2', () => Promise.resolve('data2'));
      return (
        <div>
          <span>{data1}</span>
          <span>{data2}</span>
        </div>
      );
    };

    const { findByText } = render(
      <QueryProvider>
        <TestComponent />
      </QueryProvider>
    );

    expect(await findByText('data1')).toBeInTheDocument();
    expect(await findByText('data2')).toBeInTheDocument();
  });
}); 