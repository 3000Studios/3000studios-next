"use client";
// Copyright (c) 2025 NAME.
// All rights reserved.
// Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.

import { useState } from "react";

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
        "Multi-platform support",
        "Custom integrations",
        "24/7 AI assistance",
        "Enterprise features",
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
        "Analytics dashboard",
        "Recording features",
        "Monetization tools",
        "Premium support",
      ],
      image: "📡",
    },
  ];

  const handlePurchase = (product: Product) => {
    const paypalEmail = "mr.jwswain@gmail.com";
    const paypalUrl = `https://www.paypal.com/paypalme/mrjwswain/${product.price}`;

    window.open(paypalUrl, "_blank");

    alert(
      `Opening PayPal for ${product.name} ($${product.price}). After payment, contact mr.jwswain@gmail.com for delivery.`,
    );
  };

  return (
    <div className="min-h-screen bg-corporate-charcoal text-white font-corporate pt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-corporate-gold mb-4">
            3000 Studios Store
          </h1>
          <p className="text-xl text-corporate-silver">
            Premium tools and services for modern developers
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-corporate-navy border border-corporate-steel rounded-2xl p-8 hover:border-corporate-gold transition-all hover:shadow-2xl"
            >
              <div className="text-6xl mb-4 text-center">{product.image}</div>
              <h2 className="text-3xl font-heading font-bold text-corporate-gold mb-3">
                {product.name}
              </h2>
              <p className="text-corporate-silver mb-4">
                {product.description}
              </p>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-3">
                  Features:
                </h3>
                <ul className="space-y-2">
                  {product.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-sm text-corporate-silver"
                    >
                      <svg
                        className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-corporate-steel">
                <div>
                  <span className="text-3xl font-bold font-heading text-white">
                    ${product.price}
                  </span>
                  <span className="text-corporate-silver ml-2">USD</span>
                </div>
                <button
                  onClick={() => handlePurchase(product)}
                  className="bg-gold-gradient text-corporate-navy px-6 py-3 rounded-lg font-bold hover:scale-105 transition-transform shadow-lg"
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-corporate-navy border border-corporate-steel rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-heading font-bold text-corporate-gold mb-4">
            Payment Information
          </h2>
          <p className="text-corporate-silver mb-4">
            All purchases are processed securely through PayPal
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-corporate-silver">
            <svg
              className="w-5 h-5 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            <span>
              Secure payments via PayPal • Contact: mr.jwswain@gmail.com
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
