/**
 * Navigation Component
 * Main site navigation bar with responsive design
 * Includes links to all public pages and admin login
 * Features: Mobile menu, active link highlighting, smooth transitions, premium marble background
 */

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { usePathname } from 'next/navigation';

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
    { href: '/', label: 'Home' },
    { href: '/store', label: 'Store' },
    { href: '/projects', label: 'Projects' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/live', label: 'Live' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ];

  const isActiveLink = (href: string) => pathname === href;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'glass-premium border-b border-gold/30 shadow-2xl' 
        : 'glass border-b border-gray-800/50'
    }`}>
      {/* Premium Marble Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 opacity-90 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent"></div>
      </div>

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

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm lg:text-base font-medium transition-all duration-200 ${
                  isActiveLink(link.href)
                    ? 'text-gold'
                    : 'text-gray-300 hover:text-gold'
                }`}
              >
                {link.label}
                {isActiveLink(link.href) && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold rounded-full"></span>
                )}
              </Link>
            ))}
            <Link
              href="/login"
              className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-gold to-yellow-500 text-black font-semibold hover:from-platinum hover:to-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,215,0,0.5)] hover:-translate-y-0.5"
            >
              Login
            </Link>
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
        <div className="md:hidden glass-premium border-t border-gold/20 backdrop-blur-xl animate-slide-down">
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
            ))}
            <Link
              href="/login"
              className="block px-4 py-3 mt-3 text-center bg-gradient-to-r from-gold to-yellow-500 text-black font-bold rounded-lg hover:from-platinum hover:to-white transition-all duration-300 shadow-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
