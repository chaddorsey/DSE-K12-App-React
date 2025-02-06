/**
 * Form component for user authentication
 */

import React from 'react';
import * as yup from 'yup';
import { useForm } from '../hooks/useForm';
import { TextField } from './Form/Field/TextField';
import { Button } from '../components/Button';
import './LoginForm.css';

interface ILoginFormValues {
  email: string;
  password: string;
  [key: string]: unknown; // Add index signature to satisfy Record<string, unknown>
}

const validationSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required')
});

export const LoginForm: React.FC = () => {
  const initialValues: ILoginFormValues = {
    email: '',
    password: ''
  };

  const {
    values,
    errors,
    isSubmitting,
    handleSubmit,
    handleChange
  } = useForm<ILoginFormValues>({
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
        }), {} as Record<keyof ILoginFormValues, string>);
      }
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e.target.name as keyof ILoginFormValues, e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
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

      {errors?.submit && (
        <div className="error-message">{errors.submit}</div>
      )}

      <Button 
        type="submit"
        disabled={isSubmitting}
        loading={isSubmitting}
      >
        {isSubmitting ? 'Logging in...' : 'Log In'}
      </Button>
    </form>
  );
}; 