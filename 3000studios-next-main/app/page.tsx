import FloatingAvatarWrapper from "../components/FloatingAvatarWrapper";
import BackgroundHybrid from "../components/BackgroundHybrid";
import HeroSection from "../components/HeroSection";

export default function Page() {
  return (
    <main className="relative w-full h-screen bg-black overflow-hidden">
      <BackgroundHybrid />
      <div className="absolute inset-0 flex items-center justify-center">
        <FloatingAvatarWrapper />
      </div>
      <HeroSection />
    </main>
  );
}