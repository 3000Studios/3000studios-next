'use client';

import { AlertCircle, CheckCircle, Lock, Mail, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showMagicLink, setShowMagicLink] = useState(false);
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const [magicLinkUrl, setMagicLinkUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Cookie is set server-side via Set-Cookie header
        router.push('/matrix');
      } else {
        const data = await response.json();
        setError(data.error || 'Login failed');
      }
    } catch {
      setError('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    setMagicLinkSent(false);

    try {
      const response = await fetch('/api/auth/magic-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMagicLinkSent(true);
        // Show link if API returns it (API controls this based on environment)
        if (data.magicLink) {
          setMagicLinkUrl(data.magicLink);
        }
      } else {
        setError(data.error || 'Failed to send magic link');
      }
    } catch (err) {
      console.error('Error sending magic link:', err);
      setError('An error occurred sending magic link (E001). Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Background Effect */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sapphire rounded-full filter blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Login Card */}
        <div className="card">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gold rounded-full mb-4">
              <Lock className="text-black" size={32} />
            </div>
            <h1 className="text-3xl font-bold gradient-text mb-2">
              THE MATRIX
            </h1>
            <p className="text-gray-400">
              Admin Access Portal
            </p>
          </div>

          {/* Toggle Between Login Methods */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setShowMagicLink(false)}
              className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
                !showMagicLink
                  ? 'bg-gold text-black'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              Password Login
            </button>
            <button
              onClick={() => setShowMagicLink(true)}
              className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                showMagicLink
                  ? 'bg-gold text-black'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              <Sparkles size={16} />
              Magic Link
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-900/30 border border-red-500/50 rounded-lg text-red-200 text-sm flex items-center gap-2 mb-6">
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          {/* Success Message for Magic Link */}
          {magicLinkSent && (
            <div className="p-4 bg-green-900/30 border border-green-500/50 rounded-lg text-green-200 text-sm mb-6">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle size={18} />
                <span className="font-semibold">Magic Link Sent!</span>
              </div>
              <p className="text-xs mb-2">Check your email for the login link. It expires in 15 minutes.</p>
              {magicLinkUrl && (
                <div className="mt-3 p-2 bg-black/50 rounded text-xs break-all">
                  <p className="text-gray-400 mb-1">Development Mode - Direct Link:</p>
                  <a href={magicLinkUrl} className="text-blue-400 hover:text-blue-300 underline">
                    {magicLinkUrl}
                  </a>
                </div>
              )}
            </div>
          )}

          {/* Password Login Form */}
          {!showMagicLink && (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
                    placeholder="admin@example.com"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
                    placeholder="••••••••••••••••"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-gold text-black font-bold rounded-lg hover:bg-platinum transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Authenticating...' : 'Enter THE MATRIX'}
              </button>
            </form>
          )}

          {/* Magic Link Form */}
          {showMagicLink && (
            <form onSubmit={handleMagicLink} className="space-y-6">
              {/* Email Input */}
              <div>
                <label htmlFor="magic-email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    id="magic-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
                    placeholder="admin@example.com"
                    required
                    disabled={isLoading || magicLinkSent}
                  />
                </div>
              </div>

              <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-3 text-sm text-blue-200">
                <div className="flex items-start gap-2">
                  <Sparkles size={16} className="mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold mb-1">Passwordless Login</p>
                    <p className="text-xs text-blue-300">
                      We'll send a secure one-time link to your email. Click it to access The Matrix instantly.
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || magicLinkSent}
                className="w-full py-3 bg-gold text-black font-bold rounded-lg hover:bg-platinum transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Sparkles size={20} />
                {isLoading ? 'Sending...' : magicLinkSent ? 'Link Sent!' : 'Send Magic Link'}
              </button>
            </form>
          )}

          {/* Additional Info */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              🔒 Secure authentication • Admin credentials required
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
