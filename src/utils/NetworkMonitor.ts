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
  private status: INetworkStatus;
  private listeners: Set<(status: INetworkStatus) => void>;
  private readonly pingEndpoint: string;
  private readonly checkInterval: number;
  private checkTimer?: number;

  constructor(options = { pingEndpoint: '/api/health', checkInterval: 30000 }) {
    this.status = {
      isOnline: navigator.onLine,
      lastChecked: new Date()
    };
    this.listeners = new Set();
    this.pingEndpoint = options.pingEndpoint;
    this.checkInterval = options.checkInterval;

    // Bind event handlers
    this.handleOnline = this.handleOnline.bind(this);
    this.handleOffline = this.handleOffline.bind(this);
    this.checkConnection = this.checkConnection.bind(this);

    // Set up event listeners
    window.addEventListener('online', this.handleOnline);
    window.addEventListener('offline', this.handleOffline);

    // Start periodic checks
    this.startChecking();
  }

  /**
   * Subscribe to network status changes
   * @param callback Function to call when status changes
   * @returns Cleanup function to unsubscribe
   */
  public subscribe(callback: (status: INetworkStatus) => void): () => void {
    this.listeners.add(callback);
    callback(this.status); // Initial status
    return () => this.listeners.delete(callback);
  }

  /**
   * Check current connection status
   * @returns Promise with current NetworkStatus
   */
  public async checkConnection(): Promise<INetworkStatus> {
    try {
      const startTime = Date.now();
      const response = await fetch(this.pingEndpoint);
      
      if (this.detectPortalRedirect(response)) {
        this.updateStatus({
          isOnline: false,
          lastChecked: new Date(),
          connectionType: undefined
        });
        return this.status;
      }

      const latency = Date.now() - startTime;
      const connectionType = this.determineConnectionType(latency);

      this.updateStatus({
        isOnline: true,
        connectionType,
        latency,
        lastChecked: new Date()
      });
    } catch (error) {
      this.updateStatus({
        isOnline: false,
        lastChecked: new Date(),
        connectionType: undefined
      });
    }

    return this.status;
  }

  /**
   * Clean up event listeners and timers
   */
  public destroy(): void {
    window.removeEventListener('online', this.handleOnline);
    window.removeEventListener('offline', this.handleOffline);
    if (this.checkTimer) {
      window.clearInterval(this.checkTimer);
    }
  }

  private startChecking(): void {
    this.checkConnection(); // Initial check
    this.checkTimer = window.setInterval(this.checkConnection, this.checkInterval);
  }

  private handleOnline(): void {
    this.checkConnection(); // Verify connection
  }

  private handleOffline(): void {
    this.updateStatus({
      isOnline: false,
      lastChecked: new Date(),
      connectionType: undefined
    });
  }

  public detectPortalRedirect(response: Response): boolean {
    const contentType = response.headers.get('content-type');
    return contentType?.includes('text/html') || response.redirected;
  }

  private determineConnectionType(latency: number): 'slow-2g' | '2g' | '3g' | '4g' {
    if (latency > 2000) return 'slow-2g';
    if (latency > 1000) return '2g';
    if (latency > 300) return '3g';
    return '4g';
  }

  private updateStatus(newStatus: INetworkStatus): void {
    this.status = newStatus;
    this.notifyListeners();
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.status));
  }

  public getStatus(): INetworkStatus {
    return { ...this.status };
  }
} 