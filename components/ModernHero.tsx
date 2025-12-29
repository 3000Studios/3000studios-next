'use client';

import { motion } from 'framer-motion';
import { ChevronDown, BookOpen } from 'lucide-react';
import { cloudinaryImage } from '@/lib/cloudinary';

interface ModernHeroProps {
  title?: string;
  subtitle?: string;
  cta?: string;
  backgroundImage?: string;
}

export function ModernHero({
  title = '3000 Studios',
  subtitle = 'Experience Excellence',
  cta = 'Explore Now',
  backgroundImage = 'sample/luxury-hotel',
}: ModernHeroProps) {
  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-black">
      {/* Background Image with overlay */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="absolute inset-0"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${cloudinaryImage(backgroundImage, {
              width: 1920,
              height: 1080,
              crop: 'fill',
              quality: 'auto',
              format: 'auto',
            })}')`,
          }}
        >
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70" />
        </div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center"
        >
          <h1 className="font-display text-7xl md:text-8xl font-bold text-white mb-6 drop-shadow-lg">
            {title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 font-light tracking-wide mb-12">
            {subtitle}
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex gap-6 mb-20"
        >
          <button className="px-8 py-4 bg-white text-black font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl">
            {cta}
          </button>
          <button className="px-8 py-4 border-2 border-white text-white font-semibold text-lg hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-2">
            <BookOpen size={20} />
            Learn More
          </button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="text-white opacity-70" size={32} />
        </motion.div>
      </div>
    </div>
  );
}
