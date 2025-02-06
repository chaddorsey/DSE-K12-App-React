import { verifyPerformanceTracking } from './testUtils';

describe('SelectField', () => {
  // ... existing tests ...

  describe('performance tracking', () => {
    it('should track successful change interactions', async () => {
      const handleChange = jest.fn();
      
      render(
        <FormProvider<TestForm>
          initialValues={{ preference: '' }}
          onSubmit={jest.fn()}
        >
          <SelectField<TestForm>
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

      fireEvent.change(screen.getByRole('combobox'), { target: { value: 'option1' } });
      verifyPerformanceTracking(mockMonitors);
    });

    it('should track successful blur interactions', async () => {
      const handleBlur = jest.fn();
      
      render(
        <FormProvider<TestForm>
          initialValues={{ preference: '' }}
          onSubmit={jest.fn()}
        >
          <SelectField<TestForm>
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

      fireEvent.blur(screen.getByRole('combobox'));
      verifyPerformanceTracking(mockMonitors);
    });

    it('should track multiple select changes', async () => {
      render(
        <FormProvider<TestForm>
          initialValues={{ preferences: [] }}
          onSubmit={jest.fn()}
        >
          <SelectField<TestForm>
            name="preferences"
            label="Preferences"
            options={[
              { value: 'option1', label: 'Option 1' },
              { value: 'option2', label: 'Option 2' }
            ]}
            multiple
          />
        </FormProvider>
      );

      const select = screen.getByRole('listbox');
      fireEvent.change(select, { 
        target: { 
          options: [
            { value: 'option1', selected: true },
            { value: 'option2', selected: true }
          ]
        } 
      });

      verifyPerformanceTracking(mockMonitors);
    });

    it('should track failed interactions', async () => {
      const error = new Error('Test error');
      const handleChange = jest.fn().mockRejectedValue(error);
      
      render(
        <FormProvider<TestForm>
          initialValues={{ preference: '' }}
          onSubmit={jest.fn()}
        >
          <SelectField<TestForm>
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

      fireEvent.change(screen.getByRole('combobox'), { target: { value: 'option1' } });
      
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