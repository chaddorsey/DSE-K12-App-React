# FormContainer

## Overview
Generic container component for handling form state, validation, submission, and error handling. Implements a type-safe render prop pattern for flexible form UI implementation.

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| endpoint | EndpointPath | Yes | API endpoint for form submission |
| initialData | Partial<RequestBody<P>> | No | Initial form data |
| validate | (data: RequestBody<P>) => Record<string, string> \| null | No | Form validation function |
| onSuccess | () => void | No | Callback after successful submission |
| children | (props: IFormRenderProps<P>) => ReactNode | Yes | Render function for form UI |

## Usage Examples
```tsx
// Basic usage
<FormContainer endpoint="users.settings">
  {({ data, errors, handleSubmit, setFieldValue }) => (
    <form onSubmit={handleSubmit}>
      <input
        value={data.name || ''}
        onChange={e => setFieldValue('name', e.target.value)}
      />
      {errors.name && <span>{errors.name}</span>}
      <button type="submit">Submit</button>
    </form>
  )}
</FormContainer>

// With validation and success handling
<FormContainer
  endpoint="users.settings"
  initialData={{ language: 'en' }}
  validate={validateSettings}
  onSuccess={() => navigate('/settings/success')}
>
  {(formProps) => <SettingsForm {...formProps} />}
</FormContainer>
```

## Error Handling
- Field-level validation errors
- Submission error handling through ErrorDisplay
- Automatic error clearing on field change
- Type-safe error messages

## Performance Considerations
- Memoized callbacks for field updates
- Debounced validation (if needed)
- Optimized re-renders through careful state management

## Accessibility
- ARIA labels for form fields
- Error message association with fields
- Loading state indicators
- Keyboard navigation support

## Testing
- Initial data rendering
- Field updates
- Validation logic
- Form submission
- Error state handling
- Success callback execution 