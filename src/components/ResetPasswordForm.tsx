/**
 * Form component for password reset requests
 */

import React, { useState } from 'react';
import { useForm } from '../hooks/useForm';
import { useAuth } from '../hooks/useAuth';
import { MonitoringService } from '../monitoring/MonitoringService';
import * as yup from 'yup';

interface IResetPasswordFormProps {
  onSuccess?: () => void;
}

interface IResetPasswordFormValues {
  email: string;
}

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Invalid email')
    .required('Email is required')
});

export function ResetPasswordForm({ onSuccess }: IResetPasswordFormProps) {
  const { resetPassword, isLoading } = useAuth();
  const monitoring = MonitoringService.getInstance();
  const [showSuccess, setShowSuccess] = useState(false);

  const form = useForm<IResetPasswordFormValues>({
    initialValues: {
      email: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await resetPassword(values.email);
        setShowSuccess(true);
        onSuccess?.();
      } catch (error) {
        monitoring.trackError(error as Error, {
          type: 'form_error',
          operation: 'reset_password'
        });
        throw error; // Let useForm handle the error state
      }
    }
  });

  if (showSuccess) {
    return (
      <div role="alert">
        Check your email for reset instructions
      </div>
    );
  }

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

      {form.submitError && (
        <div role="alert">{form.submitError.message}</div>
      )}

      <button 
        type="submit" 
        disabled={isLoading || form.isSubmitting}
      >
        {isLoading ? 'Sending...' : 'Reset Password'}
      </button>
    </form>
  );
} 