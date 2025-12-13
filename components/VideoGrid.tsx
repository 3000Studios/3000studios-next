export default function VideoGrid() {
  return (
    <section style={{ padding: "4rem", background: "#000" }}>
      <h2 style={{ color: "#fff", fontSize: "2rem" }}>Latest Drops</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "2rem" }}>
        <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" allowFullScreen />
        <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" allowFullScreen />
        <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" allowFullScreen />
      </div>
    </section>
  );
}
