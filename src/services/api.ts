import { ApiClient } from '../api/client';

export const apiClient = new ApiClient(
  process.env.REACT_APP_API_URL || '',
  {
    'Content-Type': 'application/json'
  }
); 