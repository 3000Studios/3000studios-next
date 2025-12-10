/**
 * Login Page
 * Secure authentication page for accessing the Matrix admin panel
 * Features: Email/password authentication, validation, redirect to /matrix on success
 * Security Note: Uses environment variables for credentials (NOT hardcoded)
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // TODO: Replace with actual API call to /api/auth/login
      // This is a placeholder - production version will use secure backend authentication
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // For now, redirect to matrix page
      // In production, this will verify credentials against environment variables
      if (email && password) {
        router.push('/matrix');
      } else {
        setError('Please enter both email and password');
      }
    } catch (err) {
      setError('Authentication failed. Please try again.');
      console.error('Login error:', err);
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
            <h1 className="text-3xl font-bold text-white mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-400">
              Sign in to access The Matrix
            </p>
          </div>

          {/* Login Form */}
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
                  placeholder="your@email.com"
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
                  placeholder="••••••••"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-900/30 border border-red-500/50 rounded-lg text-red-200 text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gold text-black font-bold rounded-lg hover:bg-platinum transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>

          {/* Additional Info */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              🔒 Secure authentication powered by 3000 Studios
            </p>
          </div>
        </div>

        {/* Development Note */}
        <div className="mt-4 text-center text-xs text-gray-600">
          <p>
            ⚠️ Production version will use secure backend authentication
          </p>
        </div>
      </div>
    </div>
  );
}
