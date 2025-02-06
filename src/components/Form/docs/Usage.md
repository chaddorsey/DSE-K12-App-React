# Form Components Usage Guide

## Basic Form Example

```tsx
interface LoginForm {
  email: string;
  password: string;
  rememberMe: boolean;
}

function LoginForm() {
  const handleSubmit = async (values: LoginForm) => {
    // Handle form submission
  };

  return (
    <FormProvider<LoginForm>
      initialValues={{
        email: '',
        password: '',
        rememberMe: false
      }}
      onSubmit={handleSubmit}
    >
      <TextField
        name="email"
        label="Email"
        type="email"
        required
      />
      <TextField
        name="password"
        label="Password"
        type="password"
        required
      />
      <CheckboxField
        name="rememberMe"
        label="Remember Me"
        checkboxLabel="Keep me signed in"
      />
      <button type="submit">Login</button>
    </FormProvider>
  );
}
```

## Form Validation

```tsx
interface SignupForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function SignupForm() {
  const validate = (values: SignupForm) => {
    const errors: Partial<SignupForm> = {};

    if (!values.username) {
      errors.username = 'Username is required';
    }

    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = 'Passwords must match';
    }

    return errors;
  };

  return (
    <FormProvider<SignupForm>
      initialValues={{
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      }}
      validate={validate}
      onSubmit={handleSubmit}
    >
      {/* Form fields */}
    </FormProvider>
  );
}
```

## Performance Monitoring

All form interactions are automatically tracked using the MonitoringService:

```tsx
// Example performance metric
{
  type: 'interaction',
  success: true,
  totalTime: 123, // milliseconds
  duration: 123,
  metadata: {
    field: 'email',
    type: 'change'
  }
}
``` 