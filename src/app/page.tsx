export default function Home() {
  return (
    <main className="page">
      <section className="section">
        <div className="container flex flex-col gap-6">
          <h1 className="text-4xl md:text-6xl">
            Ethereal AI
          </h1>

          <p className="max-w-prose">
            Premium AI systems built for scale.
          </p>

          <button className="btn-primary w-fit">
            Get Started
          </button>
        </div>
      </section>
    </main>
  );
}
