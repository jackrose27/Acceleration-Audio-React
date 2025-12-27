import { PlayerControls } from "./PlayerControls";
import { ProgressBar } from "./ProgressBar";

interface NowPlayingProps {
  albumArt: string;
  title: string;
  artist: string;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  onPlayPause: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onSeek: (time: number) => void;
}

export const NowPlaying = ({
  albumArt,
  title,
  artist,
  isPlaying,
  currentTime,
  duration,
  onPlayPause,
  onPrevious,
  onNext,
  onSeek,
}: NowPlayingProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-700 p-4 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-4">
          <ProgressBar
            currentTime={currentTime}
            duration={duration}
            onSeek={onSeek}
          />
        </div>

        {/* Player Info and Controls */}
        <div className="flex items-center gap-4">
          {/* Album Art */}
          <div className="hidden sm:block w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden">
            <img
              src={`albumart/${albumArt}`}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Track Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-white truncate">{title}</h3>
            <p className="text-sm text-amber-200/70 truncate">{artist}</p>
          </div>

          {/* Controls */}
          <PlayerControls
            isPlaying={isPlaying}
            onPlayPause={onPlayPause}
            onPrevious={onPrevious}
            onNext={onNext}
          />
        </div>
      </div>
    </div>
  );
};
