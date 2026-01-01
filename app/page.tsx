"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import VideoSplash from "./ui/VideoSplash";
import Button from "./ui/Button";
import Card from "./ui/Card";
import Section from "./ui/Section";

import Image from "next/image";
import AuroraHero from "../components/AuroraHero";
import AvatarSystem from "../components/AvatarSystem";

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 3D Scroll zoom effect for hero
    const handleScroll = () => {
      if (heroRef.current) {
        const scrolled = window.scrollY;
        const scale = 1 + scrolled * 0.0003;
        heroRef.current.style.transform = `scale(${scale})`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <VideoSplash /> 
      {/* Kept VideoSplash but note it might cover content initially. 
          The user wanted a redesign, assuming they scroll down or it fades out. */}
      
      {/* Hero Section Redesigned */}
      <Section className="min-h-screen pt-24 relative overflow-hidden">
        
        {/* Main Grid Layout */}
        <div className="container mx-auto h-full min-h-[80vh] grid grid-cols-1 lg:grid-cols-12 gap-8 px-4 relative z-20">
          
          {/* Logo Area (Top Left) */}
          <div className="lg:col-span-12 flex justify-start items-start pt-8 pl-4 lg:absolute lg:top-0 lg:left-0 z-30">
             <div className="h-[120px] w-[300px] relative animate-float hover-lift">
               <Image 
                   src="/logo.png" 
                   alt="3000 Studios Logo" 
                   fill 
                   className="object-contain drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]"
                   priority
                 />
             </div>
          </div>

          {/* Right/Center Content: Aurora Text + CTA */}
          <div className="lg:col-span-12 flex flex-col justify-center items-center relative z-20 mt-20 lg:mt-0">
            
            <div className="w-full max-w-4xl mx-auto mb-12 transform hover:scale-105 transition-transform duration-700">
               <AuroraHero />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 justify-center w-full z-30"
            >
              <Button 
                variant="primary" 
                size="lg"
                className="shadow-lg shadow-yellow-500/50 hover:shadow-yellow-500/80 min-w-[200px]"
              >
                Explore Solutions
              </Button>
              <Button 
                variant="secondary" 
                size="lg"
                className="backdrop-blur-md bg-white/10 hover:bg-white/20 min-w-[200px]"
              >
                Learn More
              </Button>
            </motion.div>

          </div>
        </div>

        {/* Avatars Bottom Left */}
        <div className="absolute bottom-0 left-0 w-[400px] h-[500px] z-30 hidden lg:block">
           <AvatarSystem />
        </div>
        {/* Mobile Avatar Fallback (optional, keeping hidden on small screens or adjusting layout as needed) */}


        {/* Background Elements */}
         <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#05777f] rounded-full filter blur-[100px] opacity-30 animate-pulse" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#33f777] rounded-full filter blur-[120px] opacity-20" />
        </div>

      </Section>

      {/* Features Section */}
      <Section className="bg-gradient-to-b from-black via-[#0f0f0f] to-black">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-16"
          style={{
            background: 'linear-gradient(135deg, #D4AF37, #e8e8e8)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '2px'
          }}
        >
          OUR SERVICES
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "AI AUTOMATION", desc: "Advanced artificial intelligence systems that automate your workflow and maximize efficiency across all platforms." },
            { title: "VOICE COMMAND", desc: "Intelligent voice-driven interface allowing you to control systems naturally and intuitively." },
            { title: "REAL-TIME SYNC", desc: "Seamless synchronization across all devices with millisecond latency and perfect data integrity." },
            { title: "PREMIUM DESIGN", desc: "Museum-quality aesthetic with luxury marble textures and gold accents throughout." },
            { title: "24/7 SUPPORT", desc: "Dedicated support team available around the clock to assist with any technical needs." },
            { title: "SECURE PROTOCOL", desc: "Enterprise-grade encryption and security protocols protecting all your sensitive data." },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card 
                gradient 
                className="h-full hover:scale-105 transition-all duration-300 bg-[rgba(212,175,55,0.05)] border-[rgba(212,175,55,0.2)]"
              >
                <h3 
                  className="text-2xl font-bold mb-4"
                  style={{ color: '#D4AF37', letterSpacing: '1px' }}
                >
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed text-[0.95rem]">
                  {feature.desc}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Stats Section */}
      <Section className="bg-gradient-to-b from-black via-[rgba(212,175,55,0.05)] to-black">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {[
            { number: "250+", label: "Successful Projects" },
            { number: "99%", label: "Client Satisfaction" },
            { number: "15+", label: "Years Experience" },
            { number: "24/7", label: "Support Available" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div 
                className="text-5xl md:text-6xl font-bold mb-2"
                style={{
                  background: 'linear-gradient(135deg, #D4AF37, #e6c957)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                {stat.number}
              </div>
              <div className="text-gray-400 text-sm md:text-base">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Testimonials */}
      <Section className="bg-black">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-16"
          style={{
            background: 'linear-gradient(135deg, #D4AF37, #e8e8e8)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '2px'
          }}
        >
          CLIENT TESTIMONIALS
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { quote: "3000 Studios transformed our entire digital infrastructure. The automation systems alone saved us hundreds of hours every month.", author: "Alex Morgan", role: "Tech Entrepreneur", initial: "A" },
            { quote: "The premium design and attention to detail is absolutely remarkable. Every interaction feels luxurious and intentional.", author: "Jessica Lee", role: "Digital Director", initial: "J" },
            { quote: "The support team is phenomenal. They anticipated our needs and provided solutions before we even asked. Truly white-glove service.", author: "Marcus Chen", role: "CEO, Tech Innovations", initial: "M" },
          ].map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <Card className="h-full bg-gradient-to-br from-[rgba(212,175,55,0.08)] to-[rgba(232,232,232,0.02)] border-[rgba(212,175,55,0.15)]">
                <div className="flex gap-4 mb-6">
                  <div 
                    className="w-[60px] h-[60px] rounded-full flex items-center justify-center font-bold text-black shadow-lg"
                    style={{ 
                      background: 'linear-gradient(135deg, #D4AF37, #e8e8e8)',
                      boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)'
                    }}
                  >
                    {testimonial.initial}
                  </div>
                  <div>
                    <h4 className="font-bold" style={{ color: '#D4AF37', letterSpacing: '0.5px' }}>
                      {testimonial.author}
                    </h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-300 italic leading-relaxed text-[0.95rem] mb-4">
                  "{testimonial.quote}"
                </p>
                <div className="text-[#D4AF37] tracking-wider">★★★★★</div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Blog Preview */}
      <Section className="bg-gradient-to-b from-black via-[#0f0f0f] to-black">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-16"
          style={{
            background: 'linear-gradient(135deg, #D4AF37, #e8e8e8)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '2px'
          }}
        >
          LATEST INSIGHTS
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "The Future of AI Automation", category: "TECHNOLOGY", excerpt: "Discover how artificial intelligence is revolutionizing business processes and creating unprecedented efficiency gains.", date: "Jan 15, 2025" },
            { title: "Luxury UI/UX Design Principles", category: "DESIGN", excerpt: "Explore the elegant design philosophy behind premium digital experiences and how marble textures elevate brand perception.", date: "Jan 10, 2025" },
            { title: "Voice Command Technology Advances", category: "INNOVATION", excerpt: "Learn about the latest breakthroughs in natural language processing and how voice interfaces are becoming mainstream.", date: "Jan 5, 2025" },
          ].map((post, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full hover:scale-105 transition-all duration-300 bg-[rgba(212,175,55,0.05)] border-[rgba(212,175,55,0.15)] overflow-hidden">
                <div className="h-[200px] bg-gradient-to-br from-[rgba(212,175,55,0.2)] to-[rgba(232,232,232,0.05)] flex items-center justify-center text-sm text-[rgba(212,175,55,0.5)] -mx-6 -mt-6 mb-6">
                  Premium Blog Image
                </div>
                <span 
                  className="inline-block px-4 py-2 text-xs tracking-wider rounded mb-4"
                  style={{ 
                    background: 'rgba(212, 175, 55, 0.15)',
                    color: '#D4AF37'
                  }}
                >
                  {post.category}
                </span>
                <h3 className="text-xl font-bold text-white mb-4 leading-tight">
                  {post.title}
                </h3>
                <p className="text-gray-400 text-[0.95rem] leading-relaxed mb-6">
                  {post.excerpt}
                </p>
                <div className="flex justify-between items-center border-t border-[rgba(212,175,55,0.1)] pt-4 text-sm">
                  <span className="text-gray-500">{post.date}</span>
                  <a href="#" className="font-bold" style={{ color: '#D4AF37' }}>
                    Read More →
                  </a>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="bg-gradient-to-b from-black to-[rgba(212,175,55,0.08)] border-t border-b border-[rgba(212,175,55,0.2)]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 
            className="text-4xl md:text-6xl font-bold mb-6"
            style={{
              background: 'linear-gradient(135deg, #D4AF37, #e6c957)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '2px'
            }}
          >
            Ready to Transform Your Digital Presence?
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Join hundreds of innovative companies that have elevated their brand with 3000 Studios' premium digital solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" className="shadow-lg shadow-yellow-500/50">
              Start Your Journey
            </Button>
            <Button variant="secondary" size="lg">
              View Portfolio
            </Button>
          </div>
        </motion.div>
      </Section>

      <style jsx>{`
        @keyframes titleFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </>
  );
}
