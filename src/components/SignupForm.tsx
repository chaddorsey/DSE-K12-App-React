/**
 * Form component for user registration
 */

import React from 'react';
import { useForm } from '../hooks/useForm';
import { useAuth } from '../hooks/useAuth';
import { MonitoringService } from '../monitoring/MonitoringService';
import * as yup from 'yup';

interface ISignupFormProps {
  onSuccess?: () => void;
}

interface ISignupFormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Invalid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password')
});

export function SignupForm({ onSuccess }: ISignupFormProps) {
  const { signup, isLoading } = useAuth();
  const monitoring = MonitoringService.getInstance();

  const form = useForm<ISignupFormValues>({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await signup({
          email: values.email,
          password: values.password
        });
        onSuccess?.();
      } catch (error) {
        monitoring.trackError(error as Error, {
          type: 'form_error',
          operation: 'signup'
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

      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          value={form.values.confirmPassword}
          onChange={form.handleChange('confirmPassword')}
          onBlur={form.handleBlur('confirmPassword')}
          aria-invalid={!!form.errors.confirmPassword}
          disabled={isLoading}
        />
        {form.touched.confirmPassword && form.errors.confirmPassword && (
          <div role="alert">{form.errors.confirmPassword}</div>
        )}
      </div>

      {form.submitError && (
        <div role="alert">{form.submitError.message}</div>
      )}

      <button 
        type="submit" 
        disabled={isLoading || form.isSubmitting}
      >
        {isLoading ? 'Signing up...' : 'Sign Up'}
      </button>
    </form>
  );
} 