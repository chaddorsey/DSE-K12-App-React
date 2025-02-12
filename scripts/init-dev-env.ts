import { devDataService } from '../src/services/devDataService';
import { logger } from '../src/utils/logger';

async function initDevEnvironment() {
  try {
    logger.info('Initializing development environment...');

    // Clear any existing dummy data
    await devDataService.clearDummyData();
    
    // Seed initial dummy users
    const userCount = Number(process.env.REACT_APP_DUMMY_USER_COUNT || 50);
    await devDataService.seedDummyUsers(userCount);

    logger.info('Development environment initialized successfully');
  } catch (error) {
    logger.error('Failed to initialize development environment:', error);
    process.exit(1);
  }
}

initDevEnvironment(); 