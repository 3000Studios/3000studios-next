import { Navigation } from "@/components/ui/Navigation";
import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/home/Marquee";
import { Services } from "@/components/home/Services";
import { Work } from "@/components/home/Work";
import { CTA } from "@/components/home/CTA";
import { Footer } from "@/components/ui/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Navigation />
      <Hero />
      <Marquee />
      <Services />
      <Work />
      <CTA />
      <Footer />
    </main>
  );
}
