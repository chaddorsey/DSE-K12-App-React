import React from 'react';
import { FormContainer } from '../FormContainer/FormContainer';
import { UserSettingsForm } from './UserSettingsForm';
import { IUserSettings } from '@/features/auth/types/user';
import { EndpointPath } from '@/api/types/endpoints';

// Define the settings endpoint type
type UserSettingsEndpoint = Extract<EndpointPath, 'users.settings'>;

const validateSettings = (data: Partial<IUserSettings>): Record<string, string> | null => {
  const errors: Record<string, string> = {};

  if (!data.language) {
    errors.language = 'Language is required';
  }
  if (!data.timezone) {
    errors.timezone = 'Timezone is required';
  }

  return Object.keys(errors).length ? errors : null;
};

export const UserSettings: React.FC = () => {
  const handleSuccess = () => {
    // Handle successful update
  };

  return (
    <FormContainer<UserSettingsEndpoint>
      endpoint="users.settings"
      validate={validateSettings}
      onSuccess={handleSuccess}
    >
      {(formProps) => <UserSettingsForm {...formProps} />}
    </FormContainer>
  );
}; 