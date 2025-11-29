interface ProgressBarProps {
  progress: number;
}

function ProgressBar({ progress }: ProgressBarProps) {
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className="progress-bar">
      <div 
        className="progress-bar-inner" 
        style={{ width: `${clampedProgress}%` }}
      />
    </div>
  );
}

export default ProgressBar;


