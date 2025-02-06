/**
 * Tests for FileField component
 */
import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { FileField } from '..';
import { FormProvider } from '../../FormProvider';
import { mockMonitoring } from '../../../../hooks/testing/mockMonitoring';
import { verifyPerformanceTracking } from './testUtils';

const mockMonitors = mockMonitoring();

type TestForm = Record<string, unknown> & {
  avatar: File | null;
};

describe('FileField', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const createFile = (name: string, size: number, type: string): File => {
    return new File([''], name, { type });
  };

  it('should render with label and input', () => {
    render(
      <FormProvider<TestForm>
        initialValues={{ avatar: null }}
        onSubmit={jest.fn()}
      >
        <FileField<TestForm>
          name="avatar"
          label="Profile Picture"
          required
        />
      </FormProvider>
    );

    expect(screen.getByLabelText('Profile Picture *')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Choose file' })).toBeInTheDocument();
  });

  it('should handle file selection', async () => {
    const handleChange = jest.fn();
    const file = createFile('test.jpg', 1024, 'image/jpeg');

    render(
      <FormProvider<TestForm>
        initialValues={{ avatar: null }}
        onSubmit={jest.fn()}
      >
        <FileField<TestForm>
          name="avatar"
          label="Profile Picture"
          onChange={handleChange}
          accept="image/*"
        />
      </FormProvider>
    );

    const input = screen.getByTestId('file-input');
    Object.defineProperty(input, 'files', {
      value: [file]
    });

    fireEvent.change(input);

    expect(handleChange).toHaveBeenCalled();
    expect(screen.getByText('test.jpg')).toBeInTheDocument();
    expect(mockMonitors.trackPerformance).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'form_interaction',
        success: true
      })
    );
  });

  it('should validate file size', async () => {
    const file = createFile('large.jpg', 5 * 1024 * 1024, 'image/jpeg');

    render(
      <FormProvider<TestForm>
        initialValues={{ avatar: null }}
        onSubmit={jest.fn()}
      >
        <FileField<TestForm>
          name="avatar"
          label="Profile Picture"
          maxSize={1 * 1024 * 1024} // 1MB
        />
      </FormProvider>
    );

    const input = screen.getByTestId('file-input');
    Object.defineProperty(input, 'files', {
      value: [file]
    });

    fireEvent.change(input);

    await waitFor(() => {
      expect(screen.getByText('File size must be less than 1MB')).toBeInTheDocument();
    });
  });

  it('should validate file type', async () => {
    const file = createFile('doc.pdf', 1024, 'application/pdf');

    render(
      <FormProvider<TestForm>
        initialValues={{ avatar: null }}
        onSubmit={jest.fn()}
      >
        <FileField<TestForm>
          name="avatar"
          label="Profile Picture"
          accept="image/*"
        />
      </FormProvider>
    );

    const input = screen.getByTestId('file-input');
    Object.defineProperty(input, 'files', {
      value: [file]
    });

    fireEvent.change(input);

    await waitFor(() => {
      expect(screen.getByText('Invalid file type')).toBeInTheDocument();
    });
  });

  describe('performance tracking', () => {
    it('should track successful file selection', async () => {
      const handleChange = jest.fn();
      const file = createFile('test.jpg', 1024, 'image/jpeg');
      
      render(
        <FormProvider<TestForm>
          initialValues={{ avatar: null }}
          onSubmit={jest.fn()}
        >
          <FileField<TestForm>
            name="avatar"
            label="Profile Picture"
            onChange={handleChange}
          />
        </FormProvider>
      );

      const input = screen.getByTestId('file-input');
      Object.defineProperty(input, 'files', { value: [file] });
      fireEvent.change(input);

      verifyPerformanceTracking(mockMonitors);
    });

    it('should track validation failures', async () => {
      const file = createFile('large.jpg', 5 * 1024 * 1024, 'image/jpeg');
      
      render(
        <FormProvider<TestForm>
          initialValues={{ avatar: null }}
          onSubmit={jest.fn()}
        >
          <FileField<TestForm>
            name="avatar"
            label="Profile Picture"
            maxSize={1 * 1024 * 1024}
          />
        </FormProvider>
      );

      const input = screen.getByTestId('file-input');
      Object.defineProperty(input, 'files', { value: [file] });
      fireEvent.change(input);

      expect(mockMonitors.trackPerformance).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'interaction',
          success: false,
          totalTime: expect.any(Number),
          duration: expect.any(Number),
          metadata: expect.objectContaining({
            type: 'change'
          })
        })
      );
    });
  });
}); 