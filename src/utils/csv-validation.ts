import { UserRole } from '../features/auth/types/auth';
import chalk from 'chalk';

export interface CsvRow {
  email: string;
  displayName: string;
  role: string;
  organization?: string;
  image?: string;
}

export class CsvValidationError extends Error {
  constructor(
    message: string,
    public row: number,
    public field: string
  ) {
    super(message);
    this.name = 'CsvValidationError';
  }
}

const validRoles: UserRole[] = ['user', 'admin'];

const isValidUrl = (str: string): boolean => {
  return /^https?:\/\/.+/.test(str);
};

const normalizeImagePath = (imagePath: string): string => {
  if (isValidUrl(imagePath)) {
    return imagePath;
  }
  // Remove leading slash if present to ensure consistent format
  const cleanPath = imagePath.replace(/^\/+/, '');
  return `/public/assets/${cleanPath}`;
};

export function validateCsvRow(row: CsvRow, rowIndex: number): void {
  // Validate email
  if (!row.email) {
    throw new CsvValidationError('Email is required', rowIndex, 'email');
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(row.email)) {
    throw new CsvValidationError('Invalid email format', rowIndex, 'email');
  }

  // Validate displayName
  if (!row.displayName) {
    throw new CsvValidationError('Display name is required', rowIndex, 'displayName');
  }
  if (row.displayName.length < 2) {
    throw new CsvValidationError('Display name must be at least 2 characters', rowIndex, 'displayName');
  }

  // Validate role
  if (!row.role) {
    throw new CsvValidationError('Role is required', rowIndex, 'role');
  }
  if (!validRoles.includes(row.role.toLowerCase() as UserRole)) {
    throw new CsvValidationError(
      `Invalid role. Must be one of: ${validRoles.join(', ')}`,
      rowIndex,
      'role'
    );
  }

  // Validate image path/URL if provided
  if (row.image) {
    if (!isValidUrl(row.image) && !/\.(jpg|jpeg|png|gif|webp)$/i.test(row.image)) {
      throw new CsvValidationError(
        'Image must be either a valid URL or a valid image file name (jpg, jpeg, png, gif, webp)',
        rowIndex,
        'image'
      );
    }
    // Normalize the image path
    row.image = normalizeImagePath(row.image);
  } else {
    // No image provided - will use default avatar
    console.log(chalk.blue(`Row ${rowIndex}: No image provided - will use default avatar`));
  }
} 