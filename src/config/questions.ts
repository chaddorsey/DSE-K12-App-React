// Define environment interface
declare global {
  interface Window {
    ENV?: {
      USE_TEST_DATA?: boolean;
      TEST_DATA_COUNT?: number;
      QUESTION_DATA_SOURCE?: string;
    }
  }
}

// Default values for development
const defaultConfig = {
  useTestData: false,
  testDataCount: 50,
  dataSource: 'json'
};

// Export a safe configuration object that falls back to defaults
export const questionConfig = {
  useTestData: window?.ENV?.USE_TEST_DATA ?? defaultConfig.useTestData,
  testDataCount: window?.ENV?.TEST_DATA_COUNT ?? defaultConfig.testDataCount,
  dataSource: window?.ENV?.QUESTION_DATA_SOURCE ?? defaultConfig.dataSource
};

// For development, set default values
const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';
const isTest = process.env.NODE_ENV === 'test';

if (isDevelopment) {
  questionConfig.useTestData = questionConfig.useTestData || false;
  questionConfig.testDataCount = questionConfig.testDataCount || 50;
} 