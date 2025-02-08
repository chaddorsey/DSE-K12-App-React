export interface AuthState {
  isAuthenticated: boolean;
  user: {
    id: string;
    email: string;
    roles: string[];
  } | null;
}

export interface NetworkConfig {
  retryAttempts?: number;
  offlineSupport?: boolean;
  monitoringInterval?: number;
}

export interface PerformanceConfig {
  sampleRate?: number;
  trackStateTransitions?: boolean;
  trackNetworkCalls?: boolean;
} 