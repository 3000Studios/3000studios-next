// app/page.tsx  
"use client";

import React from "react";

export default function HomePage() {
  return (
    <main className="relative w-full min-h-screen overflow-hidden bg-corporate-charcoal">
      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-20">
        <div className="max-w-4xl text-center space-y-8">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-corporate-gold drop-shadow-lg">
            Welcome to 3000 Studios
          </h1>
          <p className="text-2xl md:text-3xl text-corporate-silver">
            Elite AI-powered web experiences. Built for bosses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <a
              href="/command-center"
              className="px-8 py-4 bg-gradient-to-r from-corporate-gold to-corporate-bronze rounded-lg font-bold text-corporate-navy hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              Launch Command Center
            </a>
            <a
              href="/shadow/avatar"
              className="px-8 py-4 bg-corporate-navy border-2 border-corporate-gold rounded-lg font-bold text-corporate-gold hover:bg-corporate-gold/10 transition-all duration-300"
            >
              Meet Shadow Avatar
            </a>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="relative z-10 py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold text-center mb-12 text-corporate-gold font-corporate">
          What We Do
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: "Autonomous DevOps",
              description: "Automated deployment and CI/CD pipelines for seamless updates",
              icon: "⚙️"
            },
            {
              title: "Elite UI/UX",
              description: "State-of-the-art interface design with interactive animations",
              icon: "✨"
            },
            {
              title: "Monetization",
              description: "PayPal, subscriptions, affiliate programs, and crypto integration",
              icon: "💰"
            },
            {
              title: "Enterprise Security",
              description: "Bank-grade encryption, compliance, and stability",
              icon: "🔒"
            }
          ].map((item, i) => (
            <div
              key={i}
              className="bg-corporate-navy/50 border border-corporate-steel/50 rounded-2xl p-8 hover:border-corporate-gold transition-all duration-300 hover:shadow-2xl backdrop-blur-sm"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold text-corporate-gold mb-3">{item.title}</h3>
              <p className="text-corporate-silver">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20 px-4 md:px-8 bg-corporate-charcoal/40 backdrop-blur-sm">
        <h2 className="text-5xl md:text-6xl font-bold text-center mb-12 text-corporate-gold font-corporate">
          Premium Features
        </h2>
        
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            "Shadow AI Avatar",
            "Live Streaming",
            "Command Center",
            "Analytics Dashboard",
            "Collaborator Tools",
            "Dynamic Store",
          ].map((feature, i) => (
            <div
              key={i}
              className="bg-gradient-to-br from-corporate-steel/30 to-corporate-navy/30 border border-corporate-gold/20 rounded-xl p-6 hover:border-corporate-gold/60 transition-all duration-300 text-center"
            >
              <p className="text-lg font-semibold text-corporate-silver hover:text-corporate-gold transition-colors">
                {feature}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-4 md:px-8 max-w-7xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-corporate-gold">
          Ready to Level Up?
        </h2>
        <p className="text-xl text-corporate-silver mb-10 max-w-2xl mx-auto">
          Join the elite studios using cutting-edge AI and automation to transform their digital presence.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="/projects"
            className="px-8 py-4 bg-corporate-gold text-corporate-navy rounded-lg font-bold hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            View Our Work
          </a>
          <a
            href="/store"
            className="px-8 py-4 bg-corporate-navy border-2 border-corporate-gold rounded-lg font-bold text-corporate-gold hover:bg-corporate-gold/10 transition-all duration-300"
          >
            Explore Store
          </a>
        </div>
      </section>
    </main>
  );
}