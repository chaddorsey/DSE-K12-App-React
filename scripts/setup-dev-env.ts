import { devDataService } from '../src/services/devDataService';

async function setupDevEnvironment() {
  const userCount = process.env.REACT_APP_DUMMY_USER_COUNT || 50;
  
  try {
    await devDataService.seedDummyUsers(Number(userCount));
    console.log('Development environment setup complete!');
  } catch (error) {
    console.error('Error setting up development environment:', error);
    process.exit(1);
  }
}

setupDevEnvironment(); 