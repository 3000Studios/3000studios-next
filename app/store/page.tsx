'use client';

import { Footer } from '@/components/ui/Footer';
import { Navigation } from '@/components/ui/Navigation';
import { PageHeader } from '@/components/ui/PageHeader';
import MediaGrid from '@/components/MediaGrid';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  image: string;
}

export default function StorePage() {
  const products: Product[] = [
    {
      id: 'site-printer-pro',
      name: 'Site Printer Pro',
      description:
        'Professional website printing and PDF generation tool. Perfect for archiving, documentation, and offline access.',
      price: 49.99,
      features: [
        'Print any website to high-quality PDF',
        'Batch processing support',
        'Custom branding options',
        'Automatic link preservation',
      ],
      image: '🖨️',
    },
    {
      id: 'shadow-ai-suite',
      name: 'Shadow AI Suite',
      description: 'Complete AI-powered development and automation toolkit.',
      price: 99.99,
      features: [
        'Voice command interface',
        'Automated deployments',
        'AI code generation',
        'Real-time analytics',
      ],
      image: '🤖',
    },
    {
      id: '3d-avatar-pack',
      name: '3D Avatar Pack',
      description: 'Premium 3D avatars with voice-reactive animations.',
      price: 29.99,
      features: [
        '10+ premium avatars',
        'Voice-reactive animations',
        'Customizable expressions',
        'Multiple mood states',
      ],
      image: '👤',
    },
    {
      id: 'streaming-pro',
      name: 'Streaming Pro',
      description: 'Professional live streaming platform with advanced features.',
      price: 79.99,
      features: [
        'HD streaming support',
        'Multi-platform broadcast',
        'Custom branding',
        'Chat integration',
      ],
      image: '📡',
    },
  ];

  const categoryFeatures = [
    {
      id: '1',
      type: 'image' as const,
      src: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop',
      alt: 'Development Tools',
      title: 'Development Tools',
      description: 'Powerful frameworks for modern development',
      ratio: 'landscape' as const,
    },
    {
      id: '2',
      type: 'image' as const,
      src: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop',
      alt: 'AI & Automation',
      title: 'AI & Automation',
      description: 'Intelligent solutions for efficiency',
      ratio: 'landscape' as const,
    },
    {
      id: '3',
      type: 'image' as const,
      src: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
      alt: 'Design Assets',
      title: 'Design Assets',
      description: 'Premium visual components and templates',
      ratio: 'landscape' as const,
    },
  ];

  const handlePurchase = (product: Product) => {
    const paypalUrl = `https://www.paypal.com/paypalme/mrjwswain/${product.price}`;
    window.open(paypalUrl, '_blank');
    alert(
      `Opening PayPal for ${product.name} ($${product.price}). After payment, contact mr.jwswain@gmail.com for delivery.`
    );
  };

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

      <PageHeader title="STORE" subtitle="Digital Assets & Tools" />

      <div className="max-w-7xl mx-auto px-6 pb-32 relative z-10">
        {/* Featured Categories */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl mb-4">Featured Categories</h2>
            <p className="font-sans text-platinum/60">
              Explore our curated collections of premium digital assets
            </p>
          </div>
          <MediaGrid items={categoryFeatures} columns={3} gap="lg" />
        </div>

        {/* Product Grid */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl mb-4">All Products</h2>
            <p className="font-sans text-platinum/60">
              Professional tools and assets for creators and developers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="hyper-glass p-8 rounded-sm group hover:border-hologram/30 transition-colors duration-500 hover:-translate-y-2 transform transition-transform duration-500"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex justify-between items-start mb-8">
                  <div className="text-5xl bg-gradient-to-br from-hologram/20 to-hologram/5 w-20 h-20 flex items-center justify-center rounded-lg backdrop-blur-sm border border-white/10 group-hover:border-hologram/30 transition-colors">
                    {product.image}
                  </div>
                  <div className="text-right">
                    <span className="font-display text-4xl text-hologram group-hover:text-white transition-colors">
                      ${product.price}
                    </span>
                    <span className="block font-sans text-[10px] text-platinum/50 tracking-widest mt-2">
                      USD
                    </span>
                  </div>
                </div>

                <h3 className="font-display text-2xl mb-4 group-hover:text-hologram transition-colors">
                  {product.name}
                </h3>
                <p className="font-sans text-sm text-platinum/60 mb-8 leading-relaxed font-light min-h-12">
                  {product.description}
                </p>

                <ul className="space-y-3 mb-8 border-t border-white/5 pt-6">
                  {product.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 font-sans text-xs text-platinum/70 group-hover:text-platinum/90 transition-colors"
                    >
                      <span className="w-1.5 h-1.5 bg-hologram rounded-full group-hover:bg-white transition-colors"></span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handlePurchase(product)}
                  className="w-full py-4 border border-hologram/50 hover:bg-hologram hover:text-black text-hologram transition-all duration-300 font-sans text-xs tracking-[0.2em] uppercase font-bold rounded-sm group-hover:shadow-lg group-hover:shadow-hologram/30"
                >
                  Purchase License
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="relative overflow-hidden rounded-sm hyper-glass p-12 mb-20">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-10"
          >
            <source
              src="https://videos.pexels.com/video-files/3048997/3048997-hd_1920_1080_30fps.mp4"
              type="video/mp4"
            />
          </video>

          <div className="relative z-10">
            <h2 className="font-display text-4xl text-center mb-12">Why Choose Our Store?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: '⚡',
                  title: 'Fast Delivery',
                  desc: 'Instant access to all digital products after purchase',
                },
                {
                  icon: '🔒',
                  title: 'Secure',
                  desc: 'Industry-leading security and privacy protection',
                },
                {
                  icon: '🎯',
                  title: 'Premium Quality',
                  desc: 'Hand-crafted assets and tools tested by experts',
                },
              ].map((item, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <h3 className="font-display text-xl mb-3">{item.title}</h3>
                  <p className="text-platinum/70">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Support Section */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-sm p-12 text-center">
          <h3 className="font-display text-3xl mb-6">Need Assistance?</h3>
          <p className="text-platinum/70 mb-8 max-w-2xl mx-auto">
            Our support team is here to help. Contact us for product recommendations, technical
            assistance, or custom solutions.
          </p>
          <a
            href="mailto:support@3000studios.com"
            className="inline-block px-8 py-4 bg-gradient-to-r from-hologram to-hologram/50 rounded-sm font-sans font-bold tracking-widest hover:shadow-lg hover:shadow-hologram/50 transition-all duration-300 transform hover:scale-105"
          >
            Contact Support
          </a>
        </div>
      </div>

      <Footer />
    </main>
  );
}
