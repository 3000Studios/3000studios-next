'use client';

import { playSound } from '@/lib/sound/sfx';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const PUBLIC_NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Blog', href: '/blog' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Projects', href: '/projects' },
  { label: 'Live', href: '/live' },
  { label: 'Store', href: '/store' },
  { label: 'Apps', href: '/apps' },
  { label: 'Info', href: '/info' },
  { label: 'Admin', href: '/admin' },
];

export default function Nav() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-20 overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      >
        <source
          src="https://res.cloudinary.com/dj92eb97f/video/upload/v1766986138/3000_studios_back_dop_z4amap.mp4"
          type="video/mp4"
        />
      </video>

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Border */}
      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-linear-to-r from-transparent via-[#D4AF37] to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo Video */}
          <Link href="/" className="flex items-center">
            <video autoPlay loop muted playsInline className="h-16 w-auto rounded-lg">
              <source
                src="https://res.cloudinary.com/dj92eb97f/video/upload/v1767266852/marblenoback-ezgif.com-resize-video_kn63v8.mp4"
                type="video/mp4"
              />
            </video>
          </Link>

          {/* Desktop Navigation - 3D Marquee Style */}
          <div className="hidden lg:flex items-center space-x-2">
            {PUBLIC_NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onMouseEnter={() => playSound('hover')}
                  onClick={() => playSound('nav')}
                  className="nav-3d-link group"
                >
                  <div className="nav-3d-box">
                    <div className={`nav-3d-inner nav-3d-left ${isActive ? 'active' : ''}`}>
                      <span>{item.label}</span>
                    </div>
                    <div className={`nav-3d-inner nav-3d-right ${isActive ? 'active' : ''}`}>
                      <span>{item.label}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#D4AF37] hover:text-white hover:bg-white/10"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden absolute top-20 left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-[#D4AF37]/30"
          >
            <div className="px-4 py-4 space-y-2">
              {PUBLIC_NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-lg text-sm font-medium font-playfair transition-all ${
                      isActive
                        ? 'bg-[#D4AF37] text-black'
                        : 'text-[#D4AF37] hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
