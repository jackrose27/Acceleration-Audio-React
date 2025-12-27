import { useState, useRef, useEffect } from "react";

export interface Song {
  file: string;
  albumArt: string;
  title: string;
  artist: string;
}

export const useSongs = (): Song[] => [
  {
    file: "Aidan.mp3",
    albumArt: "Aidan.jpg",
    title: "Aidan",
    artist: "Various",
  },
  {
    file: "autumn_sun.mp3",
    albumArt: "autumn_sun.png",
    title: "Autumn Sun",
    artist: "Instrumental",
  },
  {
    file: "best_part_of_me.mp3",
    albumArt: "BestPart.jpg",
    title: "Best Part Of Me",
    artist: "Artist",
  },
  {
    file: "Better Days - LAKEY INSPIRED.mp3",
    albumArt: "Better Days.jpg",
    title: "Better Days",
    artist: "LAKEY INSPIRED",
  },
  {
    file: "i_cant_make_you_love_me_cover.mp3",
    albumArt: "i_cant_make_you_love_me_cover.jpeg",
    title: "I Can't Make You Love Me",
    artist: "Cover",
  },
  {
    file: "just_relax.mp3",
    albumArt: "justRelax_img.jpeg",
    title: "Just Relax",
    artist: "Chill",
  },
  {
    file: "paranormal-is-real-leonell-cassio.mp3",
    albumArt: "paranormal_real_500.jpg",
    title: "Paranormal Is Real",
    artist: "Leonell Cassio",
  },
  {
    file: "Polarity.mp3",
    albumArt: "Polarity.jpg",
    title: "Polarity",
    artist: "Artist",
  },
];

export const useAudioPlayer = (songs: Song[]) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isShuffle, setIsShuffle] = useState(false);

  const playTrack = (index: number) => {
    setCurrentTrack(index);
    if (audioRef.current) {
      audioRef.current.src = `songs/${songs[index].file}`;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (!audioRef.current.src) {
      playTrack(currentTrack);
    } else if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const nextTrack = () => {
    let next: number;
    if (isShuffle) {
      next = Math.floor(Math.random() * songs.length);
    } else {
      next = (currentTrack + 1) % songs.length;
    }
    playTrack(next);
  };

  const prevTrack = () => {
    const prev = (currentTrack - 1 + songs.length) % songs.length;
    playTrack(prev);
  };

  const seekTo = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
    }
  };

  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(
        audioRef.current.currentTime + 10,
        duration
      );
    }
  };

  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(
        audioRef.current.currentTime - 10,
        0
      );
    }
  };

  // Setup keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key.toLowerCase()) {
        case " ":
          event.preventDefault();
          togglePlay();
          break;
        case "m":
          toggleMute();
          break;
        case "arrowright":
          skipForward();
          break;
        case "arrowleft":
          skipBackward();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [togglePlay, toggleMute, skipForward, skipBackward, isShuffle]);

  // Setup audio event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      // Gradually increase playback speed
      audio.playbackRate += 0.01;
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      nextTrack();
    };

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, [currentTrack]);

  const toggleShuffle = () => {
    setIsShuffle(!isShuffle);
  };

  return {
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
    toggleMute,
    skipForward,
    skipBackward,
    toggleShuffle,
  };
};
