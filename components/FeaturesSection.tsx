'use client';

import { motion } from 'framer-motion';
import { Sparkles, Zap, Globe, Shield } from 'lucide-react';

const features = [
  {
    icon: Sparkles,
    title: 'Premium Experience',
    description: 'Luxury hospitality meets cutting-edge technology',
  },
  {
    icon: Zap,
    title: 'Performance First',
    description: 'Lightning-fast load times and seamless interactions',
  },
  {
    icon: Globe,
    title: 'Global Reach',
    description: 'Accessible from anywhere in the world',
  },
  {
    icon: Shield,
    title: 'Secure & Trusted',
    description: 'Enterprise-grade security and reliability',
  },
];

export function FeaturesSection() {
  return (
    <section className="w-full bg-black py-24 px-4 border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Why Choose Us
          </h2>
          <p className="text-gray-400 text-lg">
            Experience the pinnacle of modern luxury
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="p-8 bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-lg hover:border-gray-700 transition-all duration-300"
              >
                <div className="mb-6">
                  <Icon className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
