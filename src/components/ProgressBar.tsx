interface ProgressBarProps {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
}

export const ProgressBar = ({
  currentTime,
  duration,
  onSeek,
}: ProgressBarProps) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    onSeek(percentage * duration);
  };

  const percentage = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-slate-400 min-w-10">
        {formatTime(currentTime)}
      </span>
      <div
        onClick={handleClick}
        className="flex-1 h-1 bg-slate-700 rounded-full cursor-pointer group"
      >
        <div
          className="h-full bg-amber-400 rounded-full transition-all group-hover:bg-amber-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-xs text-slate-400 min-w-10">
        {formatTime(duration)}
      </span>
    </div>
  );
};

const formatTime = (seconds: number): string => {
  if (!seconds || !isFinite(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};
