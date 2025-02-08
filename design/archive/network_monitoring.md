# Network Status Monitoring System Design

## Current Context
- Application runs in hotel/conference environments with unreliable WiFi
- No current network status monitoring or user feedback
- Users experience disconnections and portal redirects without clear indication

## Requirements

### Functional Requirements
1. **Network Status Detection:**
   - Monitor connection status (online/offline)
   - Detect slow connections (>3G)
   - Identify portal redirect attempts
   - Track API request success/failure rates

2. **User Feedback:**
   - Show connection status indicator
   - Display meaningful error messages
   - Provide reconnection guidance
   - Indicate portal redirect detection

3. **Event Handling:**
   - Trigger retry mechanisms on failure
   - Cache necessary data during interruptions
   - Handle reconnection gracefully
   - Log network events for debugging

### Non-Functional Requirements
- Status updates within 1 second of network changes
- Minimal impact on bundle size (<10KB)
- No false positives for network status
- Clear, non-technical error messages

## Technical Design

### 1. NetworkMonitor Class
```typescript
interface NetworkStatus {
  isOnline: boolean;
  connectionType?: 'slow-2g' | '2g' | '3g' | '4g';
  lastChecked: Date;
  latency?: number;
}

interface NetworkEvent {
  type: 'status-change' | 'portal-redirect' | 'api-failure';
  timestamp: Date;
  details: Record<string, unknown>;
}

class NetworkMonitor {
  private status: NetworkStatus;
  private listeners: Set<(status: NetworkStatus) => void>;
  
  constructor() {
    this.status = {
      isOnline: navigator.onLine,
      lastChecked: new Date()
    };
    this.listeners = new Set();
  }

  public subscribe(callback: (status: NetworkStatus) => void): () => void;
  public checkConnection(): Promise<NetworkStatus>;
  private handleNetworkChange(event: Event): void;
  private detectPortalRedirect(response: Response): boolean;
  private measureLatency(): Promise<number>;
}
```

### 2. NetworkStatusIndicator Component
```typescript
interface Props {
  position?: 'top' | 'bottom';
  showLatency?: boolean;
}

const NetworkStatusIndicator: React.FC<Props> = ({ 
  position = 'top',
  showLatency = false 
}) => {
  // Component implementation
};
```

### 3. Integration Points
- Monitor initialized in App.tsx
- Status indicator placed in layout component
- API client uses monitor for retry logic
- Logger captures network events

## Implementation Plan

1. **Phase 1A: Core Monitoring (Week 1)**
   - Implement NetworkMonitor class
   - Add basic status detection
   - Create status indicator component
   - Add event logging

2. **Phase 1B: Enhanced Features (Week 1)**
   - Add latency measurement
   - Implement portal detection
   - Add retry mechanism
   - Enhance error messages

## Testing Strategy

### Unit Tests
- NetworkMonitor class methods
- Status indicator component
- Event handling logic

### Integration Tests
- Monitor integration with API client
- Status updates in UI
- Event logging system

### Network Condition Tests
- Simulate offline states
- Test slow connections
- Mock portal redirects

## Observability

### Logging
```typescript
interface NetworkLog {
  timestamp: string;
  event: NetworkEvent;
  status: NetworkStatus;
  metadata?: Record<string, unknown>;
}
```

### Metrics
- Connection state changes
- API failure rates
- Average latency
- Portal redirect frequency

## Security Considerations
- Secure handling of portal redirects
- No sensitive data in logs
- Protected network status access

## Dependencies
- No additional runtime dependencies
- Jest for testing
- Network condition simulation tools for development

## Implementation Status
### Completed Components
1. NetworkMonitor Class ✓
  - ✓ Status detection and monitoring
  - ✓ Portal redirect handling
  - ✓ Connection quality measurement
  - ✓ Event subscription system
  
2. NetworkStatusIndicator Component ✓
  - ✓ Visual status feedback
  - ✓ Latency display
  - ✓ Accessibility support
  
3. NetworkClient Integration ✓
  - ✓ Retry logic with exponential backoff
  - ✓ Portal redirect handling
  - ✓ Response type handling
  - ✓ GET/POST/PUT/DELETE methods implemented
  - ✓ Type-safe request/response handling
  - ✓ Comprehensive error handling
  - ✓ Configurable retry policies
  - ✓ Error logging and monitoring
  - ✓ User-friendly error messages

### Next Steps
1. Implement request caching system
2. Add request batching
3. Optimize network performance
4. Add offline support
 