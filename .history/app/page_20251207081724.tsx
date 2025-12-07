// app/page.tsx  
"use client";

import ShadowAvatar3D from "@/components/avatar/ShadowAvatar3D";
import ShadowChat from "@/components/avatar/ShadowChat";
import ParticleField from "@/components/world/ParticleField";

export default function HomePage() {
  return (
    <main className="relative w-full min-h-screen overflow-hidden bg-black">
      {/* Particle Background */}
      <ParticleField />

      {/* Hero Section with Avatar */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-20">
        <div className="max-w-6xl w-full text-center space-y-8">
          <h1 className="text-6xl md:text-7xl lg:text-9xl font-black bg-gradient-to-r from-gold via-sapphire to-gold bg-clip-text text-transparent drop-shadow-2xl animate-pulse">
            3000 STUDIOS
          </h1>
          <p className="text-2xl md:text-3xl text-sapphire/80 mb-8">
            The Future. Built. Alive.
          </p>

          {/* 3D Avatar */}
          <div className="w-full max-w-4xl mx-auto">
            <ShadowAvatar3D />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <a
              href="/matrix"
              className="px-8 py-4 bg-gradient-to-r from-gold to-yellow-600 rounded-xl font-bold text-black hover:shadow-2xl hover:shadow-gold/50 transition-all duration-300 transform hover:scale-105"
            >
              🔮 Enter THE MATRIX
            </a>
            <a
              href="/store"
              className="px-8 py-4 bg-black border-2 border-sapphire rounded-xl font-bold text-sapphire hover:bg-sapphire/10 transition-all duration-300"
            >
              🛒 Explore Store
            </a>
          </div>
        </div>
      </section>

      {/* Chat Interface */}
      <section className="relative z-10 py-12">
        <ShadowChat />
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