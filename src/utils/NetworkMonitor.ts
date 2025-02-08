/**
 * NetworkMonitor: Handles network status detection and management
 * for unreliable conference/hotel WiFi environments.
 */

/**
 * Network status and monitoring interfaces
 */

export interface INetworkStatus {
  isOnline: boolean;
  connectionQuality?: 'good' | 'poor' | 'offline';
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
  private static instance: NetworkMonitor;
  private subscribers: Array<(status: INetworkStatus) => void> = [];
  private currentStatus: INetworkStatus = { isOnline: true };

  private constructor() {
    this.initializeListeners();
  }

  public static getInstance(): NetworkMonitor {
    if (!NetworkMonitor.instance) {
      NetworkMonitor.instance = new NetworkMonitor();
    }
    return NetworkMonitor.instance;
  }

  private initializeListeners(): void {
    window.addEventListener('online', () => this.updateStatus({ isOnline: true }));
    window.addEventListener('offline', () => this.updateStatus({ isOnline: false }));
  }

  public updateStatus(status: Partial<INetworkStatus>): void {
    this.currentStatus = { ...this.currentStatus, ...status };
    this.notifySubscribers();
  }

  public getStatus(): INetworkStatus {
    return { ...this.currentStatus };
  }

  public subscribe(callback: (status: INetworkStatus) => void): () => void {
    this.subscribers.push(callback);
    callback(this.currentStatus); // Initial status
    
    return () => {
      this.subscribers = this.subscribers.filter(cb => cb !== callback);
    };
  }

  private notifySubscribers(): void {
    this.subscribers.forEach(callback => callback(this.currentStatus));
  }

  public destroy(): void {
    window.removeEventListener('online', () => this.updateStatus({ isOnline: true }));
    window.removeEventListener('offline', () => this.updateStatus({ isOnline: false }));
    this.subscribers = [];
  }
} 