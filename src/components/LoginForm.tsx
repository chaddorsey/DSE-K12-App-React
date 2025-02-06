/**
 * Form component for user authentication
 */

import React from 'react';
import { useForm } from '../hooks/useForm';
import { useAuth } from '../hooks/useAuth';
import { MonitoringService } from '../monitoring/MonitoringService';
import * as yup from 'yup';

interface ILoginFormProps {
  onSuccess?: () => void;
}

interface ILoginFormValues {
  email: string;
  password: string;
}

const validationSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required')
});

export function LoginForm({ onSuccess }: ILoginFormProps) {
  const { login, isLoading } = useAuth();
  const monitoring = MonitoringService.getInstance();

  const form = useForm<ILoginFormValues>({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await login(values);
        onSuccess?.();
      } catch (error) {
        monitoring.trackError(error as Error, {
          type: 'form_error',
          operation: 'login'
        });
        throw error; // Let useForm handle the error state
      }
    }
  });

  return (
    <form onSubmit={form.handleSubmit} noValidate>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={form.values.email}
          onChange={form.handleChange('email')}
          onBlur={form.handleBlur('email')}
          aria-invalid={!!form.errors.email}
          disabled={isLoading}
        />
        {form.touched.email && form.errors.email && (
          <div role="alert">{form.errors.email}</div>
        )}
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={form.values.password}
          onChange={form.handleChange('password')}
          onBlur={form.handleBlur('password')}
          aria-invalid={!!form.errors.password}
          disabled={isLoading}
        />
        {form.touched.password && form.errors.password && (
          <div role="alert">{form.errors.password}</div>
        )}
      </div>

      {form.submitError && (
        <div role="alert">{form.submitError.message}</div>
      )}

      <button 
        type="submit" 
        disabled={isLoading || form.isSubmitting}
      >
        {isLoading ? 'Logging in...' : 'Log In'}
      </button>
    </form>
  );
} 