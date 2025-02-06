/**
 * Search results component with virtualization and monitoring
 */

import React, { useCallback, useMemo } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { usePerformanceMonitoring } from '../hooks/usePerformanceMonitoring';
import { useDebounce } from '../hooks/useDebounce';

interface ISearchResult {
  id: number;
  title: string;
}

interface ISearchResultsProps {
  results: ISearchResult[];
  isLoading?: boolean;
  error?: Error;
  pageSize?: number;
  totalResults?: number;
  onPageChange?: (page: number) => void;
  onSort?: (field: string, direction: 'asc' | 'desc') => void;
  onFilter?: (filters: Record<string, string>) => void;
  onSearch?: (query: string) => void;
  onRetry?: () => void;
}

export function SearchResults({
  results,
  isLoading,
  error,
  pageSize = 10,
  totalResults = results.length,
  onPageChange,
  onSort,
  onFilter,
  onSearch,
  onRetry
}: ISearchResultsProps) {
  const { trackInteraction } = usePerformanceMonitoring('SearchResults', {
    tags: { resultCount: results.length.toString() }
  });

  // Virtual list setup
  const parentRef = React.useRef<HTMLDivElement>(null);
  const rowVirtualizer = useVirtualizer({
    count: results.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
    overscan: 5
  });

  // Debounced search
  const debouncedSearch = useDebounce(onSearch, 300, {
    monitoringKey: 'search_input'
  });

  // Pagination
  const currentPage = Math.ceil(results.length / pageSize);
  const totalPages = Math.ceil(totalResults / pageSize);
  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;

  const handlePageChange = useCallback((page: number) => {
    onPageChange?.(page);
    trackInteraction('page_change', {
      metadata: { page }
    });
  }, [onPageChange, trackInteraction]);

  // Sorting
  const handleSort = useCallback((field: string, direction: 'asc' | 'desc') => {
    onSort?.(field, direction);
    trackInteraction('sort_change', {
      metadata: { field, direction }
    });
  }, [onSort, trackInteraction]);

  // Result click handling
  const handleResultClick = useCallback((result: ISearchResult) => {
    trackInteraction('result_click', {
      metadata: { resultId: result.id.toString() }
    });
  }, [trackInteraction]);

  // Keyboard navigation
  const handleKeyDown = useCallback((event: React.KeyboardEvent, index: number) => {
    if (event.key === 'ArrowDown' && index < results.length - 1) {
      const nextElement = document.querySelector(`[data-index="${index + 1}"]`);
      (nextElement as HTMLElement)?.focus();
    } else if (event.key === 'ArrowUp' && index > 0) {
      const prevElement = document.querySelector(`[data-index="${index - 1}"]`);
      (prevElement as HTMLElement)?.focus();
    }
  }, [results.length]);

  // Status message for screen readers
  const statusMessage = useMemo(() => {
    if (isLoading) return 'Loading results...';
    if (error) return 'Error loading results';
    return `Showing ${results.length} of ${totalResults} results`;
  }, [isLoading, error, results.length, totalResults]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div role="alert">
        <h2>Error loading results</h2>
        <p>{error.message}</p>
        <button onClick={onRetry}>Try Again</button>
      </div>
    );
  }

  if (!results.length) {
    return <div>No results found</div>;
  }

  return (
    <div>
      {/* Search input */}
      <input
        type="search"
        placeholder="Search results..."
        onChange={e => debouncedSearch(e.target.value)}
      />

      {/* Filters */}
      <div role="group" aria-label="Filters">
        <button
          aria-label="Filter by category"
          onClick={() => onFilter?.({ category: 'news' })}
        >
          Filter
        </button>
      </div>

      {/* Sort controls */}
      <button
        aria-label="Sort by date"
        onClick={() => handleSort('date', 'desc')}
      >
        Sort
      </button>

      {/* Results list */}
      <div
        ref={parentRef}
        style={{ height: '400px', overflow: 'auto' }}
      >
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative'
          }}
        >
          {rowVirtualizer.getVirtualItems().map(virtualRow => {
            const result = results[virtualRow.index];
            return (
              <div
                key={result.id}
                data-index={virtualRow.index}
                className="result-item"
                data-testid={`result-${result.id}`}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`
                }}
                tabIndex={0}
                onClick={() => handleResultClick(result)}
                onKeyDown={e => handleKeyDown(e, virtualRow.index)}
              >
                {result.title}
              </div>
            );
          })}
        </div>
      </div>

      {/* Pagination */}
      <div>
        <button
          aria-label="Previous page"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={!hasPrevPage}
        >
          Previous
        </button>
        <button
          aria-label="Next page"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={!hasNextPage}
        >
          Next
        </button>
      </div>

      {/* Status message */}
      <div role="status" aria-live="polite">
        {statusMessage}
      </div>
    </div>
  );
} 