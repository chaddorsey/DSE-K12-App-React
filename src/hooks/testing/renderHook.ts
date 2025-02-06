/**
 * Custom renderHook with test providers
 */

import { renderHook as rtlRenderHook, RenderHookOptions } from '@testing-library/react';
import { TestProviders } from './TestProviders';

interface IWrapperOptions {
  monitoring?: boolean;
  localStorage?: Record<string, unknown>;
  errorBoundary?: boolean;
}

export function renderHook<Result, Props>(
  hook: (props: Props) => Result,
  {
    initialProps,
    ...options
  }: IWrapperOptions & Omit<RenderHookOptions<Props>, 'wrapper'> = {}
) {
  return rtlRenderHook(hook, {
    wrapper: ({ children }) => (
      <TestProviders options={options}>
        {children}
      </TestProviders>
    ),
    initialProps
  });
} 