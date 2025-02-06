import React from 'react';
import type { IFormRenderProps } from '../FormContainer';
import type { RequestBody } from '../../api/types/endpoints';
import './Settings.css';

type SettingsFormProps = IFormRenderProps<RequestBody<'users.settings'>>;

export const SettingsForm: React.FC<SettingsFormProps> = ({
  data,
  errors,
  isSubmitting,
  setFieldValue,
  handleSubmit
}) => {
  return (
    <form onSubmit={handleSubmit} className="settings-form">
      <div className="settings-form__field">
        <label htmlFor="theme">Theme</label>
        <select
          id="theme"
          value={data.theme}
          onChange={e => setFieldValue('theme', e.target.value)}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
        {errors.theme && <span className="error">{errors.theme}</span>}
      </div>

      <div className="settings-form__field">
        <label htmlFor="notifications">
          <input
            type="checkbox"
            id="notifications"
            checked={data.notifications}
            onChange={e => setFieldValue('notifications', e.target.checked)}
          />
          Enable Notifications
        </label>
        {errors.notifications && <span className="error">{errors.notifications}</span>}
      </div>

      <div className="settings-form__field">
        <label htmlFor="language">Language</label>
        <select
          id="language"
          value={data.language}
          onChange={e => setFieldValue('language', e.target.value)}
        >
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
        </select>
        {errors.language && <span className="error">{errors.language}</span>}
      </div>

      <div className="settings-form__field">
        <label htmlFor="timezone">Timezone</label>
        <select
          id="timezone"
          value={data.timezone}
          onChange={e => setFieldValue('timezone', e.target.value)}
        >
          <option value="UTC">UTC</option>
          <option value="EST">Eastern Time</option>
          <option value="PST">Pacific Time</option>
        </select>
        {errors.timezone && <span className="error">{errors.timezone}</span>}
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting}
        className="settings-form__submit"
      >
        {isSubmitting ? 'Saving...' : 'Save Settings'}
      </button>
    </form>
  );
}; 