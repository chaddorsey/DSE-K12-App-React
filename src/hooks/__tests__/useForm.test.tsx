/**
 * Tests for useForm hook
 */

import { renderHook, act } from '@testing-library/react';
import { useForm } from '../useForm';
import { mockMonitoring } from '../testing/mockMonitoring';
import * as yup from 'yup';
import React from 'react';
import { FormProvider } from '../../components/Form/FormProvider';

interface TestForm {
  name: string;
  email: string;
  age: number;
  terms: boolean;
}

const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  age: yup.number().min(18, 'Must be at least 18').required('Age is required'),
  terms: yup.boolean().oneOf([true], 'Must accept terms')
});

const initialValues: TestForm = {
  name: '',
  email: '',
  age: 0,
  terms: false
};

describe('useForm', () => {
  const mockMonitors = mockMonitoring();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => 
      useForm({
        initialValues: { email: '', password: '' }
      })
    );

    expect(result.current.values).toEqual({
      email: '',
      password: ''
    });
    expect(result.current.errors).toEqual({});
    expect(result.current.touched).toEqual({});
  });

  it('should handle field changes', () => {
    const { result } = renderHook(() => 
      useForm({
        initialValues: { email: '' }
      })
    );

    act(() => {
      result.current.handleChange('email')('test@example.com');
    });

    expect(result.current.values.email).toBe('test@example.com');
    expect(mockMonitors.trackInteraction).toHaveBeenCalledWith({
      type: 'form_field_change',
      field: 'email'
    });
  });

  it('should validate fields on blur', async () => {
    const schema = yup.object({
      email: yup.string().email().required()
    });

    const { result } = renderHook(() => 
      useForm({
        initialValues: { email: 'invalid' },
        validationSchema: schema
      })
    );

    await act(async () => {
      await result.current.handleBlur('email')();
    });

    expect(result.current.errors.email).toBeTruthy();
    expect(result.current.touched.email).toBe(true);
  });

  it('should handle form submission', async () => {
    const onSubmit = jest.fn();
    const { result } = renderHook(() => 
      useForm({
        initialValues: { name: 'test' },
        onSubmit
      })
    );

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(onSubmit).toHaveBeenCalledWith(
      { name: 'test' },
      expect.any(Object)
    );
    expect(mockMonitors.trackPerformance).toHaveBeenCalledWith({
      type: 'form_submit',
      success: true,
      totalTime: expect.any(Number)
    });
  });
});

describe('useForm Validation', () => {
  it('should validate on change when configured', async () => {
    const { result } = renderHook(() => useForm<TestForm>({
      initialValues,
      validationSchema: schema,
      validateOnChange: true
    }));

    await act(async () => {
      await result.current.handleChange('email')('invalid-email');
    });

    expect(result.current.errors.email).toBe('Invalid email');
  });

  it('should validate on blur when configured', async () => {
    const { result } = renderHook(() => useForm<TestForm>({
      initialValues,
      validationSchema: schema,
      validateOnBlur: true
    }));

    await act(async () => {
      await result.current.handleBlur('name')();
    });

    expect(result.current.errors.name).toBe('Name is required');
  });

  it('should validate all fields on submit', async () => {
    const onSubmit = jest.fn();
    const { result } = renderHook(() => useForm<TestForm>({
      initialValues,
      validationSchema: schema,
      onSubmit
    }));

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(result.current.errors.name).toBe('Name is required');
    expect(result.current.errors.email).toBe('Email is required');
    expect(result.current.errors.age).toBe('Age is required');
    expect(result.current.errors.terms).toBe('Must accept terms');
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('should call onSubmit when valid', async () => {
    const onSubmit = jest.fn();
    const validValues: TestForm = {
      name: 'Test User',
      email: 'test@example.com',
      age: 25,
      terms: true
    };

    const { result } = renderHook(() => useForm<TestForm>({
      initialValues: validValues,
      validationSchema: schema,
      onSubmit
    }));

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(result.current.errors).toEqual({});
    expect(onSubmit).toHaveBeenCalledWith(validValues);
  });
}); 