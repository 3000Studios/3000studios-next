/**
 * Blog Page
 * Content blog with rich, auto-generated articles and updates
 * Features: Article grid, categories, search functionality, newsletter signup
 */

'use client';

import { useState } from 'react';
import { Calendar, Clock, User, Search, Tag } from 'lucide-react';
import { motion } from 'framer-motion';
import { blogPosts, getAllCategories, getAllTags } from '../lib/blogData';
import Newsletter from '../components/Newsletter';
import LoadingSkeleton from '../components/LoadingSkeleton';
import GoogleAdsPlaceholder from '../components/GoogleAdsPlaceholder';

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  // email and isLoading are placeholders for future newsletter integration
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const categories = ['All', ...getAllCategories()];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-4 fade-in-up">
            Blog & Insights
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto scale-in">
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
              aria-label="Search blog articles"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap gap-3 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-semibold transition-all hover-lift ${
                selectedCategory === category
                  ? 'bg-gold text-black'
                  : 'glass border border-gold/30 text-gold hover:bg-gold/10'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Google Ads Placeholder - Revenue Generation */}
        <GoogleAdsPlaceholder 
          slot="blog-top-banner" 
          format="horizontal"
          className="mb-8"
        />

        {/* Blog Posts Grid */}
        {isLoading ? (
          <div className="space-y-8">
            <LoadingSkeleton variant="blog" count={3} />
          </div>
        ) : (
          <div className="space-y-8">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card group hover:border-gold transition-all hover-lift"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Featured Image Placeholder */}
                  <div className="md:w-1/3">
                    <div className="w-full h-48 bg-gradient-to-br from-gold/20 to-sapphire/20 rounded-lg flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-300">
                      {post.featured && (
                        <div className="absolute top-3 right-3 bg-gold text-black px-3 py-1 rounded-full text-xs font-bold">
                          FEATURED
                        </div>
                      )}
                      <div className="text-6xl opacity-30">
                        {post.category === 'Design' && '🎨'}
                        {post.category === 'Business' && '💼'}
                        {post.category === 'Process' && '⚙️'}
                        {post.category === 'Marketing' && '📢'}
                        {post.category === 'E-Commerce' && '🛍️'}
                        {post.category === 'Technology' && '🚀'}
                        {post.category === 'UX' && '🎯'}
                        {post.category === 'SEO' && '📈'}
                        {post.category === 'Development' && '💻'}
                        {post.category === 'Design Systems' && '🎨'}
                        {post.category === 'Branding' && '✨'}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="md:w-2/3">
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <span className="px-3 py-1 bg-gold/20 text-gold rounded-full text-sm font-semibold">
                        {post.category}
                      </span>
                      {post.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="px-3 py-1 bg-sapphire/20 text-sapphire rounded-full text-xs font-semibold">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-gold transition-colors">
                      {post.title}
                    </h2>
                    
                    <p className="text-gray-400 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <User size={16} />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={16} />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    <button className="mt-4 text-gold hover:text-platinum transition-colors font-semibold inline-flex items-center gap-2 hover-lift">
                      Read Full Article →
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {/* No Results */}
        {filteredPosts.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4 opacity-50">📝</div>
            <p className="text-gray-400 text-lg">No articles found matching your search</p>
            <button 
              onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
              className="mt-4 px-6 py-2 bg-gold text-black font-semibold rounded-lg hover:bg-platinum transition-all"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Mid-Content Ad */}
        {filteredPosts.length > 5 && (
          <GoogleAdsPlaceholder 
            slot="blog-mid-content" 
            format="rectangle"
            className="my-12"
          />
        )}

        {/* Newsletter Signup - Revenue Generation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <Newsletter 
            title="Join 1,000+ Subscribers"
            description="Get exclusive insights, industry trends, and special offers delivered to your inbox"
            showBenefits={true}
          />
        </motion.div>

        {/* Related Topics */}
        <div className="mt-16 card">
          <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <Tag className="text-gold" size={24} />
            Popular Topics
          </h3>
          <div className="flex flex-wrap gap-3">
            {getAllTags().slice(0, 15).map(tag => (
              <button
                key={tag}
                onClick={() => setSearchTerm(tag)}
                className="px-4 py-2 glass border border-gray-700 rounded-lg text-gray-300 hover:border-gold hover:text-gold transition-all text-sm"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
