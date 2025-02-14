interface ProcessingProgressProps {
  stage: string;
  progress: number;
  currentTask?: string;
}

export const ProcessingProgress: React.FC<ProcessingProgressProps> = ({
  stage,
  progress,
  currentTask
}) => (
  <div className="processing-progress">
    <div className="progress-bar" style={{ width: `${progress}%` }} />
    <div className="progress-info">
      <span className="stage">{stage}</span>
      {currentTask && <span className="task">{currentTask}</span>}
    </div>
  </div>
); 