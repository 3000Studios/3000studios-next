export default function Home() {
  return (
    <main className="page">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 via-black to-black" />

        <div className="relative section">
          <div className="container flex flex-col gap-6">
            <h1 className="text-4xl leading-tight font-bold md:text-6xl">
              Ethereal AI
            </h1>

            <p className="max-w-prose text-neutral-300">
              Premium AI systems built for scale, automation, and revenue.
            </p>

            <div className="flex gap-3">
              <button className="btn-primary">
                Get Started
              </button>

              <button className="rounded-xl border border-neutral-700 px-5 py-3 text-sm">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
