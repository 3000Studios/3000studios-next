'use client';

import { useEffect, useRef } from 'react';

const AUDIO_TRACKS = [
  'https://res.cloudinary.com/dj92eb97f/video/upload/v1766986144/ambient_track_1.mp3',
  'https://res.cloudinary.com/dj92eb97f/video/upload/v1766986144/ambient_track_2.mp3',
  'https://res.cloudinary.com/dj92eb97f/video/upload/v1766986144/ambient_track_3.mp3',
];

export const AmbientAudio = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const trackIndexRef = useRef(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set initial random track
    trackIndexRef.current = Math.floor(Math.random() * AUDIO_TRACKS.length);
    audio.src = AUDIO_TRACKS[trackIndexRef.current];
    audio.autoplay = true;
    audio.loop = true;
    audio.volume = 0.3;

    const handleEnded = () => {
      // Switch to random track when current ends
      trackIndexRef.current = Math.floor(Math.random() * AUDIO_TRACKS.length);
      audio.src = AUDIO_TRACKS[trackIndexRef.current];
      audio.play().catch(() => {});
    };

    audio.addEventListener('ended', handleEnded);

    // Attempt autoplay
    audio.play().catch(() => {
      // Autoplay may be blocked; user interaction required
    });

    return () => {
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  return <audio ref={audioRef} preload="auto" style={{ display: 'none' }} />;
};
