/**
 * Network service singleton for application-wide network management
 */

import { NetworkMonitor } from '../utils/NetworkMonitor';
import { NetworkClient } from '../utils/NetworkClient';

// Create monitor instance
export const networkMonitor = new NetworkMonitor({
  pingEndpoint: '/api/health',
  checkInterval: 30000
});

// Create client instance
export const networkClient = new NetworkClient(networkMonitor, {
  baseUrl: process.env.REACT_APP_API_URL || '',
  maxAttempts: 3,
  initialDelay: 1000,
  maxDelay: 10000,
  timeout: 15000
}); 