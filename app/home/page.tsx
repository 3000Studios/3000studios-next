import { AudioBackground } from '@/components/AudioBackground';
import { FeaturesSection } from '@/components/FeaturesSection';
import { LuxuryGallery } from '@/components/LuxuryGallery';
import { ModernHero } from '@/components/ModernHero';
import { Footer } from '@/components/ui/Footer';
import { Navigation } from '@/components/ui/Navigation';

const galleryImages = [
  {
    id: '1',
    publicId: 'sample/luxury-bedroom',
    title: 'Luxury Suite',
    description: 'Experience ultimate comfort and elegance',
  },
  {
    id: '2',
    publicId: 'sample/fine-dining',
    title: 'Fine Dining',
    description: 'Culinary excellence at its finest',
  },
  {
    id: '3',
    publicId: 'sample/spa',
    title: 'Wellness Spa',
    description: 'Rejuvenate your mind and body',
  },
  {
    id: '4',
    publicId: 'sample/pool',
    title: 'Infinity Pool',
    description: 'Breathtaking views and refreshing waters',
  },
  {
    id: '5',
    publicId: 'sample/conference',
    title: 'Conference Center',
    description: 'World-class meeting facilities',
  },
  {
    id: '6',
    publicId: 'sample/luxury-lounge',
    title: 'Signature Lounge',
    description: 'Sophisticated ambiance and impeccable service',
  },
];

export default function HomePage() {
  return (
    <main className="relative bg-black">
      {/* Auto-play Music */}
      <AudioBackground publicId="4d103589a54319c127e26fc4c1945714" autoplay={true} />

      <Navigation />

      {/* Full-screen background video with page content overlay */}
      <div className="relative min-h-screen">
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

        <ModernHero
          title="3000 Studios"
          subtitle="Where Innovation Meets Luxury"
          cta="Home"
          backgroundVideo="https://res.cloudinary.com/dj92eb97f/video/upload/v1766986144/3D_tunnel_to_purple_d7cofd.mp4"
        />
      </div>

      <div id="gallery">
        <LuxuryGallery images={galleryImages} title="Experience Excellence" />
      </div>

      <div id="features">
        <FeaturesSection />
      </div>

      <Footer />
    </main>
  );
}
