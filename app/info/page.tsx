/**
 * Info Page - Combined About, Contact, JWS, and Vendors content
 */

'use client';

import { AlertCircle, Check, Loader2, Lock, Mail, MapPin, Phone, Send } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

// JWS Password
const JWS_PASSWORD = '88888888';

export default function InfoPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    budget: '',
    message: '',
    newsletter: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // JWS state
  const [jwsPassword, setJwsPassword] = useState('');
  const [jwsError, setJwsError] = useState('');
  const [isJwsAuthenticated, setIsJwsAuthenticated] = useState(false);
  const router = useRouter();

  // Particle background effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Create particles
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        color: Math.random() > 0.5 ? '#D4AF37' : '#1e3a5f',
      });
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        // Connect nearby particles
        particles.slice(i + 1).forEach((p2) => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(212, 175, 55, ${1 - dist / 100})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    if (formData.message.length < 20) newErrors.message = 'Message must be at least 20 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      setSubmitStatus('error');
      setSubmitMessage('Please fix the errors above');
      return;
    }
    setIsSubmitting(true);
    setSubmitMessage('');
    setSubmitStatus('idle');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Failed to send message');
      setSubmitStatus('success');
      setSubmitMessage("Thank you! We'll get back to you within 24 hours.");
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        budget: '',
        message: '',
        newsletter: true,
      });
      setErrors({});
    } catch {
      setSubmitStatus('error');
      setSubmitMessage('Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleJwsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (jwsPassword === JWS_PASSWORD) {
      setIsJwsAuthenticated(true);
      setJwsError('');
    } else {
      setJwsError('Invalid password');
      setJwsPassword('');
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Particle Background */}
      <canvas ref={canvasRef} className="fixed inset-0 z-0" />

      {/* Gold Border Overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-40 border-4 border-[#D4AF37]"
        style={{ boxShadow: 'inset 0 0 30px rgba(212, 175, 55, 0.3)' }}
      />

      <main className="relative z-10 pt-24 pb-16">
        {/* ========== ABOUT SECTION ========== */}
        <section id="about" className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-7xl font-bold mb-4">
              <span className="text-[#D4AF37]">About</span> Us
            </h2>
            <p className="text-xl text-gray-400">Where creativity meets innovation</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            <div className="backdrop-blur-md bg-white/5 border border-[#D4AF37]/30 rounded-2xl p-8 md:p-12">
              <h3 className="text-3xl font-bold text-[#D4AF37] mb-6">Our Story</h3>
              <p className="text-lg text-gray-300 mb-4 leading-relaxed">
                3000 Studios is a creative powerhouse dedicated to pushing the boundaries of digital
                art, development, and design. We specialize in creating stunning visual experiences,
                innovative code solutions, and premium digital products.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                Our team combines technical expertise with artistic vision to deliver exceptional
                results that inspire and engage.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['Creative', 'Technical', 'Premium'].map((title, i) => (
                <div
                  key={i}
                  className="backdrop-blur-md bg-white/5 border border-[#D4AF37]/30 rounded-2xl p-8 text-center hover:bg-white/10 transition-all"
                >
                  <h4 className="text-2xl font-bold text-[#D4AF37] mb-2">{title}</h4>
                  <p className="text-gray-400">
                    {i === 0 && 'Innovative designs and artistic excellence'}
                    {i === 1 && 'Cutting-edge development solutions'}
                    {i === 2 && 'High-quality digital products'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== CONTACT SECTION ========== */}
        <section id="contact" className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-7xl font-bold mb-4">
              <span className="text-[#D4AF37]">Get in</span> Touch
            </h2>
            <p className="text-xl text-gray-400">
              Have a project in mind? Let&apos;s create something amazing!
            </p>
          </div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center">
                    <Mail className="text-black" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold">Email</h4>
                    <a
                      href="mailto:contact@3000studios.com"
                      className="text-gray-400 hover:text-[#D4AF37]"
                    >
                      contact@3000studios.com
                    </a>
                  </div>
                </div>
              </div>
              <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <Phone className="text-white" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold">Phone</h4>
                    <a href="tel:+15550003000" className="text-gray-400 hover:text-[#D4AF37]">
                      +1 (555) 000-3000
                    </a>
                  </div>
                </div>
              </div>
              <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
                    <MapPin className="text-white" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold">Location</h4>
                    <p className="text-gray-400">United States</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2 backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {submitStatus !== 'idle' && (
                  <div
                    className={`p-4 rounded-lg flex items-center gap-3 ${submitStatus === 'success' ? 'bg-green-900/30 border border-green-500/50' : 'bg-red-900/30 border border-red-500/50'}`}
                  >
                    {submitStatus === 'success' ? (
                      <Check size={20} className="text-green-400" />
                    ) : (
                      <AlertCircle size={20} className="text-red-400" />
                    )}
                    <p className={submitStatus === 'success' ? 'text-green-200' : 'text-red-200'}>
                      {submitMessage}
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Name *</label>
                    <input
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-gray-900 border ${errors.name ? 'border-red-500' : 'border-gray-700'} rounded-lg text-white focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent`}
                      placeholder="John Doe"
                    />
                    {errors.name && <p className="mt-1 text-red-400 text-sm">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-gray-900 border ${errors.email ? 'border-red-500' : 'border-gray-700'} rounded-lg text-white focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent`}
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className="mt-1 text-red-400 text-sm">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Message *</label>
                  <textarea
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-gray-900 border ${errors.message ? 'border-red-500' : 'border-gray-700'} rounded-lg text-white focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent resize-none`}
                    placeholder="Tell us about your project..."
                  />
                  {errors.message && <p className="mt-1 text-red-400 text-sm">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#D4AF37] text-black font-bold rounded-lg hover:bg-[#FFD700] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    <Send size={20} />
                  )}
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* ========== JWS SECTION ========== */}
        <section id="jws" className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-7xl font-bold mb-4">
              <span className="text-[#D4AF37]">JWS</span> Protected Area
            </h2>
          </div>

          <div className="max-w-md mx-auto">
            {isJwsAuthenticated ? (
              <div className="backdrop-blur-md bg-white/5 border border-[#D4AF37]/30 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="text-black" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-[#D4AF37] mb-2">Welcome, Boss Man J!</h3>
                <p className="text-gray-400 mb-6">Access granted to protected area</p>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => router.push('/matrix')}
                    className="p-4 bg-[#D4AF37] text-black rounded-lg font-bold hover:bg-[#FFD700]"
                  >
                    🎛️ Matrix Control
                  </button>
                  <button
                    onClick={() => router.push('/store')}
                    className="p-4 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-500"
                  >
                    🛍️ Store
                  </button>
                </div>
              </div>
            ) : (
              <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lock className="text-black" size={32} />
                  </div>
                  <p className="text-gray-400">Enter password to access</p>
                </div>
                <form onSubmit={handleJwsSubmit} className="space-y-4">
                  {jwsError && (
                    <div className="p-3 bg-red-900/30 border border-red-500/50 rounded-lg text-red-200 text-sm flex items-center gap-2">
                      <AlertCircle size={18} />
                      {jwsError}
                    </div>
                  )}
                  <input
                    type="password"
                    value={jwsPassword}
                    onChange={(e) => setJwsPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-[#D4AF37]"
                    placeholder="Enter password"
                  />
                  <button
                    type="submit"
                    className="w-full py-3 bg-[#D4AF37] text-black font-bold rounded-lg hover:bg-[#FFD700]"
                  >
                    Access Protected Area
                  </button>
                </form>
              </div>
            )}
          </div>
        </section>

        {/* ========== VENDORS SECTION ========== */}
        <section id="vendors" className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-7xl font-bold mb-4">
              <span className="text-[#D4AF37]">Vendor</span> Platform
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link
                href="/vendors"
                className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6 hover:border-[#D4AF37] transition-all block"
              >
                <h4 className="text-xl font-bold text-[#D4AF37]">Vendor Sign Up</h4>
                <p className="text-gray-400 mt-2">Submit your feed and join our platform</p>
              </Link>
              <Link
                href="/api/vendors/products?vendor=custom"
                className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6 hover:border-[#D4AF37] transition-all block"
              >
                <h4 className="text-xl font-bold text-[#D4AF37]">Browse Products</h4>
                <p className="text-gray-400 mt-2">View all ingested vendor products</p>
              </Link>
            </div>

            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4">Features</h3>
              <ul className="space-y-3 text-gray-300">
                <li>✅ Multi-vendor product ingestion (CJ, ShareASale, Amazon, Shopify)</li>
                <li>✅ Auto-pricing with margin guardrails</li>
                <li>✅ AI product ranking and relevance scoring</li>
                <li>✅ Commission tracking and analytics</li>
                <li>✅ Vendor self-signup with multiple models</li>
                <li>✅ Dropship fulfillment webhooks and routing</li>
                <li>✅ AI-generated product pages with SEO schema</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
