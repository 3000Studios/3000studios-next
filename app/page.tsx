import MarketTicker from "@/components/MarketTicker";
import VideoGrid from "@/components/VideoGrid";
import BlackHoleFooter from "@/components/BlackHoleFooter";

export default function HomePage() {
  return (
    <main style={{ background: "#000", color: "#fff", minHeight: "100vh" }}>
      <section style={{ padding: "6rem", textAlign: "center" }}>
        <h1 style={{ fontSize: "4rem" }}>3000 Studios</h1>
        <p>Shadow Prime is live.</p>
      </section>

      <VideoGrid />
      <MarketTicker />
      <BlackHoleFooter />
    </main>
  );
}
