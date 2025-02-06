# DataContainer

## Overview
Generic container component that handles data fetching, loading states, and error handling. Uses the Container/Presenter pattern to separate data management from presentation.

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| endpoint | EndpointPath | Yes | API endpoint to fetch data from |
| loadingFallback | ReactNode | No | Custom loading component |
| errorFallback | ReactNode | No | Custom error component |
| children | (data: T) => ReactNode | Yes | Render function for data |

## Usage Examples
```tsx
// Basic usage
<DataContainer endpoint="users.profile">
  {(user) => <UserProfileView user={user} />}
</DataContainer>

// With custom loading and error states
<DataContainer
  endpoint="users.profile"
  loadingFallback={<CustomSpinner />}
  errorFallback={<CustomError />}
>
  {(user) => <UserProfileView user={user} />}
</DataContainer>
```

## Error Handling
- Uses ErrorDisplay component for error presentation
- Integrates with global error message system
- Provides retry functionality
- Supports custom error components

## Performance Considerations
- Caches API responses through useApi hook
- Memoizes callbacks to prevent unnecessary rerenders
- Supports suspense for concurrent rendering

## Accessibility
- Uses ARIA live regions for status updates
- Maintains focus during loading/error states
- Provides keyboard navigation for error recovery

## Testing
- Test loading state rendering
- Test error state handling
- Test data presentation
- Test custom fallback components
- Test retry functionality 