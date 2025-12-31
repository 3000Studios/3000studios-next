"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import VideoSplash from "./ui/VideoSplash";
import Button from "./ui/Button";
import Card from "./ui/Card";
import Section from "./ui/Section";

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 3D Scroll zoom effect
    const handleScroll = () => {
      if (heroRef.current) {
        const scrolled = window.scrollY;
        const scale = 1 + scrolled * 0.0005;
        heroRef.current.style.transform = `scale(${scale})`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <VideoSplash />
      
      {/* Hero Section */}
      <Section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black">
        <div
          ref={heroRef}
          className="text-center transition-transform duration-100 ease-out"
        >
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400 bg-clip-text text-transparent"
            style={{
              textShadow: "0 0 80px rgba(250, 204, 21, 0.3)",
            }}
          >
            3000 Studios
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
          >
            Premium Homepage Experience
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button variant="primary" size="lg">
              Explore Our Work
            </Button>
            <Button variant="secondary" size="lg">
              Get Started
            </Button>
          </motion.div>
        </div>

        {/* Marble Background Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-300 to-white mix-blend-overlay" />
        </div>
      </Section>

      {/* Features Grid */}
      <Section className="bg-black">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent"
        >
          Our Services
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "AI-Powered Solutions",
              desc: "Cutting-edge artificial intelligence implementation for your business needs",
            },
            {
              title: "Live Streaming",
              desc: "Professional broadcasting and streaming infrastructure",
            },
            {
              title: "Web Development",
              desc: "Premium custom websites and web applications",
            },
            {
              title: "3D Experiences",
              desc: "Immersive 3D visualizations and interactive experiences",
            },
            {
              title: "E-Commerce",
              desc: "Scalable online stores with seamless payment integration",
            },
            {
              title: "Brand Strategy",
              desc: "Comprehensive branding and digital marketing solutions",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card gradient className="h-full hover:scale-105 transition-transform duration-300">
                <h3 className="text-2xl font-bold text-yellow-400 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-300">{feature.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Stats Section */}
      <Section className="bg-gradient-to-b from-black via-yellow-950/10 to-black">
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
              <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-2">
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
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent"
        >
          What Clients Say
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              quote: "3000 Studios transformed our digital presence completely. Outstanding work!",
              author: "Sarah Johnson",
              role: "CEO, TechCorp",
            },
            {
              quote: "Professional, innovative, and exceeded all expectations. Highly recommended!",
              author: "Michael Chen",
              role: "Founder, StartupX",
            },
            {
              quote: "The best creative studio we've ever worked with. Simply amazing results.",
              author: "Emily Rodriguez",
              role: "Marketing Director",
            },
          ].map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <Card className="h-full">
                <p className="text-gray-300 italic mb-6">"{testimonial.quote}"</p>
                <div className="border-t border-yellow-500/20 pt-4">
                  <p className="font-bold text-yellow-400">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="bg-gradient-to-b from-black to-yellow-950/20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Let's create something extraordinary together
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg">
              Contact Us
            </Button>
            <Button variant="secondary" size="lg">
              View Portfolio
            </Button>
          </div>
        </motion.div>
      </Section>
    </>
  );
}
