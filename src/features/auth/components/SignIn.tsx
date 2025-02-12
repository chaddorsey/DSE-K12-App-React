import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '../context/AuthContext';
import { Button } from '@/components/Button';
import './SignIn.css';

interface SignInFormData {
  email: string;
  password: string;
}

const schema = yup.object({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().required('Password is required')
}).required();

export function SignIn() {
  const { signIn, loading, error } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm<SignInFormData>({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: SignInFormData) => {
    await signIn(data.email, data.password);
  };

  return (
    <div className="sign-in">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="sign-in-form">
        {error && (
          <div className="error-message" role="alert">
            {error.message}
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
        </div>

        <Button
          type="submit"
          disabled={loading}
          loading={loading}
        >
          Sign In
        </Button>

        {loading && <div data-testid="loading-spinner" className="spinner" />}

        <div className="form-links">
          <a href="/reset-password" className="forgot-password">
            Forgot Password?
          </a>
        </div>
      </form>
    </div>
  );
} 