# NetworkStatusIndicator

## Overview
A network status indicator component that shows online/offline status and network quality information.

## Props
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| position | 'top' \| 'bottom' | No | 'top' | Position of the indicator |
| showLatency | boolean | No | false | Whether to show latency information |
| className | string | No | '' | Additional CSS class |

## Usage Examples
```tsx
// Basic usage
<NetworkStatusIndicator />

// With latency information
<NetworkStatusIndicator 
  position="bottom"
  showLatency
/>

// With custom styling
<NetworkStatusIndicator
  className="custom-indicator"
  position="top"
/>
```

## Performance Considerations
- Uses CSS transitions for smooth animations
- Monitors render performance
- Tracks network state transitions

## Accessibility
- Uses aria-live for status updates
- High contrast colors for visibility
- Screen reader friendly status text

## Testing
- Online/offline state testing
- Position rendering
- Latency display
- Network type indication 