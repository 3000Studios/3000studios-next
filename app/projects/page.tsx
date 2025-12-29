'use client';

import { Footer } from '@/components/ui/Footer';
import { Navigation } from '@/components/ui/Navigation';
import { PageHeader } from '@/components/ui/PageHeader';
import MediaGrid from '@/components/MediaGrid';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface WordPressPost {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  link: string;
  date: string;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
    }>;
  };
}

export default function ProjectsPage() {
  const [posts, setPosts] = useState<WordPressPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get<WordPressPost[]>('https://3000studios.com/wp-json/wp/v2/posts?per_page=10&_embed')
      .then((res) => {
        setPosts(res.data);
        setLoading(false);
      })
      .catch(() => {
        setPosts([]);
        setLoading(false);
      });
  }, []);

  // Sample portfolio items for showcase grid
  const portfolioShowcase = [
    {
      id: '1',
      type: 'image' as const,
      src: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
      alt: 'Project 1',
      title: 'Web Design Showcase',
      description: 'Award-winning digital experience',
      ratio: 'landscape' as const,
    },
    {
      id: '2',
      type: 'image' as const,
      src: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop',
      alt: 'Project 2',
      title: 'Mobile App Development',
      description: 'Cross-platform native apps',
      ratio: 'landscape' as const,
    },
    {
      id: '3',
      type: 'image' as const,
      src: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=600&fit=crop',
      alt: 'Project 3',
      title: 'Brand Identity Project',
      description: 'Complete visual rebranding',
      ratio: 'landscape' as const,
    },
  ];

  return (
    <main className="relative min-h-screen">
      {/* Full-screen background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="fixed inset-0 w-full h-full object-cover -z-10"
      >
        <source
          src="https://res.cloudinary.com/dj92eb97f/video/upload/v1766986144/3D_tunnel_to_purple_d7cofd.mp4"
          type="video/mp4"
        />
      </video>
      <div className="fixed inset-0 bg-black/50 -z-5"></div>

      <Navigation />

      <PageHeader title="PROJECTS" subtitle="Selected Works & Case Studies" />

      <div className="max-w-7xl mx-auto px-6 pb-32 relative z-10">
        {/* Featured Showcase Grid */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl mb-4">Featured Work</h2>
            <p className="font-sans text-platinum/60">Our latest and greatest projects</p>
          </div>
          <MediaGrid items={portfolioShowcase} columns={3} gap="lg" />
        </div>

        {/* Portfolio Grid from WordPress */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl mb-4">All Projects</h2>
            <p className="font-sans text-platinum/60">Browse our complete portfolio of work</p>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
              <div className="w-12 h-12 border-2 border-hologram border-t-transparent rounded-full animate-spin"></div>
              <p className="font-sans text-xs tracking-widest text-platinum/50">LOADING DATA...</p>
            </div>
          ) : posts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <div
                  key={post.id}
                  className="hyper-glass p-6 rounded-sm group relative overflow-hidden hover:-translate-y-2 transition-transform duration-500"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-hologram/10 blur-[50px] rounded-full group-hover:bg-hologram/20 transition-all duration-700"></div>

                  {post._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
                    <div className="relative h-48 mb-6 overflow-hidden rounded-sm">
                      <img
                        src={post._embedded['wp:featuredmedia'][0].source_url}
                        alt={post.title.rendered}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    </div>
                  )}

                  <div className="relative z-10">
                    <span className="font-sans text-[10px] tracking-widest text-hologram mb-2 block">
                      {new Date(post.date).toLocaleDateString()}
                    </span>
                    <h3
                      className="font-display text-2xl mb-4 text-white group-hover:text-hologram transition-colors"
                      dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                    />
                    <div
                      className="font-sans text-sm text-platinum/60 mb-6 line-clamp-3 font-light leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                    />
                    <Link
                      href={post.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-sans text-xs tracking-widest text-white hover:text-hologram transition-colors group/link"
                    >
                      VIEW PROJECT
                      <span className="transform group-hover/link:translate-x-1 transition-transform">
                        →
                      </span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 hyper-glass rounded-sm">
              <p className="font-sans text-platinum/50 tracking-widest">NO PROJECTS FOUND</p>
            </div>
          )}
        </div>

        {/* Process Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl mb-4">Our Process</h2>
            <p className="font-sans text-platinum/60">How we bring your vision to life</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { num: '01', title: 'Discovery', desc: 'Understanding your goals and vision' },
              { num: '02', title: 'Design', desc: 'Creating compelling visual concepts' },
              { num: '03', title: 'Development', desc: 'Building with precision and care' },
              { num: '04', title: 'Launch', desc: 'Delivering results that exceed' },
            ].map((step, idx) => (
              <div key={idx} className="relative group">
                <div className="hyper-glass p-8 rounded-sm h-full flex flex-col">
                  <div className="text-5xl font-display text-hologram/30 group-hover:text-hologram/60 transition-colors mb-4">
                    {step.num}
                  </div>
                  <h3 className="font-display text-2xl mb-4">{step.title}</h3>
                  <p className="font-sans text-platinum/60 flex-grow">{step.desc}</p>
                </div>
                {idx < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-1 bg-gradient-to-r from-hologram/50 to-transparent -translate-y-1/2" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative overflow-hidden rounded-sm hyper-glass p-16 text-center">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-10"
          >
            <source
              src="https://videos.pexels.com/video-files/3769556/3769556-hd_1920_1080_30fps.mp4"
              type="video/mp4"
            />
          </video>

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="font-display text-4xl mb-6">Ready to Start Your Project?</h2>
            <p className="font-sans text-xl text-platinum/70 mb-10">
              Let's collaborate to create something extraordinary that sets your brand apart.
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-gradient-to-r from-hologram to-hologram/50 rounded-sm font-sans font-bold tracking-widest hover:shadow-lg hover:shadow-hologram/50 transition-all duration-300 transform hover:scale-105"
            >
              GET IN TOUCH
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
