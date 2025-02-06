# API Client Integration Design

## Current Context
- NetworkClient implemented with retry logic and monitoring
- Current API calls use direct fetch without resilience
- Need to standardize API interface across application

## Requirements

### Functional Requirements
1. **API Interface:**
   - Consistent error handling
   - Type-safe request/response
   - Automatic retry on failures
   - Portal redirect handling

2. **Integration Points:**
   - Authentication flows
   - Data fetching
   - Form submissions
   - File uploads

### Non-Functional Requirements
- Type safety across all API calls
- Consistent error messages
- Minimal code duplication
- Clear debugging information

## Technical Design

### 1. API Client Interface
```typescript
interface ApiResponse<T> {
  data: T;
  status: number;
  headers: Headers;
}

interface ApiError extends Error {
  status?: number;
  code?: string;
  details?: unknown;
}

class ApiClient {
  constructor(
    private networkClient: NetworkClient,
    private options: {
      baseUrl: string;
      defaultHeaders?: Record<string, string>;
    }
  ) {}

  async get<T>(endpoint: string, options?: RequestOptions): Promise<ApiResponse<T>>;
  async post<T>(endpoint: string, data?: unknown, options?: RequestOptions): Promise<ApiResponse<T>>;
  async put<T>(endpoint: string, data?: unknown, options?: RequestOptions): Promise<ApiResponse<T>>;
  async delete<T>(endpoint: string, options?: RequestOptions): Promise<ApiResponse<T>>;
}
```

### 2. Example Usage
```typescript
// API endpoints
const endpoints = {
  auth: {
    login: '/auth/login',
    logout: '/auth/logout'
  },
  users: {
    profile: '/users/profile',
    settings: '/users/settings'
  }
} as const;

// Type-safe API calls
async function getUserProfile(): Promise<UserProfile> {
  const response = await apiClient.get<UserProfile>(endpoints.users.profile);
  return response.data;
}
```

## Implementation Plan

1. **Phase 1: Core Implementation**
   - Create ApiClient class
   - Add type definitions
   - Implement CRUD methods
   - Add error handling

2. **Phase 2: Integration**
   - Update authentication flows
   - Convert existing API calls
   - Add response interceptors
   - Update error messages

## Testing Strategy

### Unit Tests
- API client methods
- Error handling
- Type checking
- Response parsing

### Integration Tests
- Authentication flows
- Data fetching
- Error scenarios
- Network conditions 

## Implementation Status

### Completed Features
- ✓ Core API client implementation
- ✓ Type-safe request/response handling
- ✓ Integration with NetworkClient
- ✓ Error handling with custom ApiError class
- ✓ CRUD operations (GET, POST, PUT, DELETE)
- ✓ Test coverage for all operations
- ✓ React hook pattern for API integration

### Next Steps
1. Document API endpoints
2. Add more endpoint definitions
3. Add response interceptors
4. Update error messages for specific scenarios

## Integration Pattern
```typescript
// Using the useApi hook pattern for components
const {
  data,
  loading,
  error,
  get,
  post,
  put,
  delete
} = useApi<ResponseType>({
  onSuccess?: (data) => void,
  onError?: (error: ApiError) => void
});
```

This pattern provides:
- Type-safe request/response handling
- Automatic loading states
- Consistent error handling
- Success/error callbacks
- React-friendly state management 