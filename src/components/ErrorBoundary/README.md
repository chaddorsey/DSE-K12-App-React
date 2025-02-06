# ErrorBoundary

## Overview
React error boundary component that catches JavaScript errors in child components, logs them, and displays fallback UI. Essential for preventing white screens and providing graceful error handling.

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| fallback | ReactNode | No | Custom error UI component |
| onError | (error: Error, errorInfo: React.ErrorInfo) => void | No | Error callback for logging/monitoring |
| resetOnChange | boolean | No | Whether to reset error state when children change |
| children | ReactNode | Yes | Components to be protected |

## Usage Examples
```tsx
// Basic usage
<ErrorBoundary>
  <ComponentThatMightError />
</ErrorBoundary>

// With custom error UI and logging
<ErrorBoundary
  fallback={<CustomErrorPage />}
  onError={(error) => reportToMonitoring(error)}
>
  <App />
</ErrorBoundary>
```

## Error Handling
- Catches render and lifecycle errors
- Prevents error propagation to parent components
- Supports error reporting/monitoring
- Provides reset functionality

## Performance Considerations
- Minimal overhead when no errors occur
- Only re-renders on errors or resets
- Efficient error state management

## Accessibility
- Maintains focus when showing error UI
- Provides clear error messaging
- Supports keyboard navigation for recovery actions

## Testing
- Error catching behavior
- Fallback UI rendering
- Error callback execution
- Reset functionality
- Child component recovery 