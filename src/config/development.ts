export const developmentConfig = {
  emulators: {
    auth: {
      host: process.env.REACT_APP_EMULATOR_HOST || 'localhost',
      port: 9099
    },
    firestore: {
      host: process.env.REACT_APP_EMULATOR_HOST || 'localhost',
      port: 8080
    },
    storage: {
      host: process.env.REACT_APP_EMULATOR_HOST || 'localhost',
      port: 9199
    }
  },
  dummyData: {
    userCount: Number(process.env.REACT_APP_DUMMY_USER_COUNT || 50)
  }
}; 