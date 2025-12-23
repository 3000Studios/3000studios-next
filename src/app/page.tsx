export default function Home() {
  return (
    <main className="page">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 via-black to-black" />

        <div className="relative section">
          <div className="container flex flex-col gap-6">
            <h1>Ethereal AI</h1>

            <p className="max-w-prose">
              Premium AI systems built for automation, scale, and revenue.
            </p>

            <div className="flex flex-wrap gap-3">
              <button className="btn-primary">
                Get Started
              </button>

              <button className="rounded-xl border border-neutral-700 px-5 py-3 text-sm">
                Learn More
              </button>
            </div>

            <div className="cta mt-8">
              <div className="cta-title">Built to monetize</div>
              <div className="cta-text">
                Infrastructure designed for subscriptions, automation, and growth.
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
