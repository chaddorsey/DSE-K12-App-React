/**
 * Tests for RadioGroupField component
 */
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { RadioGroupField } from '../RadioGroupField';
import { FormProvider } from '../../FormProvider';
import { mockMonitoring } from '../../../../hooks/testing/mockMonitoring';
import { verifyPerformanceTracking } from './testUtils';

const mockMonitors = mockMonitoring();

type TestForm = Record<string, unknown> & {
  preference: string;
};

const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' }
];

describe('RadioGroupField', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render radio options with labels', () => {
    render(
      <FormProvider<TestForm>
        initialValues={{ preference: '' }}
        onSubmit={jest.fn()}
      >
        <RadioGroupField<TestForm>
          name="preference"
          label="Select Preference"
          options={options}
        />
      </FormProvider>
    );

    options.forEach(option => {
      expect(screen.getByLabelText(option.label)).toBeInTheDocument();
    });
  });

  it('should handle selection changes', () => {
    const handleChange = jest.fn();

    render(
      <FormProvider<TestForm>
        initialValues={{ preference: '' }}
        onSubmit={jest.fn()}
      >
        <RadioGroupField<TestForm>
          name="preference"
          label="Select Preference"
          options={options}
          onChange={handleChange}
        />
      </FormProvider>
    );

    const radio = screen.getByLabelText('Option 1');
    fireEvent.click(radio);

    expect(handleChange).toHaveBeenCalled();
    expect(mockMonitors.trackPerformance).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'form_interaction',
        success: true
      })
    );
  });

  it('should support horizontal layout', () => {
    render(
      <FormProvider<TestForm>
        initialValues={{ preference: '' }}
        onSubmit={jest.fn()}
      >
        <RadioGroupField<TestForm>
          name="preference"
          label="Select Preference"
          options={options}
          direction="horizontal"
        />
      </FormProvider>
    );

    const group = screen.getByRole('radiogroup');
    expect(group).toHaveClass('field__radio-group--horizontal');
  });

  it('should show error message when invalid', () => {
    render(
      <FormProvider<TestForm>
        initialValues={{ preference: '' }}
        onSubmit={jest.fn()}
      >
        <RadioGroupField<TestForm>
          name="preference"
          label="Select Preference"
          options={options}
          error="Selection required"
        />
      </FormProvider>
    );

    expect(screen.getByText('Selection required')).toBeInTheDocument();
    expect(screen.getByRole('radiogroup')).toHaveAttribute('aria-invalid', 'true');
  });

  describe('performance tracking', () => {
    it('should track successful selection changes', async () => {
      const handleChange = jest.fn();
      
      render(
        <FormProvider<TestForm>
          initialValues={{ preference: '' }}
          onSubmit={jest.fn()}
        >
          <RadioGroupField<TestForm>
            name="preference"
            label="Preference"
            options={[
              { value: 'option1', label: 'Option 1' },
              { value: 'option2', label: 'Option 2' }
            ]}
            onChange={handleChange}
          />
        </FormProvider>
      );

      fireEvent.click(screen.getByLabelText('Option 1'));
      verifyPerformanceTracking(mockMonitors);
    });

    it('should track successful blur interactions', async () => {
      const handleBlur = jest.fn();
      
      render(
        <FormProvider<TestForm>
          initialValues={{ preference: '' }}
          onSubmit={jest.fn()}
        >
          <RadioGroupField<TestForm>
            name="preference"
            label="Preference"
            options={[
              { value: 'option1', label: 'Option 1' },
              { value: 'option2', label: 'Option 2' }
            ]}
            onBlur={handleBlur}
          />
        </FormProvider>
      );

      fireEvent.blur(screen.getByLabelText('Option 1'));
      verifyPerformanceTracking(mockMonitors);
    });

    it('should track disabled option interactions', async () => {
      render(
        <FormProvider<TestForm>
          initialValues={{ preference: '' }}
          onSubmit={jest.fn()}
        >
          <RadioGroupField<TestForm>
            name="preference"
            label="Preference"
            options={[
              { value: 'option1', label: 'Option 1' },
              { value: 'option2', label: 'Option 2', disabled: true }
            ]}
          />
        </FormProvider>
      );

      const disabledOption = screen.getByLabelText('Option 2');
      expect(disabledOption).toBeDisabled();
      fireEvent.click(disabledOption);
      // No performance tracking should occur for disabled options
      expect(mockMonitors.trackPerformance).not.toHaveBeenCalled();
    });

    it('should track failed interactions', async () => {
      const error = new Error('Test error');
      const handleChange = jest.fn().mockRejectedValue(error);
      
      render(
        <FormProvider<TestForm>
          initialValues={{ preference: '' }}
          onSubmit={jest.fn()}
        >
          <RadioGroupField<TestForm>
            name="preference"
            label="Preference"
            options={[
              { value: 'option1', label: 'Option 1' },
              { value: 'option2', label: 'Option 2' }
            ]}
            onChange={handleChange}
          />
        </FormProvider>
      );

      fireEvent.click(screen.getByLabelText('Option 1'));
      
      expect(mockMonitors.trackPerformance).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'interaction',
          success: false,
          totalTime: expect.any(Number),
          duration: expect.any(Number),
          metadata: expect.objectContaining({
            type: 'change',
            error
          })
        })
      );
    });
  });
}); 