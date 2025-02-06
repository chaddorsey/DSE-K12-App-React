/**
 * Tests for NumberField component
 */
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { NumberField } from '../NumberField';
import { FormProvider } from '../../FormProvider';
import { mockMonitoring } from '../../../../hooks/testing/mockMonitoring';
import { verifyPerformanceTracking } from './testUtils';

const mockMonitors = mockMonitoring();

type TestForm = Record<string, unknown> & {
  age: number;
};

describe('NumberField', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render with label and input', () => {
    render(
      <FormProvider<TestForm>
        initialValues={{ age: 0 }}
        onSubmit={jest.fn()}
      >
        <NumberField<TestForm>
          name="age"
          label="Age"
          required
        />
      </FormProvider>
    );

    expect(screen.getByLabelText('Age *')).toBeInTheDocument();
    const input = screen.getByRole('spinbutton');
    expect(input).toHaveAttribute('type', 'number');
    expect(input).toHaveAttribute('name', 'age');
  });

  it('should handle min, max and step attributes', () => {
    render(
      <FormProvider<TestForm>
        initialValues={{ age: 0 }}
        onSubmit={jest.fn()}
      >
        <NumberField<TestForm>
          name="age"
          label="Age"
          min={0}
          max={100}
          step={1}
        />
      </FormProvider>
    );

    const input = screen.getByRole('spinbutton');
    expect(input).toHaveAttribute('min', '0');
    expect(input).toHaveAttribute('max', '100');
    expect(input).toHaveAttribute('step', '1');
  });

  it('should show increment/decrement controls when enabled', () => {
    render(
      <FormProvider<TestForm>
        initialValues={{ age: 0 }}
        onSubmit={jest.fn()}
      >
        <NumberField<TestForm>
          name="age"
          label="Age"
          showControls
        />
      </FormProvider>
    );

    expect(screen.getByRole('button', { name: 'Increment' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Decrement' })).toBeInTheDocument();
  });

  it('should handle value changes', async () => {
    const handleChange = jest.fn();

    render(
      <FormProvider<TestForm>
        initialValues={{ age: 0 }}
        onSubmit={jest.fn()}
      >
        <NumberField<TestForm>
          name="age"
          label="Age"
          onChange={handleChange}
        />
      </FormProvider>
    );

    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '25' } });

    expect(handleChange).toHaveBeenCalled();
    expect(mockMonitors.trackPerformance).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'form_interaction',
        success: true
      })
    );
  });

  it('should handle increment/decrement controls', () => {
    render(
      <FormProvider<TestForm>
        initialValues={{ age: 5 }}
        onSubmit={jest.fn()}
      >
        <NumberField<TestForm>
          name="age"
          label="Age"
          showControls
          min={0}
          max={10}
        />
      </FormProvider>
    );

    const increment = screen.getByRole('button', { name: 'Increment' });
    const decrement = screen.getByRole('button', { name: 'Decrement' });
    const input = screen.getByRole('spinbutton');

    fireEvent.click(increment);
    expect(input).toHaveValue(6);

    fireEvent.click(decrement);
    expect(input).toHaveValue(5);
  });

  it('should respect min/max bounds with controls', () => {
    render(
      <FormProvider<TestForm>
        initialValues={{ age: 0 }}
        onSubmit={jest.fn()}
      >
        <NumberField<TestForm>
          name="age"
          label="Age"
          showControls
          min={0}
          max={5}
        />
      </FormProvider>
    );

    const decrement = screen.getByRole('button', { name: 'Decrement' });
    const input = screen.getByRole('spinbutton');

    fireEvent.click(decrement);
    expect(input).toHaveValue(0); // Should not go below min

    // Set to max and try to increment
    fireEvent.change(input, { target: { value: '5' } });
    const increment = screen.getByRole('button', { name: 'Increment' });
    fireEvent.click(increment);
    expect(input).toHaveValue(5); // Should not exceed max
  });

  describe('performance tracking', () => {
    it('should track successful change interactions', async () => {
      const handleChange = jest.fn();
      
      render(
        <FormProvider<TestForm>
          initialValues={{ age: 0 }}
          onSubmit={jest.fn()}
        >
          <NumberField<TestForm>
            name="age"
            label="Age"
            onChange={handleChange}
          />
        </FormProvider>
      );

      fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '25' } });
      verifyPerformanceTracking(mockMonitors);
    });

    it('should track successful control interactions', async () => {
      render(
        <FormProvider<TestForm>
          initialValues={{ age: 5 }}
          onSubmit={jest.fn()}
        >
          <NumberField<TestForm>
            name="age"
            label="Age"
            showControls
          />
        </FormProvider>
      );

      fireEvent.click(screen.getByRole('button', { name: 'Increment' }));
      verifyPerformanceTracking(mockMonitors);
    });

    it('should track failed interactions', async () => {
      const error = new Error('Test error');
      const handleChange = jest.fn().mockRejectedValue(error);
      
      render(
        <FormProvider<TestForm>
          initialValues={{ age: 0 }}
          onSubmit={jest.fn()}
        >
          <NumberField<TestForm>
            name="age"
            label="Age"
            onChange={handleChange}
          />
        </FormProvider>
      );

      fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '25' } });
      
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