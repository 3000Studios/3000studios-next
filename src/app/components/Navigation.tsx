"use client";

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useShadowOS } from '@/lib/shadow/os/state';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home', hoverColor: 'hover:text-gold' },
    { href: '/store', label: 'Store', hoverColor: 'hover:text-gold' },
    { href: '/projects', label: 'Projects', hoverColor: 'hover:text-teal' },
    { href: '/portfolio', label: 'Portfolio', hoverColor: 'hover:text-platinum' },
    { href: '/live', label: 'Live', hoverColor: 'hover:text-sapphire' },
    { href: '/blog', label: 'Blog', hoverColor: 'hover:text-purple-400' },
    { href: '/contact', label: 'Contact', hoverColor: 'hover:text-gold' },
    { href: '/matrix', label: 'Matrix', hoverColor: 'hover:text-cyan-400' },
    { href: '/login', label: 'Login', hoverColor: 'hover:text-gold' },
  ];
  
  // Mood-reactive shadow colors based on ShadowOS state
  const moodColors = {
    neutral: 'shadow-gray-800',
    gold: 'shadow-yellow-500',
    blue: 'shadow-blue-500',
    'purple-alert': 'shadow-purple-500',
    teal: 'shadow-teal-400',
    'cyber-cyan': 'shadow-cyan-400',
  };

  const isActiveLink = (href: string) => pathname === href;

  return (
    <motion.nav 
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'glass-premium border-b border-gold/30 shadow-2xl' 
          : 'glass border-b border-gray-800/50'
      } ${moodColors[uiMood]}`}
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(0,243,255,0.12),_transparent_45%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo with Image */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-10 h-10 transition-transform group-hover:scale-110 duration-300">
              <Image 
                src="/logo.svg" 
                alt="3000 Studios Logo" 
                width={40} 
                height={40}
                className="drop-shadow-lg"
              />
            </div>
            <div className="text-xl md:text-2xl font-bold gradient-text tracking-tight">
              3000 STUDIOS
            </div>
          </Link>

          <div className="hidden md:flex items-center justify-center flex-1 ml-10">
            <div className="flex items-center gap-10">
              {navLinks.map((link) => (
                <ElectricLink
                  key={link.href}
                  href={link.href}
                  className={`relative text-sm lg:text-base font-medium transition-all duration-200 ${
                    isActiveLink(link.href)
                      ? 'text-gold'
                      : `text-gray-300 ${link.hoverColor}`
                  }`}
                >
                  {link.label}
                  {isActiveLink(link.href) && (
                    <motion.span 
                      layoutId="activeLink"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold rounded-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden relative p-2 text-gray-300 hover:text-gold transition-colors"
            aria-label="Toggle menu"
          >
            <div className="relative">
              {isMenuOpen ? (
                <X size={28} className="transition-transform rotate-90" />
              ) : (
                <Menu size={28} className="transition-transform" />
              )}
            </div>
          </button>
        </div>
      </div>

      {/* Enhanced Mobile Menu */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden glass-premium border-t border-gold/20 backdrop-blur-xl"
        >
          <div className="px-4 pt-3 pb-4 space-y-2 max-h-[80vh] overflow-y-auto">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActiveLink(link.href)
                    ? 'bg-gold/20 text-gold border-l-4 border-gold font-semibold'
                    : 'text-gray-300 hover:text-gold hover:bg-gray-800/50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center justify-between">
                  <span>{link.label}</span>
                  {isActiveLink(link.href) && (
                    <ChevronDown size={18} className="text-gold" />
                  )}
                </div>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
