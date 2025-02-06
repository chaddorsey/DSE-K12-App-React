/**
 * Tests for SearchResults component
 */

import React from 'react';
import { render, act, fireEvent, screen } from '@testing-library/react';
import { SearchResults } from '../SearchResults';
import { mockMonitoring } from '../../hooks/testing/mockMonitoring';

describe('SearchResults', () => {
  const mockMonitors = mockMonitoring();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should track render performance', () => {
    render(<SearchResults results={[]} />);

    expect(mockMonitors.trackPerformance).toHaveBeenCalledWith({
      operation: 'render',
      component: 'SearchResults',
      totalTime: expect.any(Number)
    });
  });

  it('should track interaction times', async () => {
    const { getByTestId } = render(
      <SearchResults 
        results={[{ id: 1, title: 'Test' }]} 
      />
    );

    await act(async () => {
      getByTestId('result-1').click();
    });

    expect(mockMonitors.trackPerformance).toHaveBeenCalledWith({
      operation: 'interaction',
      component: 'SearchResults',
      totalTime: expect.any(Number),
      metadata: {
        type: 'result_click',
        resultId: '1'
      }
    });
  });

  it('should track result rendering metrics', () => {
    const results = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      title: `Result ${i}`
    }));

    render(<SearchResults results={results} />);

    expect(mockMonitors.trackPerformance).toHaveBeenCalledWith({
      operation: 'render',
      component: 'SearchResults',
      totalTime: expect.any(Number),
      metadata: {
        resultCount: 100
      }
    });
  });

  it('should render search results', () => {
    const results = [
      { id: 1, title: 'Result 1' },
      { id: 2, title: 'Result 2' }
    ];

    const { getByText } = render(<SearchResults results={results} />);

    expect(getByText('Result 1')).toBeInTheDocument();
    expect(getByText('Result 2')).toBeInTheDocument();
  });

  it('should show loading state', () => {
    const { getByText } = render(
      <SearchResults results={[]} isLoading={true} />
    );

    expect(getByText('Loading...')).toBeInTheDocument();
  });

  it('should show empty state', () => {
    const { getByText } = render(<SearchResults results={[]} />);

    expect(getByText('No results found')).toBeInTheDocument();
  });

  describe('pagination behavior', () => {
    it('should handle page changes', () => {
      const onPageChange = jest.fn();
      const { getByLabelText } = render(
        <SearchResults 
          results={Array(20).fill(null)} 
          pageSize={10}
          onPageChange={onPageChange}
        />
      );

      fireEvent.click(getByLabelText('Next page'));
      
      expect(onPageChange).toHaveBeenCalledWith(2);
      expect(mockMonitors.trackInteraction).toHaveBeenCalledWith({
        operation: 'page_change',
        component: 'SearchResults',
        metadata: { page: 2 }
      });
    });

    it('should disable pagination buttons appropriately', () => {
      const { getByLabelText } = render(
        <SearchResults 
          results={Array(5).fill(null)}
          pageSize={10}
        />
      );

      expect(getByLabelText('Next page')).toBeDisabled();
      expect(getByLabelText('Previous page')).toBeDisabled();
    });
  });

  describe('sorting and filtering', () => {
    it('should handle sort changes', () => {
      const onSort = jest.fn();
      const { getByLabelText } = render(
        <SearchResults 
          results={[]}
          onSort={onSort}
        />
      );

      fireEvent.click(getByLabelText('Sort by date'));
      
      expect(onSort).toHaveBeenCalledWith('date', 'desc');
      expect(mockMonitors.trackInteraction).toHaveBeenCalledWith({
        operation: 'sort_change',
        component: 'SearchResults',
        metadata: { field: 'date', direction: 'desc' }
      });
    });

    it('should apply filters', () => {
      const onFilter = jest.fn();
      const { getByLabelText } = render(
        <SearchResults 
          results={[]}
          onFilter={onFilter}
        />
      );

      fireEvent.click(getByLabelText('Filter by category'));
      fireEvent.click(getByLabelText('News'));

      expect(onFilter).toHaveBeenCalledWith({ category: 'news' });
    });
  });

  describe('performance optimization', () => {
    it('should virtualize long lists', () => {
      const results = Array.from({ length: 1000 }, (_, i) => ({
        id: i,
        title: `Result ${i}`
      }));

      const { container, queryByText } = render(
        <SearchResults results={results} />
      );

      // Should only render visible items
      expect(container.querySelectorAll('.result-item')).toHaveLength(20);
      expect(queryByText('Result 999')).not.toBeInTheDocument();
    });

    it('should debounce search input', async () => {
      const onSearch = jest.fn();
      const { getByPlaceholderText } = render(
        <SearchResults 
          results={[]}
          onSearch={onSearch}
        />
      );

      const input = getByPlaceholderText('Search results...');
      fireEvent.change(input, { target: { value: 'test' } });

      // Should not call immediately
      expect(onSearch).not.toHaveBeenCalled();

      // Wait for debounce
      await act(async () => {
        await new Promise(r => setTimeout(r, 300));
      });

      expect(onSearch).toHaveBeenCalledWith('test');
    });
  });

  describe('accessibility', () => {
    it('should support keyboard navigation', () => {
      const results = [
        { id: 1, title: 'Result 1' },
        { id: 2, title: 'Result 2' }
      ];

      const { getByText } = render(<SearchResults results={results} />);
      
      const firstResult = getByText('Result 1');
      firstResult.focus();

      fireEvent.keyDown(firstResult, { key: 'ArrowDown' });
      expect(document.activeElement).toHaveTextContent('Result 2');
    });

    it('should announce result count', () => {
      render(
        <SearchResults 
          results={Array(5).fill(null)}
          totalResults={100}
        />
      );

      expect(screen.getByRole('status'))
        .toHaveTextContent('Showing 5 of 100 results');
    });
  });

  describe('error handling', () => {
    it('should show error state', () => {
      const error = new Error('Failed to load results');
      const { getByText } = render(
        <SearchResults 
          results={[]}
          error={error}
        />
      );

      expect(getByText('Error loading results')).toBeInTheDocument();
      expect(getByText(error.message)).toBeInTheDocument();
    });

    it('should handle retry', async () => {
      const onRetry = jest.fn();
      const { getByText } = render(
        <SearchResults 
          results={[]}
          error={new Error('Failed')}
          onRetry={onRetry}
        />
      );

      await act(async () => {
        fireEvent.click(getByText('Try Again'));
      });

      expect(onRetry).toHaveBeenCalled();
    });
  });
}); 