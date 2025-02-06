/**
 * Form component for user registration
 */

import React from 'react';
import * as yup from 'yup';
import { useForm } from '../hooks/useForm';
import { useAuth } from '../hooks/useAuth';
import { TextField } from './Form/Field/TextField';
import { Button } from '../components/Button';
import './SignupForm.css';
import { MonitoringService } from '../monitoring/MonitoringService';

interface ISignupFormValues {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  [key: string]: unknown; // Add index signature to satisfy Record<string, unknown>
}

const validationSchema = yup.object().shape({
  email: yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
  confirmPassword: yup.string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
  firstName: yup.string()
    .required('First name is required')
    .min(2, 'First name must be at least 2 characters'),
  lastName: yup.string()
    .required('Last name is required')
    .min(2, 'Last name must be at least 2 characters')
});

export const SignupForm: React.FC = () => {
  const { signup, isLoading } = useAuth();
  const monitoring = MonitoringService.getInstance();

  const initialValues: ISignupFormValues = {
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  };

  const {
    values,
    errors,
    isSubmitting,
    handleSubmit,
    handleChange
  } = useForm<ISignupFormValues>({
    initialValues,
    onSubmit: async (values) => {
      try {
        await signup({
          email: values.email,
          password: values.password
        });
      } catch (error) {
        monitoring.trackError(error as Error, {
          type: 'form_error',
          operation: 'signup'
        });
        throw error; // Let useForm handle the error state
      }
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
        }), {} as Record<keyof ISignupFormValues, string>);
      }
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e.target.name as keyof ISignupFormValues, e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <div className="signup-form__name-fields">
        <TextField
          name="firstName"
          label="First Name"
          value={values.firstName}
          onChange={handleInputChange}
          error={errors?.firstName}
        />

        <TextField
          name="lastName"
          label="Last Name"
          value={values.lastName}
          onChange={handleInputChange}
          error={errors?.lastName}
        />
      </div>

      <TextField
        name="email"
        label="Email"
        type="email"
        value={values.email}
        onChange={handleInputChange}
        error={errors?.email}
      />

      <TextField
        name="password"
        label="Password"
        type="password"
        value={values.password}
        onChange={handleInputChange}
        error={errors?.password}
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
        disabled={isSubmitting || isLoading}
        loading={isSubmitting}
      >
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </Button>
    </form>
  );
}; 