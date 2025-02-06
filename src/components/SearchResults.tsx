/**
 * SearchResults component for handling search input, results display, and error states
 */

import React, { useCallback, useEffect, useState } from 'react';
import { useQuery } from '../hooks/useQuery';
import { useDebounce } from '../hooks/useDebounce';
import { MonitoringService } from '../monitoring/MonitoringService';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  metadata?: Record<string, any>;
}

interface SearchFilters {
  sortBy?: 'relevance' | 'date' | 'title';
  sortOrder?: 'asc' | 'desc';
  categories?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
}

interface FilterOption {
  id: string;
  label: string;
  value: string;
}

interface FilterGroup {
  id: string;
  label: string;
  options: FilterOption[];
}

interface SearchResultsProps {
  initialQuery?: string;
  onSearch: (query: string, filters: SearchFilters) => Promise<SearchResult[]>;
  onResultSelect?: (result: SearchResult) => void;
  viewMode?: 'grid' | 'list';
  pageSize?: number;
  debounceMs?: number;
  renderResult?: (result: SearchResult) => React.ReactNode;
  filterGroups?: FilterGroup[];
  onTypeahead?: (query: string) => Promise<SearchResult[]>;
  typeaheadDebounceMs?: number;
  minTypeaheadLength?: number;
}

const defaultFilters: FilterGroup[] = [
  {
    id: 'category',
    label: 'Category',
    options: [
      { id: 'tutorials', label: 'Tutorials', value: 'tutorials' },
      { id: 'articles', label: 'Articles', value: 'articles' },
      { id: 'videos', label: 'Videos', value: 'videos' }
    ]
  },
  {
    id: 'sort',
    label: 'Sort by',
    options: [
      { id: 'relevance', label: 'Relevance', value: 'relevance' },
      { id: 'date', label: 'Date', value: 'date' },
      { id: 'title', label: 'Title', value: 'title' }
    ]
  }
];

export function SearchResults({
  initialQuery = '',
  onSearch,
  onResultSelect,
  viewMode = 'list',
  pageSize = 10,
  debounceMs = 300,
  renderResult,
  filterGroups = defaultFilters,
  onTypeahead,
  typeaheadDebounceMs = 200,
  minTypeaheadLength = 2,
}: SearchResultsProps) {
  const monitoring = MonitoringService.getInstance();
  const [query, setQuery] = useState(initialQuery);
  const debouncedQuery = useDebounce<string>(query, debounceMs);
  const [filters, setFilters] = useState<SearchFilters>({});
  const [showTypeahead, setShowTypeahead] = useState(false);
  const debouncedTypeaheadQuery = useDebounce<string>(query, typeaheadDebounceMs);

  // Use QueryProvider for caching
  const { data: results, error, isLoading } = useQuery(
    `search:${debouncedQuery}:${JSON.stringify(filters)}`,
    async () => {
      const startTime = Date.now();
      try {
        const results = await onSearch(debouncedQuery, filters);
        monitoring.trackPerformance({
          type: 'search_execute',
          component: 'SearchResults',
          totalTime: Date.now() - startTime,
          queryTime: Date.now() - startTime,
          resultCount: results.length
        });
        return results;
      } catch (error) {
        monitoring.trackError(error as Error, {
          type: 'search_error',
          component: 'SearchResults'
        });
        throw error;
      }
    }
  );

  // Add typeahead query
  const { data: suggestions } = useQuery(
    `typeahead:${debouncedTypeaheadQuery}`,
    async () => {
      if (!onTypeahead || debouncedTypeaheadQuery.length < minTypeaheadLength) {
        return [];
      }

      const startTime = Date.now();
      try {
        const results = await onTypeahead(debouncedTypeaheadQuery);
        monitoring.trackPerformance({
          type: 'typeahead_execute',
          component: 'SearchResults',
          totalTime: Date.now() - startTime,
          resultCount: results.length
        });
        return results;
      } catch (error) {
        monitoring.trackError(error as Error, {
          type: 'typeahead_error',
          component: 'SearchResults'
        });
        return [];
      }
    }
  );

  const handleSearchInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }, []);

  const handleResultClick = useCallback((result: SearchResult) => {
    onResultSelect?.(result);
  }, [onResultSelect]);

  const handleFilterChange = useCallback((groupId: string, value: string) => {
    const startTime = Date.now();
    setFilters(prev => {
      const newFilters = { ...prev };
      
      if (groupId === 'sort') {
        newFilters.sortBy = value as 'relevance' | 'date' | 'title';
        newFilters.sortOrder = 'desc';
      } else if (groupId === 'category') {
        newFilters.categories = [...(prev.categories || [])];
        if (newFilters.categories.includes(value)) {
          newFilters.categories = newFilters.categories.filter(c => c !== value);
        } else {
          newFilters.categories.push(value);
        }
      }

      monitoring.trackPerformance({
        type: 'search_filter',
        component: 'SearchResults',
        totalTime: Date.now() - startTime,
        interaction: 'filter_change',
        metadata: {
          filterType: groupId,
          value
        }
      });

      return newFilters;
    });
  }, [monitoring]);

  const handleSuggestionClick = useCallback((suggestion: SearchResult) => {
    setQuery(suggestion.title);
    setShowTypeahead(false);
    monitoring.trackPerformance({
      type: 'typeahead_select',
      component: 'SearchResults',
      totalTime: 0,
      interaction: 'suggestion_click',
      metadata: {
        suggestionId: suggestion.id,
        value: suggestion.title
      }
    });
  }, [monitoring]);

  // Handle initial query
  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
    }
  }, [initialQuery]);

  if (error) {
    return (
      <div data-testid="search-error" role="alert">
        <h3>Error performing search</h3>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <div className="search-results">
      <div className="search-input-container">
        <input
          type="search"
          value={query}
          onChange={handleSearchInput}
          onFocus={() => setShowTypeahead(true)}
          onBlur={() => setTimeout(() => setShowTypeahead(false), 200)}
          placeholder="Search..."
          className="search-input"
        />
        
        {showTypeahead && suggestions && suggestions.length > 0 && (
          <div 
            className="typeahead-suggestions"
            data-testid="typeahead-suggestions"
            role="listbox"
          >
            {suggestions.map(suggestion => (
              <div
                key={suggestion.id}
                data-testid="typeahead-suggestion"
                role="option"
                onClick={() => handleSuggestionClick(suggestion)}
                className="typeahead-suggestion"
              >
                <div className="suggestion-title">{suggestion.title}</div>
                <div className="suggestion-description">{suggestion.description}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="search-filters" role="group" aria-label="Search filters">
        {filterGroups.map(group => (
          <div key={group.id} className="filter-group">
            <button
              aria-label={`Filter by ${group.label.toLowerCase()}`}
              aria-haspopup="listbox"
              aria-expanded="false"
            >
              {group.label}
            </button>
            <div role="listbox" aria-label={group.label}>
              {group.options.map(option => (
                <div
                  key={option.id}
                  role="option"
                  aria-selected={
                    group.id === 'sort'
                      ? filters.sortBy === option.value
                      : filters.categories?.includes(option.value)
                  }
                >
                  <button
                    aria-label={option.label}
                    onClick={() => handleFilterChange(group.id, option.value)}
                  >
                    {option.label}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {isLoading && (
        <div data-testid="search-loading" role="status">
          Loading results...
        </div>
      )}

      {!isLoading && results?.length === 0 && (
        <div data-testid="search-empty" role="status">
          No results found
        </div>
      )}

      {results && results.length > 0 && (
        <div className={`results-${viewMode}`}>
          {results.map(result => (
            <div
              key={result.id}
              data-testid="search-result"
              onClick={() => handleResultClick(result)}
              role="listitem"
            >
              {renderResult ? (
                renderResult(result)
              ) : (
                <div className="result-item">
                  <h3>{result.title}</h3>
                  <p>{result.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 