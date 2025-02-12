import { generateInitials, getDefaultAvatarUrl, getAvatarUrl } from '../avatar';

describe('Avatar Utilities', () => {
  describe('generateInitials', () => {
    it('returns first letters of first and last name', () => {
      expect(generateInitials('John Doe')).toBe('JD');
    });

    it('handles single word names', () => {
      expect(generateInitials('John')).toBe('J');
    });

    it('handles empty string', () => {
      expect(generateInitials('')).toBe('?');
    });

    it('handles multiple spaces', () => {
      expect(generateInitials('John  Doe')).toBe('JD');
    });

    it('handles names with more than two words', () => {
      expect(generateInitials('John Middle Doe')).toBe('JD');
    });
  });

  describe('getDefaultAvatarUrl', () => {
    it('generates correct URL with default options', () => {
      const url = getDefaultAvatarUrl({ name: 'John Doe' });
      expect(url).toContain('ui-avatars.com/api/');
      expect(url).toContain('name=JD');
      expect(url).toContain('background=7C3AED');
      expect(url).toContain('color=FFFFFF');
      expect(url).toContain('size=128');
    });

    it('allows custom background color', () => {
      const url = getDefaultAvatarUrl({ name: 'John', background: '000000' });
      expect(url).toContain('background=000000');
    });

    it('encodes special characters in name', () => {
      const url = getDefaultAvatarUrl({ name: 'J&D' });
      expect(url).toContain('name=J%26D');
    });
  });

  describe('getAvatarUrl', () => {
    it('returns input URL if it starts with http', () => {
      const url = 'https://example.com/avatar.jpg';
      expect(getAvatarUrl(url, 'John')).toBe(url);
    });

    it('adds public/assets prefix to local paths', () => {
      expect(getAvatarUrl('avatar.jpg', 'John')).toBe('/public/assets/avatar.jpg');
    });

    it('handles null/undefined image by returning default avatar', () => {
      const defaultUrl = getAvatarUrl(null, 'John');
      expect(defaultUrl).toContain('ui-avatars.com');
      expect(defaultUrl).toContain('name=J');
    });

    it('removes extra slashes from local paths', () => {
      expect(getAvatarUrl('/avatar.jpg', 'John')).toBe('/public/assets/avatar.jpg');
    });
  });
}); 