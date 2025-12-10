'use client';

import Navbar from '../components/Navbar';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission - ready for backend integration
    setSubmitMessage('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    // Clear message after 5 seconds
    setTimeout(() => setSubmitMessage(''), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Navbar />
      <div className="relative min-h-screen pt-16">
        <div className="fixed inset-0 pointer-events-none z-40 border-4 border-[#D4AF37]" style={{ boxShadow: 'inset 0 0 30px rgba(212, 175, 55, 0.3)' }}></div>
        
        <main className="relative z-10 container mx-auto px-4 py-12">
          <section className="text-center py-12">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
              <span className="text-[#D4AF37]">Contact</span> Us
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Let&apos;s bring your vision to life
            </p>
          </section>

          <section className="max-w-4xl mx-auto py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gradient-to-br from-gray-900/50 to-black/50 p-8 rounded-lg border-2 border-[#D4AF37] glossy-overlay">
                <h2 className="text-3xl font-bold text-white mb-6">Get in Touch</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="text-[#D4AF37] text-2xl mr-4">📧</div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">Email</h3>
                      <p className="text-gray-300">contact@3000studios.com</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="text-[#D4AF37] text-2xl mr-4">💼</div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">Business</h3>
                      <p className="text-gray-300">business@3000studios.com</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="text-[#D4AF37] text-2xl mr-4">🌐</div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">Social</h3>
                      <p className="text-gray-300">Follow us on social media</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-900/50 to-black/50 p-8 rounded-lg border-2 border-[#D4AF37] glossy-overlay">
                <h2 className="text-3xl font-bold text-white mb-6">Send a Message</h2>
                
                {submitMessage && (
                  <div className="mb-6 p-4 bg-green-900/30 border-2 border-green-500 rounded-lg">
                    <p className="text-green-300 font-medium">{submitMessage}</p>
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-white mb-2 font-medium">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-gray-800 border-2 border-[#D4AF37] rounded-lg text-white focus:outline-none focus:border-[#FFD700] transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-white mb-2 font-medium">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-gray-800 border-2 border-[#D4AF37] rounded-lg text-white focus:outline-none focus:border-[#FFD700] transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-white mb-2 font-medium">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-gray-800 border-2 border-[#D4AF37] rounded-lg text-white focus:outline-none focus:border-[#FFD700] transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-white mb-2 font-medium">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-4 py-2 bg-gray-800 border-2 border-[#D4AF37] rounded-lg text-white focus:outline-none focus:border-[#FFD700] transition-colors resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-[#D4AF37] text-black font-bold rounded-lg hover:bg-[#FFD700] transition-all duration-300 hover:scale-105"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-900/50 to-black/50 p-12 rounded-lg border-2 border-[#D4AF37] glossy-overlay text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Office Hours</h2>
              <p className="text-lg text-gray-300 mb-2">Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p className="text-lg text-gray-300">Response time: Usually within 24 hours</p>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
