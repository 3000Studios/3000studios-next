/**
 * Blog Page
 * Content blog with articles and updates
 * Features: Article grid, categories, search functionality
 * Future: CMS integration for content management
 */

'use client';

import { useState } from 'react';
import { Calendar, Clock, User, Search } from 'lucide-react';
import Link from 'next/link';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
}

const mockPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Building the Future of Digital Experiences',
    excerpt: 'Explore how we leverage cutting-edge technology to create immersive digital experiences...',
    author: '3000 Studios',
    date: 'Dec 8, 2025',
    readTime: '5 min',
    category: 'Technology'
  },
  {
    id: 2,
    title: 'The Art of Premium Design',
    excerpt: 'Discover our design philosophy and approach to creating luxury digital products...',
    author: '3000 Studios',
    date: 'Dec 5, 2025',
    readTime: '7 min',
    category: 'Design'
  },
  {
    id: 3,
    title: 'Innovation in E-Commerce',
    excerpt: 'How we revolutionize online shopping with AI-powered product recommendations...',
    author: '3000 Studios',
    date: 'Dec 1, 2025',
    readTime: '6 min',
    category: 'Business'
  },
];

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = mockPosts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-4">
            Blog & Insights
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Stories, insights, and updates from the 3000 Studios team
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="space-y-8">
          {filteredPosts.map((post) => (
            <article key={post.id} className="card group hover:border-gold transition-all">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Featured Image Placeholder */}
                <div className="md:w-1/3">
                  <div className="w-full h-48 bg-gradient-to-br from-gold/20 to-sapphire/20 rounded-lg flex items-center justify-center">
                    <div className="text-6xl opacity-30">📰</div>
                  </div>
                </div>

                {/* Content */}
                <div className="md:w-2/3">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-gold/20 text-gold rounded-full text-sm font-semibold">
                      {post.category}
                    </span>
                  </div>
                  
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-gold transition-colors">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-400 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <User size={16} />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} />
                      <span>{post.readTime} read</span>
                    </div>
                  </div>

                  <button className="mt-4 text-gold hover:text-platinum transition-colors font-semibold">
                    Read More →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No articles found matching your search</p>
          </div>
        )}

        {/* Newsletter Signup */}
        <div className="mt-16 card bg-gradient-to-r from-gold/10 to-sapphire/10 border-gold text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Stay Updated
          </h3>
          <p className="text-gray-400 mb-6 max-w-md mx-auto">
            Subscribe to our newsletter for the latest insights and updates
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold"
            />
            <button className="px-6 py-3 bg-gold text-black font-semibold rounded-lg hover:bg-platinum transition-all">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
