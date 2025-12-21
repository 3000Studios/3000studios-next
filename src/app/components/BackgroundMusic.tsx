/**
 * Background Music Engine
 * Rotates through background music tracks as specified in the blueprint
 * Features: Auto-play, track rotation, volume control, and user controls
 */

'use client';

import { Pause, Play, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

interface MusicTrack {
  name: string;
  src: string;
  artist?: string;
}

// Default music tracks
// TODO: Add actual music files to /public/music/ directory
// Or configure these paths via environment variables
const DEFAULT_TRACKS: MusicTrack[] = [
  { name: 'Ambient Waves', src: '/music/ambient-1.mp3', artist: '3000 Studios' },
  { name: 'Jazz Corporate', src: '/music/jazz-1.mp3', artist: '3000 Studios' },
  { name: 'Electronic Flow', src: '/music/electronic-1.mp3', artist: '3000 Studios' },
  { name: 'Chill Vibes', src: '/music/chill-1.mp3', artist: '3000 Studios' },
];

export default function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = DEFAULT_TRACKS[currentTrackIndex];

  const handleNextTrack = useCallback(() => {
    setCurrentTrackIndex((idx) => {
      const nextIndex = (idx + 1) % DEFAULT_TRACKS.length;

      if (audioRef.current && isPlaying) {
        audioRef.current.src = DEFAULT_TRACKS[nextIndex].src;
        audioRef.current.play().catch(err => console.log('Play error:', err));
      }

      return nextIndex;
    });
  }, [isPlaying]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const audio = new Audio();
    audio.volume = volume;
    audio.loop = false;
    audio.addEventListener('ended', handleNextTrack);
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.removeEventListener('ended', handleNextTrack);
    };
  }, [handleNextTrack, volume]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const handlePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      // Load track if not already loaded
      if (audioRef.current.src !== currentTrack.src) {
        audioRef.current.src = currentTrack.src;
      }
      audioRef.current.play().catch(err => {
        console.log('Music playback error (audio files may not exist):', err);
        setIsPlaying(false);
      });
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div
      className="fixed bottom-4 right-4 z-50"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Main Control Button */}
      <div className="glass rounded-full p-3 border border-gold/20 hover:border-gold/50 transition-all cursor-pointer hover:scale-110">
        <button
          onClick={handlePlayPause}
          className="text-gold hover:text-platinum transition-colors"
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>
      </div>

      {/* Expanded Controls */}
      <div
        className={`absolute bottom-16 right-0 glass rounded-lg p-4 border border-gold/20 transition-all duration-300 ${
          showControls ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        style={{ minWidth: '250px' }}
      >
        {/* Track Info */}
        <div className="mb-4">
          <p className="text-white font-semibold text-sm">{currentTrack.name}</p>
          {currentTrack.artist && (
            <p className="text-gray-400 text-xs">{currentTrack.artist}</p>
          )}
        </div>

        {/* Control Buttons */}
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={toggleMute}
            className="text-gold hover:text-platinum transition-colors"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>

          <button
            onClick={handlePlayPause}
            className="text-gold hover:text-platinum transition-colors"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>

          <button
            onClick={handleNextTrack}
            className="text-gold hover:text-platinum transition-colors"
            aria-label="Next track"
          >
            <SkipForward size={20} />
          </button>
        </div>

        {/* Volume Slider */}
        <div className="space-y-1">
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

        {/* Track Progress Indicator */}
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
    </div>
  );
}
