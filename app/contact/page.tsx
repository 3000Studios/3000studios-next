export default function ContactPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="glass-panel p-12 hover-pop">
          <h1 className="text-6xl font-extrabold mb-8 text-3d animate-glow">Contact</h1>
          <p className="text-xl text-gold-gradient leading-relaxed mb-6">
            Reach us at contact@3000studios.com. A full form and CRM integration will be added here.
          </p>
          <a href="mailto:contact@3000studios.com" className="btn-gold inline-block mt-6">
            Email Us
          </a>
        </div>
      </div>
    </main>
  );
}
