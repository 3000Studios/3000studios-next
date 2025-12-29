import { FeaturesSection } from "@/components/FeaturesSection";
import { LuxuryGallery } from "@/components/LuxuryGallery";
import { ModernHero } from "@/components/ModernHero";
import { Navigation } from "@/components/ui/Navigation";
import { AudioBackground } from "@/components/AudioBackground";
import { Footer } from "@/components/ui/Footer";

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

export default function Home() {
  return (
    <main className="relative bg-black">
      <AudioBackground publicId="4d103589a54319c127e26fc4c1945714" />
      <Navigation />
      <ModernHero
        title="3000 Studios"
        subtitle="Where Innovation Meets Luxury"
        cta="Book Now"
        backgroundVideo="b9ed367db5fcec95f16e6b105e5dec6f"
      />
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
