export const profileMetrics = {
  trackPhotoUpload: (success: boolean, duration: number) => {
    logger.info('Profile photo upload', { success, duration });
    // Add metrics tracking
  }
}; 