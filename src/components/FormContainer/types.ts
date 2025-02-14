import { EndpointPath } from '@/api/types/endpoints';

export interface IFormContainerProps<T extends EndpointPath> {
  endpoint: T;
  children: (props: IFormRenderProps<T>) => React.ReactElement;
  onSuccess?: () => void;
  validate?: (data: Partial<EndpointDataType<T>>) => Record<string, string> | null;
}

export interface IFormRenderProps<T extends EndpointPath> {
  data: EndpointDataType<T>;
  errors: Record<string, string>;
  isSubmitting: boolean;
  handleChange: (field: string, value: string) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  setFieldValue: (field: string, value: any) => void;
} 