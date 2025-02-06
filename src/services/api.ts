import { ApiClient } from '../api/ApiClient';
import { networkClient } from './network';

export const apiClient = new ApiClient(networkClient, {
  baseUrl: process.env.REACT_APP_API_URL || '',
  defaultHeaders: {
    'Content-Type': 'application/json'
  }
}); 