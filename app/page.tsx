'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function LandingPage() {
  const router = useRouter();
  const [showTransition, setShowTransition] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleClickMe = () => {
    setShowTransition(true);
  };

  useEffect(() => {
    if (showTransition && videoRef.current) {
      videoRef.current.play().catch(() => {});

      const handleVideoEnd = () => {
        router.push('/home');
      };

      videoRef.current.addEventListener('ended', handleVideoEnd);
      return () => {
        videoRef.current?.removeEventListener('ended', handleVideoEnd);
      };
    }
  }, [showTransition, router]);

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      {/* Main Landing Video Background */}
      {!showTransition && (
        <div className="absolute inset-0">
          <video autoPlay muted loop playsInline className="w-full h-full object-cover">
            <source
              src="https://res.cloudinary.com/dj92eb97f/video/upload/v1766986144/3D_tunnel_to_purple_d7cofd.mp4"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
      )}

      {/* CLICK ME Button - Only visible when not in transition */}
      {!showTransition && (
        <div className="absolute inset-0 flex items-center justify-center z-50">
          <button
            onClick={handleClickMe}
            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-2xl font-bold rounded-lg
              hover:from-purple-600 hover:to-pink-600 transition-all duration-300
              shadow-lg hover:shadow-2xl transform hover:scale-105"
          >
            CLICK ME
          </button>
        </div>
      )}

      {/* Transition Video - Full screen, plays on click */}
      {showTransition && (
        <div className="absolute inset-0 z-50">
          <video ref={videoRef} playsInline className="w-full h-full object-cover">
            <source
              src="https://res.cloudinary.com/dj92eb97f/video/upload/v1766986144/3D_tunnel_to_purple_d7cofd.mp4"
              type="video/mp4"
            />
          </video>
        </div>
      )}
    </div>
  );
}
