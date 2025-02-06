/**
 * Tests for SearchResults component
 */

import React from 'react';
import { render, fireEvent, act, waitFor, RenderResult } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SearchResults } from '../SearchResults';
import { QueryProvider } from '../QueryProvider';
import { MonitoringService } from '../../monitoring/MonitoringService';
import { IPerformanceMetrics } from '../../monitoring/types';

// Mock MonitoringService
const mockTrackPerformance = jest.fn();
const mockTrackError = jest.fn();

jest.mock('../../monitoring/MonitoringService', () => ({
  MonitoringService: {
    getInstance: jest.fn(() => ({
      trackPerformance: mockTrackPerformance,
      trackError: mockTrackError
    }))
  }
}));

// Mock data
const mockResults = [
  { id: '1', title: 'React Hooks', description: 'Guide to React Hooks' },
  { id: '2', title: 'TypeScript', description: 'TypeScript basics' },
  { id: '3', title: 'Testing', description: 'Testing React components' }
];

// Mock search function
const mockSearch = jest.fn().mockResolvedValue(mockResults);

// Test utilities
interface RenderOptions {
  onSearch?: typeof mockSearch;
  onTypeahead?: jest.Mock;
  initialQuery?: string;
  [key: string]: any;
}

const renderSearchResults = (options: RenderOptions = {}): RenderResult => {
  const defaultProps = {
    onSearch: mockSearch,
    ...options
  };

  return render(
    <QueryProvider>
      <SearchResults {...defaultProps} />
    </QueryProvider>
  );
};

describe('SearchResults', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render search input', () => {
    const { getByRole } = renderSearchResults();
    expect(getByRole('searchbox')).toBeInTheDocument();
  });

  it('should handle initial query', async () => {
    const { getByRole } = renderSearchResults({
      initialQuery: 'react'
    });

    await waitFor(() => {
      expect(mockSearch).toHaveBeenCalledWith('react', expect.any(Object));
    });
  });

  it('should debounce search input', async () => {
    jest.useFakeTimers();
    const { getByRole } = renderSearchResults({ debounceMs: 300 });
    
    const searchInput = getByRole('searchbox');
    fireEvent.change(searchInput, { target: { value: 'react' } });

    // Should not call immediately
    expect(mockSearch).not.toHaveBeenCalled();

    // Fast forward debounce time
    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(mockSearch).toHaveBeenCalledWith('react', expect.any(Object));
    jest.useRealTimers();
  });

  it('should display loading state', async () => {
    const slowSearch = jest.fn().mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));
    const { getByRole, getByTestId } = renderSearchResults({
      onSearch: slowSearch
    });

    fireEvent.change(getByRole('searchbox'), { target: { value: 'react' } });
    
    expect(getByTestId('search-loading')).toBeInTheDocument();
  });

  it('should display results', async () => {
    const { getByRole, getAllByTestId } = renderSearchResults();

    fireEvent.change(getByRole('searchbox'), { target: { value: 'react' } });

    await waitFor(() => {
      const results = getAllByTestId('search-result');
      expect(results).toHaveLength(3);
      expect(results[0]).toHaveTextContent('React Hooks');
    });
  });

  it('should handle empty results', async () => {
    const emptySearch = jest.fn().mockResolvedValue([]);
    const { getByRole, getByTestId } = renderSearchResults({
      onSearch: emptySearch
    });

    fireEvent.change(getByRole('searchbox'), { target: { value: 'nonexistent' } });

    await waitFor(() => {
      expect(getByTestId('search-empty')).toBeInTheDocument();
    });
  });

  it('should track search performance', async () => {
    const { getByRole } = renderSearchResults();

    fireEvent.change(getByRole('searchbox'), { target: { value: 'react' } });

    await waitFor(() => {
      expect(mockTrackPerformance).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'search_execute',
          component: 'SearchResults',
          queryTime: expect.any(Number),
          resultCount: 3
        })
      );
    });
  });

  it('should handle search errors', async () => {
    const error = new Error('Search failed');
    const failedSearch = jest.fn().mockRejectedValue(error);
    
    const { getByRole, getByTestId } = renderSearchResults({
      onSearch: failedSearch
    });

    fireEvent.change(getByRole('searchbox'), { target: { value: 'react' } });

    await waitFor(() => {
      expect(getByTestId('search-error')).toBeInTheDocument();
      expect(mockTrackError).toHaveBeenCalledWith(
        error,
        expect.objectContaining({
          type: 'search_error',
          component: 'SearchResults'
        })
      );
    });
  });
});

describe('SearchResults filters', () => {
  it('should apply filters to search', async () => {
    const { getByRole, getByLabelText } = renderSearchResults();

    // Set search query
    fireEvent.change(getByRole('searchbox'), { target: { value: 'react' } });

    // Apply category filter
    fireEvent.click(getByLabelText('Filter by category'));
    fireEvent.click(getByLabelText('Tutorials'));

    // Apply sort
    fireEvent.click(getByLabelText('Sort by'));
    fireEvent.click(getByLabelText('Date'));

    await waitFor(() => {
      expect(mockSearch).toHaveBeenCalledWith('react', expect.objectContaining({
        categories: ['tutorials'],
        sortBy: 'date',
        sortOrder: 'desc'
      }));
    });
  });

  it('should track filter interactions', async () => {
    const { getByLabelText } = renderSearchResults();

    fireEvent.click(getByLabelText('Filter by category'));
    fireEvent.click(getByLabelText('Tutorials'));

    expect(mockTrackPerformance).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'search_filter',
        component: 'SearchResults',
        interaction: 'filter_change',
        metadata: expect.objectContaining({
          filterType: 'category',
          value: 'tutorials'
        })
      })
    );
  });
});

describe('SearchResults typeahead', () => {
  it('should show typeahead suggestions', async () => {
    const suggestions = [
      { id: 'react', title: 'React', description: 'React suggestion' },
      { id: 'redux', title: 'Redux', description: 'Redux suggestion' }
    ];
    
    const mockTypeahead = jest.fn().mockResolvedValue(suggestions);
    const { getByRole, getAllByTestId } = renderSearchResults({
      onTypeahead: mockTypeahead
    });

    // Type slowly to trigger typeahead
    fireEvent.change(getByRole('searchbox'), { target: { value: 're' } });

    await waitFor(() => {
      const typeaheadResults = getAllByTestId('typeahead-suggestion');
      expect(typeaheadResults).toHaveLength(2);
      expect(typeaheadResults[0]).toHaveTextContent('React');
    });

    // Verify performance tracking
    expect(mockTrackPerformance).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'typeahead_execute',
        component: 'SearchResults',
        totalTime: expect.any(Number)
      })
    );
  });

  it('should handle typeahead selection', async () => {
    const suggestions = [
      { id: 'react', title: 'React', description: 'React suggestion' }
    ];
    
    const mockTypeahead = jest.fn().mockResolvedValue(suggestions);
    const mockOnSearch = jest.fn().mockResolvedValue([]);
    
    const { getByRole, getByTestId } = renderSearchResults({
      onTypeahead: mockTypeahead,
      onSearch: mockOnSearch
    });

    // Type to trigger typeahead
    fireEvent.change(getByRole('searchbox'), { target: { value: 're' } });

    await waitFor(() => {
      const suggestion = getByTestId('typeahead-suggestion');
      fireEvent.click(suggestion);
    });

    // Verify the search input was updated
    expect(getByRole('searchbox')).toHaveValue('React');
    
    // Verify full search was triggered
    expect(mockOnSearch).toHaveBeenCalledWith('React', expect.any(Object));

    // Verify interaction tracking
    expect(mockTrackPerformance).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'typeahead_select',
        component: 'SearchResults',
        interaction: 'suggestion_click',
        metadata: {
          suggestionId: 'react',
          value: 'React'
        }
      })
    );
  });

  it('should debounce typeahead requests', async () => {
    jest.useFakeTimers();
    
    const mockTypeahead = jest.fn().mockResolvedValue([]);
    const { getByRole } = renderSearchResults({
      onTypeahead: mockTypeahead,
      typeaheadDebounceMs: 200
    });

    // Type quickly
    fireEvent.change(getByRole('searchbox'), { target: { value: 'r' } });
    fireEvent.change(getByRole('searchbox'), { target: { value: 're' } });
    fireEvent.change(getByRole('searchbox'), { target: { value: 'rea' } });

    // Verify no immediate calls
    expect(mockTypeahead).not.toHaveBeenCalled();

    // Fast forward debounce time
    act(() => {
      jest.advanceTimersByTime(200);
    });

    // Verify only one call with final value
    expect(mockTypeahead).toHaveBeenCalledTimes(1);
    expect(mockTypeahead).toHaveBeenCalledWith('rea');

    jest.useRealTimers();
  });

  it('should hide typeahead on blur', async () => {
    const suggestions = [
      { id: 'react', title: 'React', description: 'React suggestion' }
    ];
    
    const mockTypeahead = jest.fn().mockResolvedValue(suggestions);
    const { getByRole, queryByTestId } = renderSearchResults({
      onTypeahead: mockTypeahead
    });

    // Show typeahead
    fireEvent.change(getByRole('searchbox'), { target: { value: 're' } });
    
    await waitFor(() => {
      expect(queryByTestId('typeahead-suggestions')).toBeInTheDocument();
    });

    // Blur search input
    fireEvent.blur(getByRole('searchbox'));

    // Verify typeahead is hidden
    await waitFor(() => {
      expect(queryByTestId('typeahead-suggestions')).not.toBeInTheDocument();
    });
  });
});

describe('SearchResults content visibility', () => {
  it('should hide main content when typeahead is active', async () => {
    const suggestions = [
      { id: 'react', title: 'React', description: 'React suggestion' }
    ];
    
    const mockTypeahead = jest.fn().mockResolvedValue(suggestions);
    const { getByRole, queryByTestId } = renderSearchResults({
      onTypeahead: mockTypeahead,
      initialQuery: 'react' // Pre-load some results
    });

    // Wait for initial results to load
    await waitFor(() => {
      expect(queryByTestId('search-result')).toBeInTheDocument();
    });

    // Trigger typeahead
    fireEvent.focus(getByRole('searchbox'));
    fireEvent.change(getByRole('searchbox'), { target: { value: 're' } });

    // Main content should be hidden when typeahead is shown
    await waitFor(() => {
      expect(queryByTestId('typeahead-suggestions')).toBeInTheDocument();
      expect(queryByTestId('search-results-content')).not.toBeVisible();
    });
  });

  it('should restore main content visibility when typeahead closes', async () => {
    const suggestions = [
      { id: 'react', title: 'React', description: 'React suggestion' }
    ];
    
    const mockTypeahead = jest.fn().mockResolvedValue(suggestions);
    const { getByRole, queryByTestId } = renderSearchResults({
      onTypeahead: mockTypeahead,
      initialQuery: 'react'
    });

    // Show typeahead
    fireEvent.focus(getByRole('searchbox'));
    fireEvent.change(getByRole('searchbox'), { target: { value: 're' } });

    // Hide typeahead
    fireEvent.blur(getByRole('searchbox'));

    // Main content should be visible again
    await waitFor(() => {
      expect(queryByTestId('typeahead-suggestions')).not.toBeInTheDocument();
      expect(queryByTestId('search-results-content')).toBeVisible();
    });
  });
}); 