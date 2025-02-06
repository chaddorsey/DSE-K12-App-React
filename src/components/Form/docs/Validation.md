# Form Validation Guide

## Field-Level Validation

Each field can have its own validation rules:

```tsx
// Required field
<TextField
  name="username"
  label="Username"
  required
/>

// Email validation
<TextField
  name="email"
  label="Email"
  type="email"
  required
/>

// Number range
<NumberField
  name="age"
  label="Age"
  min={18}
  max={100}
/>

// File validation
<FileField
  name="avatar"
  label="Profile Picture"
  accept="image/*"
  maxSize={1024 * 1024}
  validateFile={(file) => {
    if (file.size > 1024 * 1024) {
      return 'File too large';
    }
  }}
/>
```

## Form-Level Validation

Validate multiple fields or complex rules:

```tsx
interface FormData {
  password: string;
  confirmPassword: string;
  startDate: string;
  endDate: string;
}

const validate = (values: FormData) => {
  const errors: Partial<FormData> = {};

  // Password match
  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Passwords must match';
  }

  // Date range
  if (new Date(values.startDate) > new Date(values.endDate)) {
    errors.endDate = 'End date must be after start date';
  }

  return errors;
};

<FormProvider
  initialValues={initialValues}
  validate={validate}
  onSubmit={handleSubmit}
>
  {/* Form fields */}
</FormProvider>
```

## Async Validation

Handle asynchronous validation like checking username availability:

```tsx
const validateUsername = async (username: string) => {
  const response = await fetch(`/api/check-username?username=${username}`);
  const { available } = await response.json();
  
  if (!available) {
    return 'Username already taken';
  }
};

<TextField
  name="username"
  label="Username"
  validate={validateUsername}
/>
``` 