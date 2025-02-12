import { screen } from '@testing-library/react';

export const expectProperAvatarStyling = (altText: string) => {
  const avatar = screen.getByAltText(altText);
  expect(avatar).toHaveClass(
    'rounded-full',
    'object-cover',
    'shadow-sm',
    'ring-1',
    'ring-gray-200'
  );
  expect(avatar.closest('div')).toHaveClass('relative');
}; 