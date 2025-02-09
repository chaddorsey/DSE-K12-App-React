# Protected Routes

## Overview
Protected routes ensure that only authenticated users with appropriate permissions can access certain parts of the application.

## Features
- Authentication check
- Role-based access control
- Redirect to login
- Performance monitoring
- Error boundary integration

## Usage
```tsx
// Basic protection
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <DashboardComponent />
    </ProtectedRoute>
  }
/>

// With role requirement
<Route
  path="/admin"
  element={
    <ProtectedRoute requiredRole="admin">
      <AdminDashboard />
    </ProtectedRoute>
  }
/>
```

## Error Handling
- Unauthorized access attempts are logged
- Role permission violations are logged
- Graceful error recovery through error boundary

## Testing
- Unit tests verify protection logic
- Integration tests verify routing behavior
- Error boundary compatibility verified 