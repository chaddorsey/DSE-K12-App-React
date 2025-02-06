# LoadingSpinner

## Overview
A reusable loading spinner component with performance monitoring and accessibility features.

## Props
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| size | 'small' \| 'medium' \| 'large' | No | 'medium' | Size of the spinner |
| label | string | No | 'Loading...' | Accessible label for screen readers |
| className | string | No | '' | Additional CSS class |
| visible | boolean | No | true | Whether the spinner is visible |

## Usage Examples
```tsx
// Basic usage
<LoadingSpinner />

// Custom size and label
<LoadingSpinner 
  size="large"
  label="Loading data..."
/>

// With custom class and conditional visibility
<LoadingSpinner
  className="custom-spinner"
  visible={isLoading}
/>
```

## Performance Considerations
- Lightweight CSS-only animation
- Performance monitored via usePerformanceMonitoring hook
- Render time tracked and compared against baselines

## Accessibility
- Uses proper ARIA attributes
- Provides screen reader feedback
- Customizable label text

## Testing
- Component render verification
- Size variants testing
- Visibility toggle testing
- Accessibility testing 