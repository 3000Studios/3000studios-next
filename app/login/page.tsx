'use client';

import VideoBackground from '@/components/VideoBackground';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError('Invalid credentials');
    } else {
      window.location.href = '/admin';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-(--marble-black) relative overflow-hidden">
      <VideoBackground opacity={0.2} />
      {/* Background Effects */}
      <div className="absolute inset-0 bg-linear-to-br from-(--marble-black) via-gray-900 to-(--marble-black) opacity-90"></div>
      <div className="absolute inset-0 bg-[url('/assets/textures/marble-dark.jpg')] bg-cover bg-center opacity-20"></div>

      {/* Animated Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-linear-to-r from-(--gold-flake) to-(--gold-highlight) rounded-full blur-3xl opacity-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-linear-to-r from-(--gold-highlight) to-(--gold-flake) rounded-full blur-3xl opacity-10 animate-pulse delay-1000"></div>

      <div className="relative z-10 max-w-md w-full space-y-8 p-8">
        {/* Glass-morphism Card */}
        <div className="backdrop-blur-md bg-(--card-bg) border border-(--card-border) rounded-2xl shadow-2xl p-8 hover:shadow-(--shadow-gold) transition-all duration-500">
          <div className="text-center">
            <h2 className="text-4xl font-bold metallic-text-gold mb-2 animate-pulse">
              Welcome Back
            </h2>
            <p className="text-(--marble-white) opacity-80 text-sm">
              Access your premium dashboard
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-(--marble-white) mb-2"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full px-4 py-3 bg-(--card-bg) border border-(--card-border) rounded-lg text-(--marble-white) placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-(--gold-flake) focus:border-transparent transition-all duration-300 hover-shimmer"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-(--marble-white) mb-2"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="w-full px-4 py-3 bg-(--card-bg) border border-(--card-border) rounded-lg text-(--marble-white) placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-(--gold-flake) focus:border-transparent transition-all duration-300 hover-shimmer"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <div className="text-red-400 text-sm text-center bg-red-900/20 border border-red-800 rounded-lg p-3 animate-pulse">
                {error}
              </div>
            )}

            <div>
              <button
                type="submit"
                className="w-full py-3 px-4 bg-linear-to-r from-(--gold-flake) to-(--gold-highlight) text-(--marble-black) font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 hover-shimmer relative overflow-hidden"
              >
                <span className="relative z-10">Sign In</span>
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700"></div>
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-(--marble-white) opacity-60 text-xs">Secured by 3000 Studios</p>
          </div>
        </div>
      </div>
    </div>
  );
}
