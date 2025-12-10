/**
 * Portfolio Page
 * Upgraded professional portfolio showcase
 * Features: Featured work, case studies, testimonials
 */

'use client';

import { Award, Users, TrendingUp, Star } from 'lucide-react';

export default function PortfolioPage() {
  const stats = [
    { icon: <Award size={32} />, value: '50+', label: 'Projects Completed' },
    { icon: <Users size={32} />, value: '100+', label: 'Happy Clients' },
    { icon: <TrendingUp size={32} />, value: '200%', label: 'Average ROI' },
    { icon: <Star size={32} />, value: '5.0', label: 'Client Rating' },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CEO, TechCorp',
      content: '3000 Studios transformed our digital presence. Their attention to detail and technical expertise is unmatched.',
    },
    {
      name: 'Michael Chen',
      role: 'Founder, StartupXYZ',
      content: 'Working with 3000 Studios was a game-changer. They delivered beyond our expectations.',
    },
    {
      name: 'Emma Williams',
      role: 'Marketing Director',
      content: 'Professional, innovative, and reliable. The team at 3000 Studios is simply the best.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-4">
            Portfolio
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            A showcase of excellence, innovation, and transformative digital experiences
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, idx) => (
            <div key={idx} className="card text-center">
              <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="text-black">{stat.icon}</div>
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">{stat.value}</h3>
              <p className="text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Featured Work */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Featured Work</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="card group">
                <div className="w-full h-64 bg-gradient-to-br from-gold/20 to-sapphire/20 rounded-lg mb-4 flex items-center justify-center">
                  <div className="text-8xl opacity-30">🎨</div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-gold transition-colors">
                  Premium Project {item}
                </h3>
                <p className="text-gray-400 mb-4">
                  A comprehensive digital solution featuring cutting-edge technology,
                  stunning design, and exceptional user experience.
                </p>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-gold/20 text-gold rounded-full text-sm">Web</span>
                  <span className="px-3 py-1 bg-sapphire/20 text-sapphire rounded-full text-sm">Mobile</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Client Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="card">
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="text-gold fill-gold" size={20} />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 italic">&quot;{testimonial.content}&quot;</p>
                <div>
                  <p className="text-white font-semibold">{testimonial.name}</p>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Services */}
        <div className="card bg-gradient-to-r from-gold/10 to-sapphire/10 border-gold">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-3">💻</div>
              <h3 className="text-xl font-bold text-white mb-2">Web Development</h3>
              <p className="text-gray-400">Full-stack solutions with modern frameworks</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">📱</div>
              <h3 className="text-xl font-bold text-white mb-2">Mobile Apps</h3>
              <p className="text-gray-400">Native and cross-platform applications</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🎨</div>
              <h3 className="text-xl font-bold text-white mb-2">UI/UX Design</h3>
              <p className="text-gray-400">Beautiful, user-centric interfaces</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Project?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Let&apos;s discuss how we can help bring your vision to life
          </p>
          <button className="px-8 py-4 bg-gold text-black font-bold rounded-lg hover:bg-platinum transition-all hover:shadow-lg text-lg">
            Get in Touch
          </button>
        </div>
      </div>
    </div>
  );
}
