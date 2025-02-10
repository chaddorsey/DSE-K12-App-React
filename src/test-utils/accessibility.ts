import { axe, toHaveNoViolations } from 'jest-axe';
import { render } from '@testing-library/react';

expect.extend(toHaveNoViolations);

export const testAccessibility = async (jsx: JSX.Element) => {
  const { container } = render(jsx);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
};

export const renderWithA11y = (jsx: JSX.Element) => {
  const utils = render(jsx);
  return {
    ...utils,
    testA11y: async () => {
      const results = await axe(utils.container);
      expect(results).toHaveNoViolations();
    },
  };
}; 