import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { authService } from '../services/AuthService';
import { Button } from '@/components/Button';
import './SignIn.css';  // Reuse SignIn styles

interface RegistrationFormData {
  email: string;
  confirmEmail: string;
  password: string;
}

const schema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email address'),
  confirmEmail: yup
    .string()
    .required('Please confirm your email')
    .oneOf([yup.ref('email')], 'Email addresses must match'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
      'Password must contain at least one letter and one number'
    )
}).required();

export const RegistrationForm: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<RegistrationFormData>({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: RegistrationFormData) => {
    try {
      setLoading(true);
      await authService.signUp(
        data.email,
        data.password,
      );
      authService.sendVerificationEmail().catch(console.error);
      navigate('/');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed';
      setError('root', {
        type: 'manual',
        message: errorMessage
      });
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your email twice and choose a password
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {errors.root && (
            <div className="error-message" role="alert">
              {errors.root.message}
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              {...register('email')}
              className={errors.email ? 'error' : ''}
            />
            {errors.email && (
              <span className="error-text">{errors.email.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmEmail">Confirm Email</label>
            <input
              id="confirmEmail"
              type="email"
              {...register('confirmEmail')}
              className={errors.confirmEmail ? 'error' : ''}
            />
            {errors.confirmEmail && (
              <span className="error-text">{errors.confirmEmail.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              {...register('password')}
              className={errors.password ? 'error' : ''}
            />
            {errors.password && (
              <span className="error-text">{errors.password.message}</span>
            )}
            <p className="mt-1 text-xs text-gray-500">
              Must be at least 8 characters with one letter and one number
            </p>
          </div>

          <Button
            type="submit"
            disabled={loading}
            loading={loading}
          >
            Register
          </Button>

          {loading && <div data-testid="loading-spinner" className="spinner" />}
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}; 