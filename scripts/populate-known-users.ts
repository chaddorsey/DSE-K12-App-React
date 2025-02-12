import { db } from '../src/config/firebase';
import { collection, doc, setDoc, writeBatch } from 'firebase/firestore';
import { KnownUser, UserRole } from '../src/features/auth/types/auth';
import { parse } from 'papaparse';
import { readFileSync } from 'fs';
import { validateCsvRow, CsvValidationError } from '../src/utils/csv-validation';
import { existsSync } from 'fs';
import { join } from 'path';
import chalk from 'chalk';

interface ImportStats {
  total: number;
  success: number;
  failed: number;
  errors: Array<{ row: number; error: string }>;
}

const validateLocalImage = (imagePath: string): boolean => {
  if (/^https?:\/\/.+/.test(imagePath)) {
    return true;
  }
  
  // Remove /public/assets/ prefix if present
  const cleanPath = imagePath.replace(/^\/public\/assets\//, '');
  const fullPath = join(process.cwd(), 'public', 'assets', cleanPath);
  
  if (!existsSync(fullPath)) {
    console.warn(chalk.yellow(`Warning: Image file not found at ${fullPath}`));
    return false;
  }
  return true;
};

async function loadKnownUsersFromCsv(filepath: string): Promise<KnownUser[]> {
  console.log(chalk.blue(`Loading users from ${filepath}...`));
  
  const csvFile = readFileSync(filepath, 'utf-8');
  const { data, errors } = parse(csvFile, {
    header: true,
    skipEmptyLines: true,
    transform: (value) => value.trim()
  });

  if (errors.length > 0) {
    console.error(chalk.red('CSV parsing errors:'));
    errors.forEach(error => console.error(chalk.red(`  Row ${error.row}: ${error.message}`)));
    throw new Error('CSV parsing failed');
  }

  const users: KnownUser[] = [];
  const stats: ImportStats = { total: data.length, success: 0, failed: 0, errors: [] };

  data.forEach((row: any, index: number) => {
    try {
      validateCsvRow(row, index + 2);
      // Validate that local images exist
      if (row.image && !validateLocalImage(row.image)) {
        stats.errors.push({
          row: index + 2,
          error: `Image file not found: ${row.image}`
        });
        stats.failed++;
        return;
      }
      users.push({
        email: row.email.toLowerCase(),
        displayName: row.displayName,
        role: row.role.toLowerCase() as UserRole,
        organization: row.organization,
        image: row.image
      });
      stats.success++;
    } catch (error) {
      if (error instanceof CsvValidationError) {
        stats.errors.push({
          row: error.row,
          error: `${error.field}: ${error.message}`
        });
      } else {
        stats.errors.push({
          row: index + 2,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
      stats.failed++;
    }
  });

  printImportStats(stats);

  if (stats.failed > 0) {
    throw new Error('Validation failed. Check the errors above.');
  }

  return users;
}

function printImportStats(stats: ImportStats): void {
  console.log('\nImport Statistics:');
  console.log(chalk.blue(`Total rows: ${stats.total}`));
  console.log(chalk.green(`Successfully validated: ${stats.success}`));
  if (stats.failed > 0) {
    console.log(chalk.red(`Failed validation: ${stats.failed}`));
    console.log('\nErrors:');
    stats.errors.forEach(({ row, error }) => {
      console.log(chalk.red(`  Row ${row}: ${error}`));
    });
  }
}

async function populateKnownUsers(filepath: string) {
  try {
    const users = await loadKnownUsersFromCsv(filepath);
    const knownUsersRef = collection(db, 'known_users');
    const batch = writeBatch(db);
    
    console.log(chalk.blue('\nStarting database upload...'));
    
    users.forEach(user => {
      const docRef = doc(knownUsersRef, user.email);
      batch.set(docRef, {
        ...user,
        updatedAt: new Date(),
        importedAt: new Date()
      });
    });

    await batch.commit();
    console.log(chalk.green(`\nSuccessfully imported ${users.length} users to the database`));

  } catch (error) {
    console.error(chalk.red('\nError during import:'));
    console.error(chalk.red(error instanceof Error ? error.message : 'Unknown error'));
    process.exit(1);
  }
}

// Check if filepath is provided
const filepath = process.argv[2];
if (!filepath) {
  console.error(chalk.red('Please provide a CSV file path'));
  console.log(chalk.yellow('Usage: npm run populate:known-users -- ./data/known-users.csv'));
  process.exit(1);
}

populateKnownUsers(filepath); 
populateKnownUsers(); 