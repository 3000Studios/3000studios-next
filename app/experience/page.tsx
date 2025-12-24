"use client";

<<<<<<< HEAD
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";
import { PageHeader } from "@/components/ui/PageHeader";

export default function ExperiencePage() {
  return (
    <main className="relative min-h-screen">
      <Navigation />

      <PageHeader
        title="EXPERIENCE"
        subtitle="Immersive Digital Environments"
      />

      <div className="max-w-7xl mx-auto px-6 pb-32 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="hyper-glass p-12 rounded-sm">
            <h2 className="font-display text-4xl mb-6">The 3000 Standard</h2>
            <p className="font-sans text-platinum/70 leading-relaxed mb-8 font-light">
              We don't just build websites; we construct digital realities. Our
              experience design philosophy centers on the convergence of
              high-fidelity visuals, fluid motion, and intuitive interaction.
            </p>
            <ul className="space-y-4 font-sans text-sm tracking-wide text-platinum/50">
              <li className="flex items-center gap-4">
                <span className="w-1 h-1 bg-hologram rounded-full"></span>
                WebGL & 3D Integration
              </li>
              <li className="flex items-center gap-4">
                <span className="w-1 h-1 bg-hologram rounded-full"></span>
                Advanced Motion Physics
              </li>
              <li className="flex items-center gap-4">
                <span className="w-1 h-1 bg-hologram rounded-full"></span>
                Spatial Audio Environments
              </li>
            </ul>
          </div>

          <div className="relative h-[400px] w-full overflow-hidden rounded-sm border border-white/10 group">
            <div className="absolute inset-0 bg-gradient-to-br from-hologram/20 to-void z-10"></div>
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 transition-all duration-700"
            >
              <source
                src="https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-network-connection-3126-large.mp4"
                type="video/mp4"
              />
            </video>
            <div className="absolute bottom-8 left-8 z-20">
              <span className="font-mono text-xs text-hologram mb-2 block">
                SYSTEM STATUS
              </span>
              <h3 className="font-display text-3xl">ONLINE</h3>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
=======
export default function Experience() {
  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-5xl font-bold">Experience</h1>
      <p className="mt-4 text-lg text-gray-300">
        Immersive 3000 Studios experience coming alive.
      </p>
    </div>
>>>>>>> origin/copilot/update-main-with-all-branches
  );
}
