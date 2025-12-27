import { Play, Pause, SkipBack, SkipForward } from "lucide-react";

interface PlayerControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

export const PlayerControls = ({
  isPlaying,
  onPlayPause,
  onPrevious,
  onNext,
}: PlayerControlsProps) => {
  return (
    <div className="flex items-center justify-center gap-4">
      <button
        onClick={onPrevious}
        className="text-amber-400 hover:text-amber-500 transition-colors p-2 rounded-full hover:bg-slate-700/50"
        aria-label="Previous track"
      >
        <SkipBack size={24} />
      </button>

      <button
        onClick={onPlayPause}
        className="bg-amber-400 hover:bg-amber-500 text-slate-900 rounded-full p-3 transition-all hover:scale-105"
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" />}
      </button>

      <button
        onClick={onNext}
        className="text-amber-400 hover:text-amber-500 transition-colors p-2 rounded-full hover:bg-slate-700/50"
        aria-label="Next track"
      >
        <SkipForward size={24} />
      </button>
    </div>
  );
};
