"use client";

import { useState } from "react";
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";
import { PageHeader } from "@/components/ui/PageHeader";

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
      id: "site-printer-pro",
      name: "Site Printer Pro",
      description:
        "Professional website printing and PDF generation tool. Perfect for archiving, documentation, and offline access.",
      price: 49.99,
      features: [
        "Print any website to high-quality PDF",
        "Batch processing support",
        "Custom branding options",
        "Automatic link preservation",
      ],
      image: "🖨️",
    },
    {
      id: "shadow-ai-suite",
      name: "Shadow AI Suite",
      description: "Complete AI-powered development and automation toolkit.",
      price: 99.99,
      features: [
        "Voice command interface",
        "Automated deployments",
        "AI code generation",
        "Real-time analytics",
      ],
      image: "🤖",
    },
    {
      id: "3d-avatar-pack",
      name: "3D Avatar Pack",
      description: "Premium 3D avatars with voice-reactive animations.",
      price: 29.99,
      features: [
        "10+ premium avatars",
        "Voice-reactive animations",
        "Customizable expressions",
        "Multiple mood states",
      ],
      image: "👤",
    },
    {
      id: "streaming-pro",
      name: "Streaming Pro",
      description:
        "Professional live streaming platform with advanced features.",
      price: 79.99,
      features: [
        "HD streaming support",
        "Multi-platform broadcast",
        "Custom branding",
        "Chat integration",
      ],
      image: "📡",
    },
  ];

  const handlePurchase = (product: Product) => {
    const paypalUrl = `https://www.paypal.com/paypalme/mrjwswain/${product.price}`;
    window.open(paypalUrl, "_blank");
    alert(
      `Opening PayPal for ${product.name} ($${product.price}). After payment, contact mr.jwswain@gmail.com for delivery.`,
    );
  };

  return (
    <main className="relative min-h-screen">
      <Navigation />
      
      <PageHeader 
        title="STORE" 
        subtitle="Digital Assets & Tools" 
      />

      <div className="max-w-7xl mx-auto px-6 pb-32 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {products.map((product, index) => (
                <div 
                    key={product.id} 
                    className="hyper-glass p-8 rounded-sm group hover:border-hologram/30 transition-colors duration-500"
                    style={{ animationDelay: `${index * 100}ms` }}
                >
                    <div className="flex justify-between items-start mb-8">
                        <div className="text-4xl bg-white/5 w-16 h-16 flex items-center justify-center rounded-full backdrop-blur-sm">
                            {product.image}
                        </div>
                        <div className="text-right">
                            <span className="font-display text-3xl text-white">${product.price}</span>
                            <span className="block font-sans text-[10px] text-platinum/50 tracking-widest">USD</span>
                        </div>
                    </div>

                    <h3 className="font-display text-2xl mb-4 group-hover:text-hologram transition-colors">{product.name}</h3>
                    <p className="font-sans text-sm text-platinum/60 mb-8 leading-relaxed font-light h-12">
                        {product.description}
                    </p>

                    <ul className="space-y-3 mb-8 border-t border-white/5 pt-6">
                        {product.features.map((feature, i) => (
                            <li key={i} className="flex items-center gap-3 font-sans text-xs text-platinum/70">
                                <span className="w-1 h-1 bg-hologram rounded-full"></span>
                                {feature}
                            </li>
                        ))}
                    </ul>

                    <button 
                        onClick={() => handlePurchase(product)}
                        className="w-full py-4 border border-white/20 hover:bg-white hover:text-black transition-all duration-300 font-sans text-xs tracking-[0.2em] uppercase"
                    >
                        Purchase License
                    </button>
                </div>
            ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
