import React from 'react';
import { FormContainer } from '../FormContainer';
import { SettingsForm } from './SettingsForm';
import { usePerformanceMonitoring } from '../../monitoring/hooks/useMonitoring';
import type { IUserSettings } from '../../api/types/models';

export const Settings: React.FC = () => {
  usePerformanceMonitoring('Settings');

  return (
    <FormContainer
      endpoint="users.settings"
      initialValues={{
        theme: 'light',
        notifications: true,
        language: 'en',
        timezone: 'UTC'
      }}
    >
      {(formProps) => <SettingsForm {...formProps} />}
    </FormContainer>
  );
}; 