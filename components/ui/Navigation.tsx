'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
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

  const pathname = usePathname();

  const pathname = usePathname();

  // Restrict to only the requested page(s). Default to Home only per directive.
  const navLinks = [{ href: '/', label: 'Home' }];

  if (pathname === '/home') {
    const forbidden = new Set(['Studio', 'Experience', 'Avatar', 'Dashboard', 'Team', 'Contact']);
    navLinks = navLinks.filter((l) => !forbidden.has(l.label));
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 -z-10">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          style={{ opacity: 0.45 }}
        >
          <source
            src="https://res.cloudinary.com/dj92eb97f/video/upload/v1766972500/3000_studios_back_dop_nldai9.mp4"
            type="video/mp4"
          />
        </video>
        {/* Gold/Silver overlay for premium aesthetic */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-gray-800/60 to-slate-900/70 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-lg"></div>
      </div>

      {/* Navigation Content */}
      <div className="relative px-6 py-4 border border-slate-500/30 rounded-xl bg-gradient-to-r from-gray-900/70 via-slate-800/60 to-gray-900/70 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 hover-pop z-20"
            onMouseEnter={playHoverSound}
          >
            <img
              src="https://res.cloudinary.com/dj92eb97f/image/upload/v1766973137/new_logo_kz6pzz.png"
              alt="3000 Studios Logo"
              className="w-14 h-14 object-contain animate-glow"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-2 lg:gap-4">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="px-3 py-2 text-slate-200 hover:text-yellow-300 border-b-2 border-transparent hover:border-yellow-300 transition-colors duration-200 hover-pop"
                onMouseEnter={playHoverSound}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-3xl text-gold-gradient hover-pop"
            onClick={() => setIsOpen(!isOpen)}
            onMouseEnter={playHoverSound}
          >
            {isOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 mt-2 mx-4 p-6 space-y-4 border border-slate-500/30 rounded-xl bg-gradient-to-b from-gray-900/80 via-slate-800/70 to-gray-900/80 shadow-xl">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="block px-3 py-2 text-center text-slate-200 hover:text-yellow-300 border-b-2 border-transparent hover:border-yellow-300 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
                onMouseEnter={playHoverSound}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};
