'use client';

import { AdSenseUnit } from '@/components/AdSense';
import HomeBackground from '@/components/HomeBackground';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import Button from './ui/Button';
import Card from './ui/Card';
import Section from './ui/Section';

import NewsFeed from '@/components/NewsFeed';

// ============================================
// COPYRIGHT-FREE MEDIA SOURCES
// Using Pexels, Unsplash APIs and free videos
// ============================================

const STOCK_IMAGES = {
  hero: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1920&q=80', // Abstract tech
  ai: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80', // AI concept
  design: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80', // UI Design
  voice: 'https://images.unsplash.com/photo-1589903308904-1010c2294adc?w=800&q=80', // Sound waves
  automation: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80', // Robot
  sync: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80', // Data center
  security: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80', // Security
  support: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80', // Support
  testimonial1: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80', // Professional
  testimonial2: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80', // Professional woman
  testimonial3: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80', // CEO
};

const STOCK_VIDEOS = {
  heroBackground:
    'https://res.cloudinary.com/dj92eb97f/video/upload/v1767518758/5529964-hd_720_1280_25fps_iirxgn.mp4', // New Home Background
  techGrid: 'https://cdn.pixabay.com/video/2021/02/22/66316-517578498_large.mp4',
};

// Service icons with gradients
// Service images
const SERVICE_IMAGES = [
  {
    img: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&q=80',
    gradient: 'from-cyan-400 to-blue-600',
  },
  {
    img: 'https://images.unsplash.com/photo-1589903308904-1010c2294adc?w=400&q=80',
    gradient: 'from-purple-400 to-pink-600',
  },
  {
    img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80',
    gradient: 'from-yellow-400 to-orange-600',
  },
  {
    img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&q=80',
    gradient: 'from-amber-400 to-yellow-600',
  },
  {
    img: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&q=80',
    gradient: 'from-green-400 to-emerald-600',
  },
  {
    img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80',
    gradient: 'from-blue-400 to-indigo-600',
  },
];

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <div ref={containerRef} className="relative">
      {/* 3D Animated "3000 STUDIOS" Background */}
      <HomeBackground />

      {/* ============================================
          HERO SECTION - Video Background + Avatar
          ============================================ */}
      <section className="relative min-h-screen">
        {/* Animated gradient overlay for depth */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-gradient-radial from-cyan-500/10 to-transparent blur-3xl animate-pulse" />
          <div
            className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-gradient-radial from-yellow-500/10 to-transparent blur-3xl animate-pulse"
            style={{ animationDelay: '1s' }}
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 pt-20 min-h-screen flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
            {/* Left: Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="space-y-8"
            >
              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-5xl md:text-7xl font-bold leading-tight"
              >
                <span className="bg-linear-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                  The Future of
                </span>
                <br />
                <span className="bg-linear-to-r from-[#1BFFFF] via-[#00D1FF] to-[#1BFFFF] bg-clip-text text-transparent animate-pulse drop-shadow-[0_0_15px_rgba(27,255,255,0.5)]">
                  Digital Excellence
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-xl text-gray-300/90 max-w-lg leading-relaxed"
              >
                AI-powered automation, voice command systems, and premium digital solutions that
                transform your business into a powerhouse.
              </motion.p>

              {/* CTA Buttons */}

              {/* Stats row */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="flex gap-8 pt-8 border-t border-white/10"
              >
                {[
                  { value: '250+', label: 'Projects' },
                  { value: '99%', label: 'Satisfaction' },
                  { value: '24/7', label: 'Support' },
                ].map((stat, i) => (
                  <div key={i}>
                    <div className="text-2xl font-bold text-[#D4AF37]">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right: Premium Visualization (Stock Image/Placeholder) */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="relative w-full h-[600px] flex items-center justify-center p-8"
            >
              <div className="relative w-full h-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-cyan-500/10 group">
                <Image
                  src={STOCK_IMAGES.hero}
                  alt="3000 Studios Interior"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                {/* Float Badge */}
                <div className="absolute bottom-8 left-8 right-8 p-6 glass border border-white/20 rounded-2xl backdrop-blur-xl">
                  <div className="text-2xl font-bold text-white mb-2">
                    Pioneering Autonomous Systems
                  </div>
                  <p className="text-sm text-gray-300">
                    Experience the next generation of digital control with 3KAI.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================
          NEWS & UPDATES SECTION
          ============================================ */}
      <Section className="bg-black py-16">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start"
          >
            <div className="lg:col-span-1 space-y-6">
              <span className="text-cyan-400 text-sm font-semibold tracking-widest uppercase">
                Global Updates
              </span>
              <h2 className="text-4xl font-bold text-white leading-tight">
                Stay Ahead of the <span className="gradient-text">Curve</span>
              </h2>
              <p className="text-gray-400">
                Real-time intelligence from the world of technology, AI, and digital innovation.
                Powered by our autonomous news ingestion engine.
              </p>
              <div className="pt-4">
                <AdSenseUnit
                  slot="news-sidebar"
                  style={{ display: 'block', width: '100%', height: '250px' }}
                />
              </div>
            </div>

            <div className="lg:col-span-2 h-[500px]">
              <NewsFeed />
            </div>
          </motion.div>
        </div>
      </Section>

      {/* ============================================
          SERVICES SECTION
          ============================================ */}
      <Section className="bg-linear-to-b from-black via-[#0a0a0a] to-black relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-20">
          <Image src="/images/geometric-shapes.png" alt="" fill className="object-cover" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20 relative z-10"
        >
          <span className="text-[#D4AF37] text-sm font-semibold tracking-[0.3em] uppercase mb-4 block">
            What We Offer
          </span>
          <h2 className="text-5xl md:text-6xl font-bold bg-linear-to-r from-white via-gray-200 to-[#D4AF37] bg-clip-text text-transparent">
            Premium Services
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {[
            {
              title: 'AI Automation',
              desc: 'Advanced artificial intelligence systems that automate your workflow and maximize efficiency across all platforms.',
              image: STOCK_IMAGES.automation,

              img: SERVICE_IMAGES[0],
            },
            {
              title: 'Voice Command',
              desc: 'Intelligent voice-driven interface allowing you to control systems naturally and intuitively.',
              image: STOCK_IMAGES.voice,
              img: SERVICE_IMAGES[1],
            },
            {
              title: 'Real-Time Sync',
              desc: 'Seamless synchronization across all devices with millisecond latency and perfect data integrity.',
              image: STOCK_IMAGES.sync,
              img: SERVICE_IMAGES[2],
            },
            {
              title: 'Premium Design',
              desc: 'Museum-quality aesthetic with luxury textures and gold accents throughout your digital presence.',
              image: STOCK_IMAGES.design,
              img: SERVICE_IMAGES[3],
            },
            {
              title: 'Secure Protocol',
              desc: 'Enterprise-grade encryption and security protocols protecting all your sensitive data.',
              image: STOCK_IMAGES.security,
              img: SERVICE_IMAGES[4],
            },
            {
              title: '24/7 Support',
              desc: 'Dedicated support team available around the clock to assist with any technical needs.',
              image: STOCK_IMAGES.support,

              img: SERVICE_IMAGES[5],
            },
          ].map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card
                gradient
                className="group h-full hover:scale-[1.02] transition-all duration-500 bg-linear-to-br from-white/5 to-white/2 border border-white/10 hover:border-[#D4AF37]/50 overflow-hidden"
              >
                {/* Image header - FULL BOX REAL IMAGE */}
                <div className="relative h-64 -mx-6 -mt-6 mb-6 overflow-hidden">
                  <Image
                    src={service.img.img}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#D4AF37] transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-400 leading-relaxed text-sm">{service.desc}</p>
                <div className="mt-4 text-[#D4AF37] text-xs uppercase tracking-widest font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore Solution →
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* AdSense Unit - After Services */}
      <Section className="bg-black">
        <AdSenseUnit
          slot="services-bottom"
          style={{ display: 'block', width: '100%', minHeight: '250px', margin: '20px 0' }}
        />
      </Section>

      {/* ============================================
          VIDEO SHOWCASE SECTION
          ============================================ */}
      <Section className="bg-black relative overflow-hidden">
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            className="w-full h-full object-cover opacity-20"
          >
            <source src={STOCK_VIDEOS.techGrid} type="video/mp4" />
          </video>
        </div>

        <div className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-linear-to-r from-cyan-400 via-white to-purple-400 bg-clip-text text-transparent">
              See It In Action
            </h2>
            <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
              Watch how our AI-powered platform transforms the way you work
            </p>

            {/* Video player placeholder */}
            <div className="relative max-w-4xl mx-auto aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-cyan-500/10">
              <Image src={STOCK_IMAGES.ai} alt="Demo Video" fill className="object-cover" />
              {/* Play button */}
              <button
                title="Play demo video"
                aria-label="Play demo video"
                className="absolute inset-0 flex items-center justify-center group"
              >
                <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#D4AF37]/30 transition-all duration-300">
                  <div className="w-0 h-0 border-t-12 border-b-12 border-l-20 border-transparent border-l-white ml-1" />
                </div>
              </button>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* ============================================
          TESTIMONIALS SECTION
          ============================================ */}
      <Section className="bg-linear-to-b from-black via-[#0f0f0f] to-black">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#D4AF37] text-sm font-semibold tracking-[0.3em] uppercase mb-4 block">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white">What Our Clients Say</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              quote:
                '3000 Studios transformed our entire digital infrastructure. The automation systems alone saved us hundreds of hours every month.',
              author: 'Alex Morgan',
              role: 'Tech Entrepreneur',
              image: STOCK_IMAGES.testimonial1,
            },
            {
              quote:
                'The premium design and attention to detail is absolutely remarkable. Every interaction feels luxurious and intentional.',
              author: 'Jessica Lee',
              role: 'Digital Director',
              image: STOCK_IMAGES.testimonial2,
            },
            {
              quote:
                'The support team is phenomenal. They anticipated our needs and provided solutions before we even asked.',
              author: 'Marcus Chen',
              role: 'CEO, Tech Innovations',
              image: STOCK_IMAGES.testimonial3,
            },
          ].map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <Card className="h-full bg-linear-to-br from-white/5 to-transparent border border-white/10 hover:border-[#D4AF37]/30 transition-all duration-300">
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, j) => (
                    <span key={j} className="text-[#D4AF37] text-lg">
                      ★
                    </span>
                  ))}
                </div>

                <p className="text-gray-300 italic leading-relaxed mb-8">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{testimonial.author}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* AdSense Unit - After Testimonials */}
      <Section className="bg-black">
        <AdSenseUnit
          slot="testimonials-bottom"
          style={{ display: 'block', width: '100%', minHeight: '250px', margin: '20px 0' }}
        />
      </Section>

      {/* ============================================
          BLOG/INSIGHTS SECTION
          ============================================ */}
      <Section className="bg-linear-to-b from-black to-[#0a0a0a]">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#D4AF37] text-sm font-semibold tracking-[0.3em] uppercase mb-4 block">
            Blog
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white">Latest Insights</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'The Future of AI Automation',
              category: 'TECHNOLOGY',
              excerpt:
                'Discover how artificial intelligence is revolutionizing business processes and creating unprecedented efficiency gains.',
              date: 'Jan 15, 2025',
              image: STOCK_IMAGES.ai,
            },
            {
              title: 'Luxury UI/UX Design Principles',
              category: 'DESIGN',
              excerpt:
                'Explore the elegant design philosophy behind premium digital experiences and how they elevate brand perception.',
              date: 'Jan 10, 2025',
              image: STOCK_IMAGES.design,
            },
            {
              title: 'Voice Command Technology Advances',
              category: 'INNOVATION',
              excerpt:
                'Learn about the latest breakthroughs in natural language processing and how voice interfaces are becoming mainstream.',
              date: 'Jan 5, 2025',
              image: STOCK_IMAGES.voice,
            },
          ].map((post, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="group h-full overflow-hidden bg-linear-to-br from-white/5 to-transparent border border-white/10 hover:border-[#D4AF37]/30 transition-all duration-500">
                {/* Image */}
                <div className="relative h-52 -mx-6 -mt-6 mb-6 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black to-transparent opacity-60" />

                  {/* Category badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#D4AF37]/20 backdrop-blur-sm border border-[#D4AF37]/30">
                    <span className="text-[#D4AF37] text-xs font-semibold tracking-wider">
                      {post.category}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#D4AF37] transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">{post.excerpt}</p>

                <div className="flex justify-between items-center pt-4 border-t border-white/5">
                  <span className="text-gray-500 text-sm">{post.date}</span>
                  <a
                    href="#"
                    className="text-[#D4AF37] font-medium text-sm hover:text-white transition-colors"
                  >
                    Read More →
                  </a>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* AdSense Unit - After Blog */}
      <Section className="bg-black">
        <AdSenseUnit
          slot="blog-bottom"
          style={{ display: 'block', width: '100%', minHeight: '250px', margin: '20px 0' }}
        />
      </Section>

      {/* ============================================
          TRUCK VIDEO SECTION (User Requested)
          ============================================ */}
      <Section className="bg-black relative overflow-hidden py-20">
        <div className="container mx-auto px-4 z-10 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-bold text-[#D4AF37] mb-4">Logistics & Transportation</h2>
            <p className="text-gray-400">Powering the future of fleet management</p>
          </motion.div>

          <div className="relative aspect-video max-w-5xl mx-auto rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <video autoPlay muted loop playsInline className="w-full h-full object-cover">
              <source
                src="https://videos.pexels.com/video-files/3052608/3052608-uhd_2560_1440_30fps.mp4"
                type="video/mp4"
              />
            </video>
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute bottom-4 right-4">
              <a
                href="https://www.pexels.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-white/50 hover:text-white"
              >
                Video via Pexels
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* ============================================
          CTA SECTION
          ============================================ */}
      <Section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-linear-to-r from-[#D4AF37]/10 via-transparent to-cyan-500/10" />
        <div className="absolute inset-0">
          <Image src="/images/hero-bg.png" alt="" fill className="object-cover opacity-30" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative z-10 text-center max-w-4xl mx-auto py-12"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-linear-to-r from-[#D4AF37] via-white to-[#D4AF37] bg-clip-text text-transparent">
            Ready to Transform Your Digital Presence?
          </h2>
          <p className="text-xl text-gray-300 mb-10 leading-relaxed">
            Join hundreds of innovative companies that have elevated their brand with 3000
            Studios&apos; premium digital solutions.
          </p>
          <div className="flex flex-wrap gap-6 justify-center">
            <Button
              variant="primary"
              size="lg"
              className="shadow-xl shadow-yellow-500/30 hover:shadow-yellow-500/50 text-lg px-10"
            >
              Start Your Journey
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="backdrop-blur-xl bg-white/5 border border-white/20 hover:bg-white/10 text-lg px-10"
            >
              View Portfolio
            </Button>
          </div>
        </motion.div>
      </Section>
    </div>
  );
}
