export default function ExperiencePage() {
  const experiences = [
    { title: "AI Systems", description: "Autonomous workflow engines" },
    { title: "Security", description: "Encrypted Vault + Watchdogs" },
    { title: "UI/UX", description: "4D Next.js experiences" },
  ];

  return (
    <div className="min-h-screen p-10 text-white">
      <h1 className="text-5xl font-black mb-8">Experience</h1>
      <div className="space-y-6">
        {experiences.map((exp, i) => (
          <div key={i} className="p-6 glass rounded-xl">
            <h2 className="text-3xl font-bold">{exp.title}</h2>
            <p className="text-lg text-platinum">{exp.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
