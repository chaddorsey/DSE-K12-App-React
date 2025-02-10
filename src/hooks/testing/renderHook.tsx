import React from 'react';
import { render } from '@testing-library/react';

interface RenderHookOptions {
  initialProps?: any;
  wrapper?: React.ComponentType<any>;
}

export function renderHook<Result, Props = any>(
  callback: (props: Props) => Result,
  options: RenderHookOptions = {}
) {
  const { initialProps, wrapper: Wrapper = React.Fragment } = options;
  let result: { current: Result };

  function TestComponent({ children }: { children?: React.ReactNode }) {
    result.current = callback(initialProps);
    return children || null;
  }

  render(
    <Wrapper>
      <TestComponent />
    </Wrapper>
  );

  return { result };
} 