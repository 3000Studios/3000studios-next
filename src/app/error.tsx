<<<<<<< HEAD
"use client";
=======
'use client';
>>>>>>> origin/copilot/update-main-with-all-branches

/**
 * Global Error Boundary
 * Catches and handles runtime errors in the application
 */

<<<<<<< HEAD
import { useEffect } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";
=======
import { useEffect } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';
>>>>>>> origin/copilot/update-main-with-all-branches

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to monitoring service in production
<<<<<<< HEAD
    console.error("Application error:", error);
=======
    console.error('Application error:', error);
>>>>>>> origin/copilot/update-main-with-all-branches
  }, [error]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        {/* Error Icon */}
        <div className="mb-6 flex justify-center">
          <div className="p-4 bg-red-500/10 rounded-full">
            <AlertTriangle className="w-16 h-16 text-red-500" />
          </div>
        </div>
<<<<<<< HEAD

=======
        
>>>>>>> origin/copilot/update-main-with-all-branches
        {/* Error Message */}
        <h1 className="text-4xl font-bold text-white mb-4">
          Something went wrong!
        </h1>
        <p className="text-gray-400 mb-8">
<<<<<<< HEAD
          We encountered an unexpected error. Don't worry, our team has been
          notified.
        </p>

        {/* Error Details (Development only) */}
        {process.env.NODE_ENV === "development" && (
=======
          We encountered an unexpected error. Don't worry, our team has been notified.
        </p>
        
        {/* Error Details (Development only) */}
        {process.env.NODE_ENV === 'development' && (
>>>>>>> origin/copilot/update-main-with-all-branches
          <div className="mb-8 p-4 bg-white/5 rounded-lg text-left">
            <p className="text-sm font-mono text-red-400 break-all">
              {error.message}
            </p>
            {error.digest && (
              <p className="text-xs text-gray-500 mt-2">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        )}
<<<<<<< HEAD

=======
        
>>>>>>> origin/copilot/update-main-with-all-branches
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#FFD700] to-[#0F52BA] text-black font-semibold rounded-lg hover:scale-105 transition-transform"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </button>
<<<<<<< HEAD

=======
          
>>>>>>> origin/copilot/update-main-with-all-branches
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors backdrop-blur-sm"
          >
            <Home className="w-5 h-5" />
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
