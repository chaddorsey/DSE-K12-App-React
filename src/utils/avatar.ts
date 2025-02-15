interface AvatarOptions {
  name: string;
  background?: string;
  color?: string;
  size?: number;
}

export const generateInitials = (name: string = 'User'): string => {
  const parts = name.split(' ').filter(part => part.length > 0);
  if (parts.length === 0) return 'U';
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

export const getDefaultAvatarUrl = ({ name, size = 40, background = '2563eb', color = 'ffffff' }: AvatarOptions): string => {
  const initials = generateInitials(name);
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=${size}&background=${background}&color=${color}`;
};

// Get avatar URL with fallback to default
export const getAvatarUrl = (image: string | null | undefined, name: string, size: number = 40): string => {
  if (!image) {
    return getDefaultAvatarUrl({ name, size });
  }
  // Uploaded image path
  if (image.startsWith('http')) {
    const url = new URL(image);
    url.searchParams.set('size', size.toString());
    return url.toString();
  }
  // If it's a local path, ensure it has the correct prefix and size
  if (!image.startsWith('/public/assets/')) {
    return `/public/assets/${image.replace(/^\/+/, '')}?size=${size}`;
  }
  return `${image}?size=${size}`;
}; 