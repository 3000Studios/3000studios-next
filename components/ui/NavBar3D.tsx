'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

// --- 1. CONFIGURATION & DATA ---

const DEFAULT_VIDEO_URL =
  'https://res.cloudinary.com/dj92eb97f/video/upload/v1767037191/blue_block_text_mm1www.mp4';
const LOGO_URL =
  'https://res.cloudinary.com/dj92eb97f/image/upload/v1767046287/new_logo-min_zd44u2.png';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  {
    label: 'Store',
    href: 'https://3000-studios.myshopify.com/',
    isExternal: true,
    subRoutes: [
      { label: '3000 Store', href: 'https://3000-studios.myshopify.com/', isExternal: true },
    ],
  },
  {
    label: 'Projects',
    href: '/projects',
    subRoutes: [
      { label: 'Ready Apps', href: '/projects/ready-apps' },
      { label: 'In Progress', href: '/projects/in-progress' },
    ],
  },
  {
    label: 'Live',
    href: '/live',
    subRoutes: [
      { label: 'Live Stream', href: '/live' },
      { label: 'Past Live Streams', href: '/live/past-streams' },
    ],
  },
  {
    label: 'Posts',
    href: '/posts',
    subRoutes: [
      { label: "Today's Posts", href: '/posts/todays-posts' },
      { label: 'Past Posts', href: '/posts/past-posts' },
    ],
  },
  { label: 'Admin', href: '/admin' },
];

// --- 2. STYLES (Injected automatically) ---
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Gugi&display=swap');
  .font-gugi { font-family: 'Gugi', cursive; }

  /* Animations */
  @keyframes shimmer { 0% { background-position: 200% center; } 100% { background-position: -200% center; } }
  .animate-shimmer { animation: shimmer 3s linear infinite; }

  @keyframes spin3d-y { 0% { transform: rotateY(0deg); } 100% { transform: rotateY(360deg); } }
  .animate-spin-3d { animation: spin3d-y 6s linear infinite; }

  @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
  .animate-float { animation: float 3s ease-in-out infinite; }

  /* Runner Skeleton Animations */
  @keyframes run-thigh { 0% { transform: rotateX(-40deg); } 50% { transform: rotateX(20deg); } 100% { transform: rotateX(-40deg); } }
  @keyframes run-thigh-opp { 0% { transform: rotateX(20deg); } 50% { transform: rotateX(-40deg); } 100% { transform: rotateX(20deg); } }

  @keyframes run-shin { 0% { transform: rotateX(10deg); } 25% { transform: rotateX(80deg); } 50% { transform: rotateX(10deg); } 75% { transform: rotateX(10deg); } 100% { transform: rotateX(10deg); } }
  @keyframes run-shin-opp { 0% { transform: rotateX(10deg); } 25% { transform: rotateX(10deg); } 50% { transform: rotateX(10deg); } 75% { transform: rotateX(80deg); } 100% { transform: rotateX(10deg); } }

  @keyframes run-arm { 0% { transform: rotateX(45deg); } 50% { transform: rotateX(-45deg); } 100% { transform: rotateX(45deg); } }
  @keyframes run-arm-opp { 0% { transform: rotateX(-45deg); } 50% { transform: rotateX(45deg); } 100% { transform: rotateX(-45deg); } }

  @keyframes run-forearm { 0% { transform: rotateX(-60deg); } 50% { transform: rotateX(-30deg); } 100% { transform: rotateX(-60deg); } }

  .anim-thigh-L { animation: run-thigh 0.6s linear infinite; }
  .anim-thigh-R { animation: run-thigh-opp 0.6s linear infinite; }
  .anim-shin-L { animation: run-shin 0.6s linear infinite; }
  .anim-shin-R { animation: run-shin-opp 0.6s linear infinite; }
  .anim-arm-L { animation: run-arm 0.6s linear infinite; }
  .anim-arm-R { animation: run-arm-opp 0.6s linear infinite; }
  .anim-forearm { animation: run-forearm 0.6s linear infinite; }
`;

// --- 3. COMPONENT LOGIC ---

// Physics Constants
const TILE_COUNT = 10;
const INITIAL_SPEED = 0.3;
const RUNNER_COUNT = 4;
const GRAVITY = 0.6;
const INITIAL_FALL_VY = 4;
const BOUNCE_DAMPING = 0.8;
const FLOOR_FRICTION = 0.99;

interface RunnerState {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  facingRight: boolean;
  status: 'running-top' | 'falling' | 'running-bottom' | 'resetting';
  variant: 'gold' | 'silver' | 'bronze';
  scale: number;
}

const NavBar = ({
  backgroundVideoUrl = DEFAULT_VIDEO_URL,
  className = '',
}: {
  backgroundVideoUrl?: string;
  className?: string;
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Game State
  const [runners, setRunners] = useState<RunnerState[]>([]);
  const requestRef = useRef<number>(0);
  const tiltRef = useRef<number>(0);
  const navHeight = 96;
  const windowHeightRef = useRef(1000);

  // Init
  useEffect(() => {
    if (typeof window === 'undefined') return;
    windowHeightRef.current = window.innerHeight;

    const initialRunners: RunnerState[] = Array.from({ length: RUNNER_COUNT }).map((_, i) => ({
      id: i,
      x: -10 - i * 30,
      y: 0,
      vx: INITIAL_SPEED,
      vy: 0,
      facingRight: true,
      status: 'running-top',
      variant: i % 2 === 0 ? 'gold' : 'silver',
      scale: 0.8 + Math.random() * 0.4,
    }));
    setRunners(initialRunners);

    const handleResize = () => {
      windowHeightRef.current = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const handleMotion = (event: DeviceMotionEvent) => {
      if (event.accelerationIncludingGravity) {
        const ax = event.accelerationIncludingGravity.x || 0;
        tiltRef.current = ax * 0.1;
      }
    };
    if (window.DeviceMotionEvent) window.addEventListener('devicemotion', handleMotion);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (window.DeviceMotionEvent) window.removeEventListener('devicemotion', handleMotion);
    };
  }, []);

  // Loop
  const animate = useCallback(() => {
    setRunners((prevRunners) => {
      return prevRunners.map((runner) => {
        let { x, y, vx, vy, status, facingRight } = runner;

        if (status === 'running-top') {
          x += INITIAL_SPEED;
          facingRight = true;
          if (x > 110) x = -10;
        } else if (status === 'falling') {
          vy += GRAVITY;
          y += vy;
          x += vx;
          const floorY = windowHeightRef.current - navHeight - 20;
          if (y >= floorY) {
            y = floorY;
            vy = 0;
            vx = (Math.random() > 0.5 ? 1 : -1) * (0.5 + Math.random());
            status = 'running-bottom';
          }
        } else if (status === 'running-bottom') {
          vx -= tiltRef.current;
          vx *= FLOOR_FRICTION;
          const MAX_SPEED = 2.0;
          if (vx > MAX_SPEED) vx = MAX_SPEED;
          if (vx < -MAX_SPEED) vx = -MAX_SPEED;
          x += vx;
          if (Math.abs(vx) > 0.1) facingRight = vx > 0;
          if (x <= 0) {
            x = 0;
            vx = Math.abs(vx) * BOUNCE_DAMPING + 0.2;
            facingRight = true;
          } else if (x >= 95) {
            x = 95;
            vx = -Math.abs(vx) * BOUNCE_DAMPING - 0.2;
            facingRight = false;
          }
        }
        return { ...runner, x, y, vx, vy, status, facingRight };
      });
    });
    requestRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [animate]);

  const handleTileClick = (index: number) => {
    playTickSound();
    const tileWidth = 100 / TILE_COUNT;
    const startX = index * tileWidth;
    const endX = startX + tileWidth;
    setRunners((prev) =>
      prev.map((runner) => {
        if (runner.status === 'running-top' && runner.x + 2 > startX && runner.x < endX) {
          return { ...runner, status: 'falling', vy: INITIAL_FALL_VY, vx: 0 };
        }
        return runner;
      })
    );
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (videoRef.current) videoRef.current.play().catch((e) => console.warn('Autoplay blocked', e));
  }, []);

  const playTickSound = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } catch (e) {
      console.warn('Sound failed', e);
    }
  };

  return (
    <nav
      className={`relative w-full z-50 transition-all duration-300 ${className} ${isScrolled ? 'shadow-lg' : ''}`}
    >
      <style>{STYLES}</style>

      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 bg-black">
        <video
          ref={videoRef}
          className="w-full h-full object-cover opacity-80"
          src={backgroundVideoUrl}
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40" />
      </div>

      {/* Runners */}
      <div className="absolute inset-0 z-20 overflow-visible pointer-events-none h-24">
        {runners.map((runner) => (
          <div
            key={runner.id}
            className="absolute top-0 will-change-transform"
            style={{
              left: `${runner.x}%`,
              transform: `translateY(${runner.y}px) scale(${runner.scale})`,
              transition: runner.status === 'falling' ? 'none' : 'transform 0.1s linear',
            }}
          >
            <div className="relative">
              <Runner3D
                variant={runner.variant}
                status={runner.status}
                facingRight={runner.facingRight}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Traps */}
      <div className="absolute bottom-0 left-0 w-full h-6 z-40 flex pointer-events-auto">
        {Array.from({ length: TILE_COUNT }).map((_, i) => (
          <button
            key={i}
            onClick={() => handleTileClick(i)}
            className="flex-1 border-r border-white/10 hover:bg-yellow-500/30 active:bg-red-500/50 transition-colors group relative"
          >
            <div className="absolute inset-x-1 bottom-0 h-1 bg-white/20 group-hover:bg-yellow-400/50 shadow-[0_0_10px_rgba(0,0,0,0.5)]"></div>
          </button>
        ))}
      </div>

      {/* Nav Content */}
      <div className="relative z-30 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pointer-events-none">
        <div className="flex items-center justify-between h-24 pointer-events-auto">
          {/* LOGO */}
          <div className="flex-shrink-0 flex items-center perspective-1000">
            <a
              href="/"
              onClick={playTickSound}
              className="block relative group flex items-center justify-center animate-float"
              style={{ perspective: '1000px' }}
            >
              <div className="relative animate-spin-3d" style={{ transformStyle: 'preserve-3d' }}>
                <img
                  src={LOGO_URL}
                  alt="3000 Studios"
                  className="h-20 w-auto object-contain drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]"
                />
              </div>
            </a>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-10 items-center">
            {NAV_LINKS.map((link) => (
              <DesktopNavItem key={link.label} route={link} playSound={playTickSound} />
            ))}
          </div>

          {/* Mobile Button */}
          <div className="md:hidden pointer-events-auto">
            <button
              onClick={() => {
                setIsMobileMenuOpen(!isMobileMenuOpen);
                setActiveMobileDropdown(null);
                playTickSound();
              }}
              className="text-gray-200 hover:text-white p-2"
            >
              <span className="sr-only">Menu</span>
              <svg
                className="h-8 w-8"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden relative z-50 bg-black/95 backdrop-blur-md overflow-hidden transition-[max-height,opacity] duration-300 ${isMobileMenuOpen ? 'max-h-screen opacity-100 border-t border-gray-800' : 'max-h-0 opacity-0'}`}
      >
        <div className="px-2 pt-2 pb-6 space-y-1">
          {NAV_LINKS.map((link) => (
            <MobileNavItem
              key={link.label}
              route={link}
              isOpen={activeMobileDropdown === link.label}
              onToggle={() => {
                setActiveMobileDropdown(activeMobileDropdown === link.label ? null : link.label);
                playTickSound();
              }}
              closeMenu={() => setIsMobileMenuOpen(false)}
              playSound={playTickSound}
            />
          ))}
        </div>
      </div>
    </nav>
  );
};

// --- SUB-COMPONENTS ---

const Runner3D = ({
  variant,
  status,
  facingRight,
}: {
  variant: string;
  status: string;
  facingRight: boolean;
}) => {
  const headColor = variant === 'gold' ? 'bg-yellow-300' : 'bg-gray-300';
  const bodyColor = variant === 'gold' ? 'bg-yellow-600' : 'bg-gray-500';
  const limbColor = variant === 'gold' ? 'bg-yellow-500' : 'bg-gray-400';
  const isFalling = status === 'falling';
  const containerTransform = facingRight ? 'rotateY(0deg)' : 'rotateY(180deg)';

  const leftThighAnim = isFalling ? 'transition-transform -rotate-[120deg]' : 'anim-thigh-L';
  const leftShinAnim = isFalling ? 'transition-transform rotate-0' : 'anim-shin-L';
  const rightThighAnim = isFalling ? 'transition-transform -rotate-[120deg]' : 'anim-thigh-R';
  const rightShinAnim = isFalling ? 'transition-transform rotate-0' : 'anim-shin-R';
  const leftArmAnim = isFalling ? 'transition-transform -rotate-[160deg]' : 'anim-arm-L';
  const leftForearmAnim = isFalling ? 'transition-transform rotate-0' : 'anim-forearm';
  const rightArmAnim = isFalling ? 'transition-transform -rotate-[160deg]' : 'anim-arm-R';
  const rightForearmAnim = isFalling ? 'transition-transform rotate-0' : 'anim-forearm';

  return (
    <div
      className="relative w-8 h-16 pointer-events-none transition-transform duration-300"
      style={{ transformStyle: 'preserve-3d', transform: containerTransform }}
    >
      <div
        className={`absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full ${headColor} shadow-sm z-20`}
      />
      <div
        className={`absolute top-3 left-1/2 -translate-x-1/2 w-3.5 h-7 ${bodyColor} rounded-sm z-10`}
      />
      <div
        className="absolute top-3 left-1/2 -translate-x-1/2 w-0 h-0"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div
          className={`absolute top-0 left-0 w-1.5 h-3.5 ${limbColor} origin-top rounded-full ${leftArmAnim}`}
        >
          <div
            className={`absolute top-3 left-0 w-1.5 h-3.5 ${limbColor} origin-top rounded-full ${leftForearmAnim}`}
          >
            <div className={`absolute bottom-0 left-0 w-1.5 h-1.5 ${headColor} rounded-full`} />
          </div>
        </div>
      </div>
      <div
        className="absolute top-3 left-1/2 -translate-x-1/2 w-0 h-0"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div
          className={`absolute top-0 left-0 w-1.5 h-3.5 ${limbColor} origin-top rounded-full ${rightArmAnim}`}
        >
          <div
            className={`absolute top-3 left-0 w-1.5 h-3.5 ${limbColor} origin-top rounded-full ${rightForearmAnim}`}
          >
            <div className={`absolute bottom-0 left-0 w-1.5 h-1.5 ${headColor} rounded-full`} />
          </div>
        </div>
      </div>
      <div
        className="absolute top-9 left-1/2 -translate-x-1/2 w-0 h-0"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div
          className={`absolute top-0 left-[-2px] w-2 h-4 ${limbColor} origin-top rounded-full ${leftThighAnim}`}
        >
          <div
            className={`absolute top-3.5 left-0.5 w-1.5 h-4 ${limbColor} origin-top rounded-full ${leftShinAnim}`}
          >
            <div
              className={`absolute bottom-[-2px] left-[-1px] w-3 h-1.5 ${bodyColor} rounded-sm`}
            />
          </div>
        </div>
      </div>
      <div
        className="absolute top-9 left-1/2 -translate-x-1/2 w-0 h-0"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div
          className={`absolute top-0 left-[-2px] w-2 h-4 ${limbColor} origin-top rounded-full ${rightThighAnim}`}
        >
          <div
            className={`absolute top-3.5 left-0.5 w-1.5 h-4 ${limbColor} origin-top rounded-full ${rightShinAnim}`}
          >
            <div
              className={`absolute bottom-[-2px] left-[-1px] w-3 h-1.5 ${bodyColor} rounded-sm`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const DesktopNavItem = ({ route, playSound }: { route: any; playSound: () => void }) => {
  const hasSubRoutes = route.subRoutes && route.subRoutes.length > 0;
  return (
    <div className="relative group pointer-events-auto">
      <a
        href={route.href}
        onClick={playSound}
        className="font-gugi text-lg px-3 py-2 tracking-wider transition-all duration-300 relative flex items-center gap-1 text-gray-100 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[#C5A059] hover:via-[#FFFFFF] hover:to-[#C5A059] hover:bg-[length:200%_auto] hover:animate-shimmer hover:scale-110 drop-shadow-md hover:drop-shadow-[0_0_8px_rgba(255,215,0,0.5)]"
        target={route.isExternal ? '_blank' : undefined}
        rel={route.isExternal ? 'noopener noreferrer' : undefined}
      >
        {route.label}
        {hasSubRoutes && (
          <svg
            className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-transform duration-500 group-hover:rotate-[360deg] text-gray-300 group-hover:text-[#FFD700]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        )}
        <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-transparent via-[#FFD700] to-transparent bg-[length:200%_auto] animate-shimmer transition-all duration-300 ease-out group-hover:w-full box-shadow-[0_0_8px_rgba(255,215,0,0.8)]"></span>
      </a>
      {hasSubRoutes && (
        <div className="absolute left-0 mt-4 w-64 opacity-0 translate-y-2 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible transition-all duration-200 ease-out transform origin-top-left z-50">
          <div className="rounded-md shadow-xl ring-1 ring-black ring-opacity-5 overflow-hidden bg-gray-900/95 backdrop-blur-md border border-gray-700">
            <div className="py-2" role="menu">
              {route.subRoutes?.map((sub: any) => (
                <a
                  key={sub.href}
                  href={sub.href}
                  onClick={playSound}
                  className="block px-6 py-4 text-base font-gugi text-gray-300 hover:bg-white/10 hover:text-[#FFD700] transition-colors border-l-2 border-transparent hover:border-[#FFD700]"
                  target={sub.isExternal ? '_blank' : undefined}
                >
                  {sub.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const MobileNavItem = ({ route, isOpen, onToggle, closeMenu, playSound }: any) => {
  const hasSubRoutes = route.subRoutes && route.subRoutes.length > 0;
  return (
    <div className="border-b border-gray-800 last:border-0 pointer-events-auto">
      <div className="flex items-center justify-between">
        <a
          href={route.href}
          className="flex-grow block px-4 py-5 text-xl font-gugi text-gray-100 hover:text-[#FFD700] hover:bg-white/5 rounded-md transition-colors"
          onClick={(e) => {
            playSound();
            if (hasSubRoutes) {
              e.preventDefault();
              onToggle();
            } else closeMenu();
          }}
          target={route.isExternal && !hasSubRoutes ? '_blank' : undefined}
        >
          {route.label}
        </a>
        {hasSubRoutes && (
          <button
            onClick={() => {
              onToggle();
              playSound();
            }}
            className="p-5 text-gray-400 hover:text-[#FFD700] focus:outline-none"
          >
            <svg
              className={`w-6 h-6 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        )}
      </div>
      {hasSubRoutes && (
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out bg-black/40 ${isOpen ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0'}`}
        >
          {route.subRoutes?.map((sub: any) => (
            <a
              key={sub.href}
              href={sub.href}
              className="block pl-10 pr-4 py-4 text-base font-gugi text-gray-400 hover:text-[#FFD700] hover:bg-white/5 border-l-4 border-transparent hover:border-[#FFD700] transition-colors"
              onClick={() => {
                closeMenu();
                playSound();
              }}
              target={sub.isExternal ? '_blank' : undefined}
            >
              {sub.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default NavBar;
