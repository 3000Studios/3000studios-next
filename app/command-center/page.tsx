import { Footer } from "@/components/ui/Footer";
import { Navigation } from "@/components/ui/Navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { VoiceCommandCenter } from "@/components/VoiceCommandCenter";

export const metadata = {
  title: "Command Center | 3000 Studios",
  description: "Voice-driven customization hub for 3000 Studios.",
};

export default function CommandCenterPage() {
  return (
    <main className="relative min-h-screen">
      <Navigation />
      <PageHeader
        title="Command Center"
        subtitle="Voice to web: speak, we apply the change"
      />

      <div className="max-w-5xl mx-auto px-6 pb-32 space-y-8">
        <VoiceCommandCenter />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="hyper-glass border border-white/10 rounded-sm p-6">
            <h3 className="text-lg font-display text-white mb-2">How it works</h3>
            <p className="text-sm text-platinum/80 leading-relaxed">
              We run browser-native speech recognition on the client, send the transcript to a lightweight
              interpreter, and apply theme updates immediately. Supported commands include toggling dark or light
              mode and changing the accent color to blue, purple, pink, green, orange, or red.
            </p>
          </div>
          <div className="hyper-glass border border-white/10 rounded-sm p-6">
            <h3 className="text-lg font-display text-white mb-2">Privacy and safety</h3>
            <p className="text-sm text-platinum/80 leading-relaxed">
              Voice data stays in the browser except for the transcript we POST to /api/voice for parsing. No audio
              is uploaded. Input is length-limited and sanitized server-side before applying UI changes.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
