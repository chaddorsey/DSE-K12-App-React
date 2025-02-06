# Form Components API Documentation

## FormProvider

Provides form context and handles form state, validation, and submission.

```tsx
<FormProvider<FormData>
  initialValues={initialValues}
  onSubmit={handleSubmit}
  validate={validateForm}
>
  {/* Form fields */}
</FormProvider>
```

### Props
- `initialValues`: Initial form data
- `onSubmit`: Form submission handler
- `validate?`: Optional form-level validation function
- `children`: Form content

## Field Components

### TextField
Basic text input with support for different input types.

```tsx
<TextField<FormData>
  name="fieldName"
  label="Field Label"
  type="text" // text, email, password, tel, url
  required
/>
```

### NumberField
Numeric input with optional increment/decrement controls.

```tsx
<NumberField<FormData>
  name="age"
  label="Age"
  min={0}
  max={100}
  showControls
/>
```

### SelectField
Dropdown selection with single or multiple select support.

```tsx
<SelectField<FormData>
  name="country"
  label="Country"
  options={[
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' }
  ]}
  multiple={false}
/>
```

### CheckboxField
Single checkbox input with label.

```tsx
<CheckboxField<FormData>
  name="agree"
  label="Terms"
  checkboxLabel="I agree to terms"
/>
```

### RadioGroupField
Group of radio buttons with vertical or horizontal layout.

```tsx
<RadioGroupField<FormData>
  name="preference"
  label="Preference"
  options={[
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' }
  ]}
  direction="vertical"
/>
```

### TextAreaField
Multi-line text input with optional character count.

```tsx
<TextAreaField<FormData>
  name="description"
  label="Description"
  rows={4}
  maxLength={200}
  showCharacterCount
/>
```

### FileField
File input with validation support.

```tsx
<FileField<FormData>
  name="avatar"
  label="Profile Picture"
  accept="image/*"
  maxSize={1024 * 1024} // 1MB
  multiple={false}
/>
``` 