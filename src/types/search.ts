import type { EndpointPath } from './api';

export interface SearchQuery {
  term: string;
  filters?: {
    category?: string[];
    dateRange?: {
      start: Date;
      end: Date;
    };
  };
}

export interface SearchResult {
  id: number;
  title: string;
  description: string;
  category: string;
  date: string;
}

export interface SearchEndpoints {
  'search.results': {
    params: SearchQuery;
    response: SearchResult[];
  };
} 