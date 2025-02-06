import React from 'react';
import type { IFormRenderProps } from '../FormContainer/FormContainer';
import type { EndpointPath } from '../../api/types/endpoints';

export const UserSettingsForm: React.FC<IFormRenderProps<'users.settings'>> = ({
  data,
  errors,
  isSubmitting,
  setFieldValue,
  handleSubmit
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="language">Language</label>
        <select
          id="language"
          value={data.language || ''}
          onChange={e => setFieldValue('language', e.target.value)}
        >
          <option value="">Select language...</option>
          <option value="en">English</option>
          <option value="es">Spanish</option>
        </select>
        {errors.language && <span className="error">{errors.language}</span>}
      </div>

      <div>
        <label htmlFor="timezone">Timezone</label>
        <select
          id="timezone"
          value={data.timezone || ''}
          onChange={e => setFieldValue('timezone', e.target.value)}
        >
          <option value="">Select timezone...</option>
          <option value="UTC">UTC</option>
          <option value="EST">EST</option>
          <option value="PST">PST</option>
        </select>
        {errors.timezone && <span className="error">{errors.timezone}</span>}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : 'Save Settings'}
      </button>
    </form>
  );
}; 