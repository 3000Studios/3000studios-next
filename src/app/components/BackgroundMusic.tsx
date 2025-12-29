/**
 * Background Music Engine
 * Rotates through background music tracks with volume and playback controls.
 */

'use client';

import { Pause, Play, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

interface MusicTrack {
  name: string;
  src: string;
  artist?: string;
}

// Production-safe royalty-free tracks (Cloudinary-hosted)
const DEFAULT_TRACKS: MusicTrack[] = [
  {
    name: 'Golden Whisper (Jazz)',
    src: 'https://res.cloudinary.com/dj92eb97f/video/upload/v1767038691/background-jazz-golden-whisper-358520_wmtbyx.mp3',
    artist: 'Royalty-Free',
  },
  {
    name: 'High Novelty Tech',
    src: 'https://res.cloudinary.com/dj92eb97f/video/upload/v1767038693/high-novelty-tech-solution-191634_he6uhx.mp3',
    artist: 'Royalty-Free',
  },
  {
    name: 'Lift Me Up (Abstract Tech)',
    src: 'https://res.cloudinary.com/dj92eb97f/video/upload/v1767038692/digital-abstract-technology-lift-me-up-131534_tktfna.mp3',
    artist: 'Royalty-Free',
  },
  {
    name: 'I Got Your Mind',
    src: 'https://res.cloudinary.com/dj92eb97f/video/upload/v1767038693/i-got-your-mind-342855_iq27b2.mp3',
    artist: 'Royalty-Free',
  },
  {
    name: 'Lounge House',
    src: 'https://res.cloudinary.com/dj92eb97f/video/upload/v1767038694/lounge-house-music-348882_fbmwtq.mp3',
    artist: 'Royalty-Free',
  },
  {
    name: 'Electricity',
    src: 'https://res.cloudinary.com/dj92eb97f/video/upload/v1767038696/electricity-315581_ngtb0j.mp3',
    artist: 'Royalty-Free',
  },
];

export default function BackgroundMusic() {
  // Autoplay muted per browser policies
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(0.3);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(() =>
    Math.floor(Math.random() * DEFAULT_TRACKS.length)
  );
  const [showControls, setShowControls] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = DEFAULT_TRACKS[currentTrackIndex];

  const handleNextTrack = useCallback(() => {
    setCurrentTrackIndex((idx) => (idx + 1) % DEFAULT_TRACKS.length);
  }, []);

  // Initialize or swap tracks
  useEffect(() => {
    const audio = new Audio(currentTrack.src);
    audio.loop = false;
    audio.volume = volume;
    audio.muted = isMuted;
    audio.addEventListener('ended', handleNextTrack);
    audioRef.current = audio;

    if (isPlaying) {
      audio.play().catch((err) => console.error('Play error:', err));
    }

    return () => {
      audio.pause();
      audio.removeEventListener('ended', handleNextTrack);
    };
  }, [currentTrack, handleNextTrack, isMuted, isPlaying, volume]);

  // Sync volume/mute on existing audio instance
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
    }
  }, [isMuted, volume]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.error('Play error:', err));
    }
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const skipTrack = () => {
    handleNextTrack();
  };

  return (
    <div className="fixed bottom-4 left-4 z-30">
      <button
        className="rounded-full bg-black/60 p-3 text-white shadow-lg shadow-black/40 backdrop-blur hover:bg-black/80 transition"
        onClick={() => setShowControls((prev) => !prev)}
        aria-label="Toggle music controls"
      >
        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
      </button>

      {showControls && (
        <div className="mt-3 w-64 rounded-xl border border-gray-800 bg-black/80 p-4 text-white shadow-lg shadow-black/40 backdrop-blur">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Now Playing</p>
              <p className="text-lg font-semibold">{currentTrack.name}</p>
              <p className="text-xs text-gray-500">{currentTrack.artist}</p>
            </div>
            <button
              onClick={toggleMute}
              className="rounded-full bg-gray-900 p-2 text-white hover:bg-gray-800 transition"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={togglePlay}
              className="flex flex-1 items-center justify-center rounded-lg bg-gold px-4 py-2 font-semibold text-black hover:bg-amber-400 transition"
            >
              {isPlaying ? 'Pause' : 'Play'}
            </button>
            <button
              onClick={skipTrack}
              className="rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-white hover:border-gold transition"
              aria-label="Next track"
            >
              <SkipForward size={20} />
            </button>
          </div>

          <div className="mt-3 space-y-1">
            <label className="text-xs text-gray-400">Volume</label>
            <input
              type="range"
              min="0"
              max="100"
              value={volume * 100}
              onChange={(e) => setVolume(Number(e.target.value) / 100)}
              className="w-full accent-gold"
            />
          </div>

          <div className="mt-3 flex gap-1">
            {DEFAULT_TRACKS.map((_, index) => (
              <div
                key={index}
                className={`h-1 flex-1 rounded-full transition-all ${
                  index === currentTrackIndex ? 'bg-gold' : 'bg-gray-700'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
