import { useAudioPlayer, useSongs } from "../hooks/useAudioPlayer";
import { SongGrid } from "./SongGrid";
import { NowPlaying } from "./NowPlaying";

export const AudioPlayer = () => {
  const songs = useSongs();
  const {
    audioRef,
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    isShuffle,
    playTrack,
    togglePlay,
    nextTrack,
    prevTrack,
    seekTo,
    toggleShuffle,
  } = useAudioPlayer(songs);

  return (
    <div className="min-h-screen bg-slate-900 text-white pb-32">
      {/* Audio Element */}
      <audio ref={audioRef} />

      {/* Header */}
      <header className="border-b border-slate-700 mb-8">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-amber-400 text-slate-900 w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg">
              AA
            </div>
            <div>
              <h1 className="text-2xl font-bold">Acceleration Audio</h1>
              <p className="text-sm text-amber-200/70">
                Accelerating music — globally
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold">
                Discover new beats & timeless tracks
              </h2>
              <p className="text-amber-200/70 mt-2">
                A lightweight, fast, and stylish audio player to explore songs
                in your collection.
              </p>
            </div>
            <button
              onClick={toggleShuffle}
              className={`font-semibold px-6 py-2 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap ${
                isShuffle
                  ? "bg-amber-400 hover:bg-amber-500 text-slate-900"
                  : "bg-slate-700 hover:bg-slate-600 text-amber-400"
              }`}
            >
              <span>🔀</span> Shuffle
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4">
        <SongGrid songs={songs} onSongSelect={playTrack} />
      </div>

      {/* Now Playing Bar */}
      <NowPlaying
        albumArt={songs[currentTrack].albumArt}
        title={songs[currentTrack].title}
        artist={songs[currentTrack].artist}
        isPlaying={isPlaying}
        currentTime={currentTime}
        duration={duration}
        onPlayPause={togglePlay}
        onPrevious={prevTrack}
        onNext={nextTrack}
        onSeek={seekTo}
      />
    </div>
  );
};
