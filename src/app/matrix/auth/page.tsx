/**
 * Matrix Auth Page
 * Handles magic link authentication
 */

<<<<<<< HEAD
"use client";

import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
=======
'use client';

import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
>>>>>>> origin/copilot/update-main-with-all-branches

function MatrixAuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
<<<<<<< HEAD
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [message, setMessage] = useState("Verifying your magic link...");

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setStatus("error");
      setMessage("Invalid magic link - no token provided");
=======
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Verifying your magic link...');

  useEffect(() => {
    const token = searchParams.get('token');

    if (!token) {
      setStatus('error');
      setMessage('Invalid magic link - no token provided');
>>>>>>> origin/copilot/update-main-with-all-branches
      return;
    }

    // Verify the token
    const verifyToken = async () => {
      try {
<<<<<<< HEAD
        const response = await fetch("/api/auth/verify-magic", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
=======
        const response = await fetch('/api/auth/verify-magic', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
>>>>>>> origin/copilot/update-main-with-all-branches
          body: JSON.stringify({ token }),
        });

        if (response.ok) {
          await response.json(); // Read response but don't need data
<<<<<<< HEAD
          setStatus("success");
          setMessage("Authentication successful! Redirecting to The Matrix...");

          // Redirect to matrix after 2 seconds
          setTimeout(() => {
            router.push("/matrix");
          }, 2000);
        } else {
          const data = await response.json();
          setStatus("error");
          setMessage(data.error || "Magic link verification failed");
        }
      } catch (error) {
        console.error("Verification error:", error);
        setStatus("error");
        setMessage("An error occurred during verification");
=======
          setStatus('success');
          setMessage('Authentication successful! Redirecting to The Matrix...');

          // Redirect to matrix after 2 seconds
          setTimeout(() => {
            router.push('/matrix');
          }, 2000);
        } else {
          const data = await response.json();
          setStatus('error');
          setMessage(data.error || 'Magic link verification failed');
        }
      } catch (error) {
        console.error('Verification error:', error);
        setStatus('error');
        setMessage('An error occurred during verification');
>>>>>>> origin/copilot/update-main-with-all-branches
      }
    };

    verifyToken();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Background Effect */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sapphire rounded-full filter blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="card text-center">
          {/* Status Icon */}
          <div className="mb-6 flex justify-center">
<<<<<<< HEAD
            {status === "loading" && (
=======
            {status === 'loading' && (
>>>>>>> origin/copilot/update-main-with-all-branches
              <div className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center">
                <Loader2 className="text-gold animate-spin" size={40} />
              </div>
            )}
<<<<<<< HEAD
            {status === "success" && (
=======
            {status === 'success' && (
>>>>>>> origin/copilot/update-main-with-all-branches
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center">
                <CheckCircle className="text-green-500" size={40} />
              </div>
            )}
<<<<<<< HEAD
            {status === "error" && (
=======
            {status === 'error' && (
>>>>>>> origin/copilot/update-main-with-all-branches
              <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center">
                <AlertCircle className="text-red-500" size={40} />
              </div>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold gradient-text mb-4">
<<<<<<< HEAD
            {status === "loading" && "Authenticating..."}
            {status === "success" && "Welcome to The Matrix"}
            {status === "error" && "Authentication Failed"}
          </h1>

          {/* Message */}
          <p className="text-gray-400 mb-6">{message}</p>

          {/* Error Actions */}
          {status === "error" && (
            <div className="space-y-3">
              <button
                onClick={() => router.push("/login")}
=======
            {status === 'loading' && 'Authenticating...'}
            {status === 'success' && 'Welcome to The Matrix'}
            {status === 'error' && 'Authentication Failed'}
          </h1>

          {/* Message */}
          <p className="text-gray-400 mb-6">
            {message}
          </p>

          {/* Error Actions */}
          {status === 'error' && (
            <div className="space-y-3">
              <button
                onClick={() => router.push('/login')}
>>>>>>> origin/copilot/update-main-with-all-branches
                className="w-full py-3 bg-gold text-black font-bold rounded-lg hover:bg-platinum transition-all duration-300"
              >
                Return to Login
              </button>
              <p className="text-sm text-gray-500">
                Need help? Magic links expire after 15 minutes.
              </p>
            </div>
          )}

          {/* Success Animation */}
<<<<<<< HEAD
          {status === "success" && (
=======
          {status === 'success' && (
>>>>>>> origin/copilot/update-main-with-all-branches
            <div className="mt-4">
              <div className="flex justify-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 bg-gold rounded-full animate-bounce"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function MatrixAuthPage() {
  return (
<<<<<<< HEAD
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">
          <Loader2 className="text-gold animate-spin" size={40} />
        </div>
      }
    >
=======
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">
        <Loader2 className="text-gold animate-spin" size={40} />
      </div>
    }>
>>>>>>> origin/copilot/update-main-with-all-branches
      <MatrixAuthContent />
    </Suspense>
  );
}
