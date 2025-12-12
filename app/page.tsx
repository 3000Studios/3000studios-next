export default function HomePage() {
  return (
    <main style={{
      minHeight: "100vh",
      background: "black",
      color: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "system-ui"
    }}>
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "3rem" }}>3000 Studios</h1>
        <p style={{ opacity: 0.8 }}>Shadow Prime is live.</p>
      </div>
    </main>
  );
}
