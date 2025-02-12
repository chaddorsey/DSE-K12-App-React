interface AvatarOptions {
  name: string;
  background?: string;
  color?: string;
  size?: number;
}

export const generateInitials = (name: string): string => {
  const parts = name.split(' ').filter(part => part.length > 0);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

export const getDefaultAvatarUrl = ({
  name,
  background = '7C3AED', // Indigo-600
  color = 'FFFFFF',
  size = 128
}: AvatarOptions): string => {
  const initials = generateInitials(name);
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=${background}&color=${color}&size=${size}&bold=true&format=svg`;
};

// Get avatar URL with fallback to default
export const getAvatarUrl = (image: string | undefined | null, name: string, size: number = 128): string => {
  if (image) {
    // If it's already a full URL, return it
    if (image.startsWith('http')) {
      return image;
    }
    // If it's a local path, ensure it has the correct prefix
    if (!image.startsWith('/public/assets/')) {
      return `/public/assets/${image.replace(/^\/+/, '')}`;
    }
    return image;
  }
  return getDefaultAvatarUrl({ name, size });
}; 