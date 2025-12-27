interface SongGridProps {
  songs: Array<{
    title: string;
    artist: string;
    albumArt: string;
  }>;
  onSongSelect: (index: number) => void;
}

export const SongGrid = ({ songs, onSongSelect }: SongGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {songs.map((song, index) => (
        <article
          key={index}
          className="bg-slate-800/60 rounded-xl overflow-hidden shadow-md group relative hover:shadow-lg transition-shadow"
        >
          <img
            src={`albumart/${song.albumArt}`}
            alt={song.title}
            className="w-full h-44 object-cover"
          />
          <div className="p-4">
            <h3 className="font-semibold truncate">{song.title}</h3>
            <p className="text-sm text-amber-200/70">{song.artist}</p>
          </div>
          <button
            onClick={() => onSongSelect(index)}
            className="play-card absolute right-3 bottom-3 bg-amber-400 p-2 rounded-full shadow-md transform transition-transform group-hover:scale-105 hover:bg-amber-500 text-slate-900"
            aria-label={`Play ${song.title}`}
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        </article>
      ))}
    </div>
  );
};
