import "./globals.css";
import EventBus from "@/components/os/EventBus";
import PrimeLoop from "@/components/os/PrimeLoop";
import SelfCheckLoop from "@/components/os/SelfCheckLoop";
import FusionEventHandler from "@/components/world/FusionEventHandler";
import MoodMap from "@/components/world/MoodMap";
import ThreeScene from "@/components/world/ThreeScene";
import ParticleField from "@/components/world/ParticleField";
import WorldEngine from "@/components/world/WorldEngine";
import LightingEngine from "@/components/world/LightingEngine";
import EventReact from "@/components/world/EventReact";
import MusicReactiveGlow from "@/components/world/MusicReactiveGlow";
import AudioFX from "@/components/ui/AudioFX";
import MusicEngine from "@/components/ui/MusicEngine";
import PageFX from "@/components/ui/PageFX";
import Ambience from "@/components/ui/Ambience";
import GravityFooter from "@/components/ui/GravityFooter";
import NavBar from "@/components/nav/NavBar";

export const metadata = {
  title: "3000 Studios - Shadow PRIME OS",
  description: "Elite AI-Powered Web Experiences. The Future. Built. Alive.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body className="relative bg-black text-white min-h-screen antialiased">
        <EventBus />
        <PrimeLoop />
        <SelfCheckLoop />
        <FusionEventHandler />
        <MoodMap />
        <ThreeScene />
        <ParticleField />
        <WorldEngine emotion="neutral" />
        <LightingEngine intensity={0.5} />
        <EventReact />
        <MusicReactiveGlow />
        <AudioFX />
        <MusicEngine />
        <PageFX />
        <Ambience />
        <NavBar />
        <main className="relative z-20">{children}</main>
        <GravityFooter />
      </body>
    </html>
  );
}

