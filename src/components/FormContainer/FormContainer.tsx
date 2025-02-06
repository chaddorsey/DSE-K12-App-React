/**
 * Generic container component for form handling with validation and submission.
 * Provides type-safe form state management and error handling through a render prop pattern.
 * 
 * @example
 * ```tsx
 * <FormContainer endpoint="users.settings">
 *   {({ data, handleSubmit }) => (
 *     <form onSubmit={handleSubmit}>
 *       <input
 *         value={data.name}
 *         onChange={e => setFieldValue('name', e.target.value)}
 *       />
 *     </form>
 *   )}
 * </FormContainer>
 * ```
 */

import React from 'react';
import { useApi } from '../../hooks/useApi';
import { EndpointPath, RequestBody } from '../../api/types/endpoints';
import { ErrorDisplay } from '../ErrorDisplay/ErrorDisplay';
import { logger } from '../../utils/logger';

/**
 * Props passed to the form render function
 */
interface IFormRenderProps<P extends EndpointPath> {
  /** Current form data */
  data: Partial<RequestBody<P>>;
  /** Validation errors by field */
  errors: Record<string, string>;
  /** Whether form is currently submitting */
  isSubmitting: boolean;
  /** Update a form field value */
  setFieldValue: (field: keyof RequestBody<P>, value: unknown) => void;
  /** Handle form submission */
  handleSubmit: (e: React.FormEvent) => void;
}

/**
 * Form container component props
 */
interface IFormContainerProps<P extends EndpointPath> {
  /** API endpoint for form submission */
  endpoint: P;
  /** Initial form data */
  initialData?: Partial<RequestBody<P>>;
  /** Form validation function */
  validate?: (data: RequestBody<P>) => Record<string, string> | null;
  /** Called after successful submission */
  onSuccess?: () => void;
  /** Render function for form UI */
  children: (props: IFormRenderProps<P>) => React.ReactNode;
}

export function FormContainer<P extends EndpointPath>({
  endpoint,
  initialData = {},
  validate,
  onSuccess,
  children
}: IFormContainerProps<P>): React.ReactElement {
  const [data, setData] = React.useState<Partial<RequestBody<P>>>(initialData);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  
  const {
    loading: isSubmitting,
    error,
    errorMessage,
    request
  } = useApi<unknown>();

  const setFieldValue = React.useCallback((field: keyof RequestBody<P>, value: unknown) => {
    setData((prev: Partial<RequestBody<P>>) => ({ ...prev, [field]: value }));
    setErrors((prev: Record<string, string>) => {
      const { [field as string]: _, ...rest } = prev;
      return rest;
    });
  }, []);

  const handleSubmit = React.useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data
    if (validate) {
      const validationErrors = validate(data as RequestBody<P>);
      if (validationErrors) {
        setErrors(validationErrors);
        return;
      }
    }

    try {
      await request(endpoint, { body: data });
      onSuccess?.();
      logger.debug('Form submitted successfully:', { endpoint });
    } catch (err) {
      if (err instanceof Error) {
        logger.error('Form submission failed:', err);
      }
    }
  }, [data, endpoint, onSuccess, request, validate]);

  return (
    <>
      {error && <ErrorDisplay error={errorMessage!} />}
      {children({
        data,
        errors,
        isSubmitting,
        setFieldValue,
        handleSubmit
      })}
    </>
  );
} 