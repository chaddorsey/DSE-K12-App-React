/**
 * NetworkMonitor: Handles network status detection and management
 * for unreliable conference/hotel WiFi environments.
 */

/**
 * Network status and monitoring interfaces
 */

export interface INetworkStatus {
  isOnline: boolean;
  connectionType?: 'slow-2g' | '2g' | '3g' | '4g';
  lastChecked: Date;
  latency?: number;
}

export interface INetworkEvent {
  type: 'status-change' | 'portal-redirect' | 'api-failure';
  timestamp: Date;
  details: Record<string, unknown>;
}

export interface INetworkMonitorOptions {
  pingEndpoint: string;
  checkInterval: number;
}

export class NetworkMonitor {
  private subscribers: ((status: { isOnline: boolean }) => void)[] = [];

  getStatus() {
    return { isOnline: navigator.onLine };
  }

  async checkConnection(): Promise<{ isOnline: boolean }> {
    try {
      await fetch('/ping');
      return { isOnline: true };
    } catch {
      return { isOnline: false };
    }
  }

  subscribe(callback: (status: { isOnline: boolean }) => void) {
    this.subscribers.push(callback);
  }

  destroy() {
    this.subscribers = [];
  }
} 