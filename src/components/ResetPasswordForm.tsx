/**
 * Form component for password reset requests
 */

import React from 'react';
import * as yup from 'yup';
import { useForm } from '../hooks/useForm';
import { TextField } from './Form/Field/TextField';
import { Button } from '../components/Button';
import './ResetPasswordForm.css';

interface IResetPasswordFormValues {
  email: string;
  code: string;
  newPassword: string;
  confirmPassword: string;
  [key: string]: unknown; // Add index signature to satisfy Record<string, unknown>
}

const validationSchema = yup.object().shape({
  email: yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  code: yup.string()
    .required('Reset code is required')
    .matches(/^\d{6}$/, 'Code must be 6 digits'),
  newPassword: yup.string()
    .required('New password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
  confirmPassword: yup.string()
    .required('Please confirm your password')
    .oneOf([yup.ref('newPassword')], 'Passwords must match')
});

export const ResetPasswordForm: React.FC = () => {
  const initialValues: IResetPasswordFormValues = {
    email: '',
    code: '',
    newPassword: '',
    confirmPassword: ''
  };

  const {
    values,
    errors,
    isSubmitting,
    handleSubmit,
    handleChange
  } = useForm<IResetPasswordFormValues>({
    initialValues,
    onSubmit: async (values) => {
      // Handle submission
      console.log('Form submitted:', values);
    },
    validate: (values) => {
      try {
        validationSchema.validateSync(values, { abortEarly: false });
        return null;
      } catch (err) {
        const yupError = err as yup.ValidationError;
        return yupError.inner.reduce((acc, curr) => ({
          ...acc,
          [curr.path!]: curr.message
        }), {} as Record<keyof IResetPasswordFormValues, string>);
      }
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e.target.name as keyof IResetPasswordFormValues, e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="reset-password-form">
      <TextField
        name="email"
        label="Email"
        type="email"
        value={values.email}
        onChange={handleInputChange}
        error={errors?.email}
      />

      <TextField
        name="code"
        label="Reset Code"
        type="text"
        value={values.code}
        onChange={handleInputChange}
        error={errors?.code}
        placeholder="Enter 6-digit code"
      />

      <TextField
        name="newPassword"
        label="New Password"
        type="password"
        value={values.newPassword}
        onChange={handleInputChange}
        error={errors?.newPassword}
      />

      <TextField
        name="confirmPassword"
        label="Confirm Password"
        type="password"
        value={values.confirmPassword}
        onChange={handleInputChange}
        error={errors?.confirmPassword}
      />

      {errors?.submit && (
        <div className="error-message">{errors.submit}</div>
      )}

      <Button 
        type="submit"
        disabled={isSubmitting}
        loading={isSubmitting}
      >
        {isSubmitting ? 'Resetting Password...' : 'Reset Password'}
      </Button>
    </form>
  );
}; 