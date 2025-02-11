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
const isDev = process.env.NODE_ENV === 'development';
if (isDev) {
  questionConfig.useTestData = questionConfig.useTestData || false;
  questionConfig.testDataCount = questionConfig.testDataCount || 50;
} 