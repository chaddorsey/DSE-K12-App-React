export type EndpointPath = 
  | 'auth.login' 
  | 'auth.logout'
  | 'users.profile'
  | 'users.settings'
  | 'dashboard.stats'
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
    response: {
      id: string;
      email: string;
      name: string;
    };
  };
  'users.settings': {
    params: {
      notifications: boolean;
      theme: 'light' | 'dark';
    };
    response: void;
  };
  'dashboard.stats': {
    params: {
      timeframe: 'day' | 'week' | 'month';
    };
    response: {
      views: number;
      interactions: number;
    };
  };
  'search.results': {
    params: import('./search').SearchQuery;
    response: import('./search').SearchResult[];
  };
}

export type RequestBody<P extends EndpointPath> = ApiEndpoints[P]['params'];
export type ResponseData<P extends EndpointPath> = ApiEndpoints[P]['response']; 