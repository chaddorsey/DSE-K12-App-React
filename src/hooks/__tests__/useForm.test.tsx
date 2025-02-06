/**
 * Tests for useForm hook
 */

import { renderHook, act } from '../testing/renderHook';
import { useForm } from '../useForm';
import { mockMonitoring } from '../testing/mockMonitoring';
import * as yup from 'yup';

describe('useForm', () => {
  const mockMonitors = mockMonitoring();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('form state', () => {
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

    it('should track field changes', () => {
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

    it('should track field blur', () => {
      const { result } = renderHook(() => 
        useForm({
          initialValues: { email: '' }
        })
      );

      act(() => {
        result.current.handleBlur('email')();
      });

      expect(result.current.touched.email).toBe(true);
    });
  });

  describe('validation', () => {
    const schema = yup.object({
      email: yup.string().email().required(),
      password: yup.string().min(8).required()
    });

    it('should validate on change', async () => {
      const { result } = renderHook(() => 
        useForm({
          initialValues: { email: '', password: '' },
          validationSchema: schema,
          validateOnChange: true
        })
      );

      await act(async () => {
        result.current.handleChange('email')('invalid');
      });

      expect(result.current.errors.email).toBeDefined();
      expect(mockMonitors.trackError).toHaveBeenCalledWith(
        expect.any(Error),
        {
          type: 'validation',
          field: 'email'
        }
      );
    });

    it('should validate on submit', async () => {
      const onSubmit = jest.fn();
      const { result } = renderHook(() => 
        useForm({
          initialValues: { email: '', password: '' },
          validationSchema: schema,
          onSubmit
        })
      );

      await act(async () => {
        await result.current.handleSubmit();
      });

      expect(result.current.errors.email).toBeDefined();
      expect(result.current.errors.password).toBeDefined();
      expect(onSubmit).not.toHaveBeenCalled();
    });
  });

  describe('submission', () => {
    it('should handle successful submission', async () => {
      const onSubmit = jest.fn().mockResolvedValue(undefined);
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

    it('should handle submission errors', async () => {
      const error = new Error('Submit failed');
      const onSubmit = jest.fn().mockRejectedValue(error);
      
      const { result } = renderHook(() => 
        useForm({
          initialValues: { name: 'test' },
          onSubmit
        })
      );

      await act(async () => {
        await result.current.handleSubmit();
      });

      expect(result.current.submitError).toBe(error);
      expect(mockMonitors.trackError).toHaveBeenCalledWith(
        error,
        {
          type: 'submit',
          values: { name: 'test' }
        }
      );
    });
  });

  describe('performance monitoring', () => {
    it('should track field interaction times', async () => {
      const { result } = renderHook(() => 
        useForm({
          initialValues: { email: '' }
        })
      );

      const startTime = Date.now();
      
      await act(async () => {
        result.current.handleChange('email')('test');
        await new Promise(resolve => setTimeout(resolve, 100));
        result.current.handleBlur('email')();
      });

      expect(mockMonitors.trackPerformance).toHaveBeenCalledWith({
        type: 'field_interaction',
        field: 'email',
        totalTime: expect.any(Number)
      });
    });
  });
}); 