/**
 * Tests for useForm hook
 */

import { renderHook, act } from '@testing-library/react';
import { useForm } from '../useForm';
import { mockMonitoring } from '../testing/mockMonitoring';
import * as yup from 'yup';

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