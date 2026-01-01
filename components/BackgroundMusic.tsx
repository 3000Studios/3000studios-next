'use client';

import { useEffect, useRef, useState } from 'react';

const MUSIC_TRACKS = [
  'https://res.cloudinary.com/dj92eb97f/video/upload/v1767038696/electricity-315581_ngtb0j.mp3',
  'https://res.cloudinary.com/dj92eb97f/video/upload/v1767038695/mrketid-127881_vz7wop.mp3',
  'https://res.cloudinary.com/dj92eb97f/video/upload/v1767038695/upbeat-future-bass-138706_nrfkt5.mp3',
  'https://res.cloudinary.com/dj92eb97f/video/upload/v1767038695/house-114914_mie0io.mp3',
  'https://res.cloudinary.com/dj92eb97f/video/upload/v1767038694/lounge-house-music-348882_fbmwtq.mp3',
  'https://res.cloudinary.com/dj92eb97f/video/upload/v1767038694/sweet-life-luxury-chill-438146_jclnty.mp3',
  'https://res.cloudinary.com/dj92eb97f/video/upload/v1767038693/i-got-your-mind-342855_iq27b2.mp3',
  'https://res.cloudinary.com/dj92eb97f/video/upload/v1767038693/funky-house-221081_rxgd2b.mp3',
  'https://res.cloudinary.com/dj92eb97f/video/upload/v1767038693/high-novelty-tech-solution-191634_he6uhx.mp3',
  'https://res.cloudinary.com/dj92eb97f/video/upload/v1767038692/digital-abstract-technology-lift-me-up-131534_tktfna.mp3',
  'https://res.cloudinary.com/dj92eb97f/video/upload/v1767038692/black-box-mana-of-artificial-intelligence-130408_mapnzt.mp3',
  'https://res.cloudinary.com/dj92eb97f/video/upload/v1766973391/sweet-life-luxury-chill-438146_mwxuot.mp3',
];

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    // Select random track
    const randomTrack = MUSIC_TRACKS[Math.floor(Math.random() * MUSIC_TRACKS.length)];

    if (audioRef.current) {
      audioRef.current.src = randomTrack;
    }

    // Handle user interaction to enable audio (browser policy)
    const handleInteraction = () => {
      if (!hasInteracted && audioRef.current) {
        audioRef.current.play().catch(() => {
          // Autoplay blocked - will retry on next interaction
        });
        setHasInteracted(true);
      }
    };

    // Listen for any user interaction
    document.addEventListener('click', handleInteraction);
    document.addEventListener('keydown', handleInteraction);
    document.addEventListener('touchstart', handleInteraction);

    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };
  }, [hasInteracted]);

  return <audio ref={audioRef} loop className="hidden" preload="auto" />;
}
