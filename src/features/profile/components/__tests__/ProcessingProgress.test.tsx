import { render, screen } from '@testing-library/react';
import { ProcessingProgress } from '../ProcessingProgress';

describe('ProcessingProgress', () => {
  it('renders progress bar with correct width', () => {
    render(
      <ProcessingProgress
        stage="thumbnail"
        progress={50}
        currentTask="Processing image"
      />
    );

    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveStyle({ width: '50%' });
  });

  it('displays stage and task information', () => {
    render(
      <ProcessingProgress
        stage="optimize"
        progress={75}
        currentTask="Optimizing image"
      />
    );

    expect(screen.getByText('optimize')).toBeInTheDocument();
    expect(screen.getByText('Optimizing image')).toBeInTheDocument();
  });

  it('handles missing currentTask', () => {
    render(
      <ProcessingProgress
        stage="complete"
        progress={100}
      />
    );

    expect(screen.getByText('complete')).toBeInTheDocument();
    expect(screen.queryByTestId('task')).not.toBeInTheDocument();
  });
}); 