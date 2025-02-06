/**
 * Type-safe endpoint registry
 */

import { IUser, IUserSettings } from './models';

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
    login: {
      path: '/auth/login',
      method: 'POST',
      response: {} as { token: string },
      body: {} as { username: string; password: string }
    },
    logout: {
      path: '/auth/logout',
      method: 'POST',
      response: {} as void
    }
  },
  users: {
    profile: {
      path: '/users/profile',
      method: 'GET',
      response: {} as IUser
    },
    settings: {
      path: '/users/settings',
      method: 'PUT',
      response: {} as IUserSettings,
      body: {} as Partial<IUserSettings>
    }
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

export type EndpointPath = NestedPaths<typeof endpoints>;

export type ResponseType<P extends EndpointPath> = ExtractResponse<EndpointConfig, P>;
export type RequestBody<P extends EndpointPath> = ExtractBody<EndpointConfig, P>;

export type ApiResponse<P extends EndpointPath> = 
  typeof endpoints[P] extends { response: infer R } ? R : never;

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