'use client';

import Link from 'next/link';
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

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/studio', label: 'Studio' },
    { href: '/experience', label: 'Experience' },
    { href: '/projects', label: 'Projects' },
    { href: '/blog', label: 'Blog' },
    { href: '/store', label: 'Store' },
    { href: '/live', label: 'Live' },
    { href: '/contact', label: 'Contact' },
  ];

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
          style={{ opacity: 0.4 }}
        >
          <source
            src="https://res.cloudinary.com/dj92eb97f/video/upload/v1766972500/3000_studios_back_dop_nldai9.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-md"></div>
      </div>

      {/* Navigation Content */}
      <div className="relative px-6 py-4 glossy-border">
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
            <span className="text-2xl font-bold text-3d hidden lg:block">3000 Studios</span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-2 lg:gap-4">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="nav-link hover-pop"
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
          <div className="md:hidden absolute top-full left-0 right-0 glass-panel mt-2 mx-4 p-6 space-y-4">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="block nav-link text-center"
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
