import { ModernHero } from "@/components/ModernHero";
import { LuxuryGallery } from "@/components/LuxuryGallery";
import { FeaturesSection } from "@/components/FeaturesSection";
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
      <ModernHero
        title="3000 Studios"
        subtitle="Where Innovation Meets Luxury"
        cta="Book Now"
        backgroundImage="sample/luxury-hotel"
      />
      <LuxuryGallery images={galleryImages} title="Experience Excellence" />
      <FeaturesSection />
      <Footer />
    </main>
  );
}
