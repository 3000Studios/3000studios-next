'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface ModernHeroProps {
  title?: string;
  subtitle?: string;
  cta?: string;
  backgroundImage?: string;
  backgroundVideo?: string;
}

export function ModernHero({
  title = '3000 Studios',
  subtitle = 'Experience Excellence',
  cta = 'Enter',
  backgroundImage = 'sample/luxury-hotel',
  backgroundVideo,
}: ModernHeroProps) {
  const hoverSoundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create hover sound effect
    hoverSoundRef.current = new Audio(
      'data:audio/wav;base64,UklGRhIAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0Ya4AAAA='
    );
  }, []);

  const playHoverSound = () => {
    if (hoverSoundRef.current) {
      hoverSoundRef.current.currentTime = 0;
      hoverSoundRef.current.play().catch(() => {});
    }
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-black pt-20">
      {/* Background Video */}
      {backgroundVideo ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="absolute inset-0"
        >
          <video autoPlay muted loop playsInline className="w-full h-full object-cover">
            <source src={backgroundVideo} type="video/mp4" />
          </video>

          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/40 to-black/70" />
        </motion.div>
      ) : (
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('${backgroundImage}')`,
            }}
          >
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/50 to-black/70" />
          </div>
        </motion.div>
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mb-16"
        >
          <h1 className="text-7xl md:text-9xl font-bold text-3d mb-8 animate-glow">{title}</h1>
          <p className="text-2xl md:text-3xl text-gold-gradient font-light tracking-wide">
            {subtitle}
          </p>
        </motion.div>

        {/* Single CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-20"
        >
          <button
            className="btn-gold hover-pop text-xl md:text-2xl px-12 py-6 animate-float"
            onMouseEnter={playHoverSound}
          >
            {cta}
          </button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="text-gold-primary opacity-80 animate-glow" size={40} />
        </motion.div>
      </div>
    </div>
  );
}
