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
export type EndpointPath = PathsOf<EndpointConfig>;
export type ResponseType<P extends EndpointPath> = ExtractResponse<EndpointConfig, P>;
export type RequestBody<P extends EndpointPath> = ExtractBody<EndpointConfig, P>; 