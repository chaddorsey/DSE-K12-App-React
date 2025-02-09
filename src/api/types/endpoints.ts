/**
 * Type-safe endpoint registry
 */

import { IUser, IUserSettings, IDashboardData } from './models';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface IEndpointDefinition<
  TResponse,
  TBody = never,
  TParams = never,
  TQuery = never
> {
  /** Endpoint path */
  path: string;
  /** HTTP method */
  method: HttpMethod;
  /** Response type */
  response: TResponse;
  /** Request body type */
  body?: TBody;
  /** Path parameters */
  params?: TParams;
  /** Query parameters */
  query?: TQuery;
}

export const endpoints = {
  auth: {
    login: '/auth/login',
    logout: '/auth/logout'
  },
  users: {
    profile: '/users/profile',
    settings: '/users/settings'
  },
  dashboard: {
    overview: '/dashboard/overview'
  }
} as const;

// Type utilities
export type EndpointConfig = typeof endpoints;

// Helper type to get nested paths
export type NestedPaths<T, Prefix extends string = ''> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends object
          ? NestedPaths<T[K], `${Prefix}${K}.`> | `${Prefix}${K}`
          : `${Prefix}${K}`
        : never;
    }[keyof T]
  : never;

export type EndpointPath = 
  | 'auth.login' 
  | 'auth.logout'
  | 'users.profile'
  | 'users.settings'
  | 'dashboard.overview'
  | 'search.results';

export interface ApiEndpoints {
  'auth.login': {
    params: {
      email: string;
      password: string;
    };
    response: { token: string };
  };
  'auth.logout': {
    params: void;
    response: void;
  };
  'users.profile': {
    params: void;
    response: IUser;
  };
  'users.settings': {
    params: Partial<IUserSettings>;
    response: IUserSettings;
  };
  'dashboard.overview': {
    params: {
      timeframe: 'day' | 'week' | 'month' | 'year';
    };
    response: IDashboardData;
  };
  'search.results': {
    params: import('./search').SearchQuery;
    response: import('./search').SearchResult[];
  };
}

export type RequestBody<P extends EndpointPath> = ApiEndpoints[P]['params'];
export type ResponseData<P extends EndpointPath> = ApiEndpoints[P]['response'];

export interface IApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface IUseApiOptions<T = unknown> {
  initialData?: T;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  requestOptions?: Record<string, unknown>;
  retry?: boolean;
  cache?: boolean;
}

export interface IUseApiResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  request: <P extends EndpointPath>(path: P, options?: IUseApiOptions<T>) => Promise<T>;
  reset: () => void;
} 