import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FaInstagram, FaFacebook, FaWhatsapp } from 'react-icons/fa';

const contactInfo = [
  {
    icon: Phone,
    title: 'Phone / WhatsApp',
    lines: ['+91 96248 18530'],
    link: 'tel:+919624818530',
    color: 'from-green-400 to-emerald-500',
  },
  {
    icon: Mail,
    title: 'Email Us',
    lines: ['info@myyunora.com'],
    link: 'mailto:info@myyunora.com',
    color: 'from-primary to-orange-400',
  },
  {
    icon: MapPin,
    title: 'Our Factory & Office',
    lines: ['Yunora Universal', 'Palanpur, Gujarat 385001, India'],
    color: 'from-red-400 to-rose-500',
  },
  {
    icon: Clock,
    title: 'Working Hours',
    lines: ['Monday – Saturday', '9:00 AM – 7:00 PM IST'],
    color: 'from-violet-400 to-purple-500',
  },
];

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1200);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="relative py-24 lg:py-32 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 60%, #16213e 100%)' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 20% 50%, rgba(255,122,77,0.15), transparent 50%), radial-gradient(circle at 80% 30%, rgba(255,90,30,0.1), transparent 50%)' }} />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-primary font-semibold text-sm uppercase tracking-widest mb-4"
          >
            Get in Touch
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold text-white mb-5"
          >
            We're Here to Help
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/60 text-lg max-w-xl mx-auto"
          >
            Have a question, need a custom size, or want to place a bulk order? Reach out to us — we respond within 2 hours.
          </motion.p>
        </div>
      </div>

      {/* Contact Cards */}
      <div className="container mx-auto px-4 -mt-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {contactInfo.map((info, i) => {
            const Icon = info.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100 text-center"
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${info.color} flex items-center justify-center mx-auto mb-3 shadow-md`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-2">{info.title}</h3>
                {info.lines.map((line, j) => (
                  <p key={j} className="text-gray-500 text-xs leading-relaxed">
                    {info.link && j === 0 ? (
                      <a href={info.link} className="hover:text-primary transition-colors font-medium">{line}</a>
                    ) : line}
                  </p>
                ))}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-8 lg:p-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Send Us a Message</h2>
              <p className="text-gray-500 text-sm mb-8">Fill in the form and our team will get back to you within 2 hours.</p>

              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10"
                >
                  <CheckCircle className="h-16 w-16 text-emerald-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-500">Thank you for reaching out. We will get back to you soon.</p>
                  <Button onClick={() => setSent(false)} variant="outline" className="mt-6 rounded-xl">Send Another</Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                      <Input required placeholder="Rahul Sharma" className="rounded-xl h-12 border-gray-200 focus-visible:ring-primary" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                      <Input required placeholder="+91 99999 99999" className="rounded-xl h-12 border-gray-200 focus-visible:ring-primary" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                    <Input type="email" placeholder="you@example.com" className="rounded-xl h-12 border-gray-200 focus-visible:ring-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Subject *</label>
                    <Input required placeholder="Product inquiry, custom order, etc." className="rounded-xl h-12 border-gray-200 focus-visible:ring-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Message *</label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Tell us about your requirement — size, quantity, delivery location..."
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-13 rounded-xl font-semibold text-base shadow-md"
                    style={{ background: 'linear-gradient(135deg, #FF7A4D, #e85f2a)', boxShadow: '0 4px 20px rgba(255,122,77,0.3)' }}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="h-4 w-4" />
                        Send Message
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </div>

            {/* Social + WhatsApp */}
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
              <a
                href="https://wa.me/919624818530"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white rounded-2xl px-6 py-4 font-semibold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                <FaWhatsapp className="h-6 w-6" />
                WhatsApp Chat
              </a>
              <div className="flex items-center gap-3">
                <a href="https://instagram.com/myyunora" target="_blank" rel="noopener noreferrer"
                  className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 flex items-center justify-center text-white shadow-md hover:-translate-y-0.5 transition-transform">
                  <FaInstagram className="h-6 w-6" />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer"
                  className="w-12 h-12 rounded-2xl bg-blue-600 hover:bg-blue-700 flex items-center justify-center text-white shadow-md hover:-translate-y-0.5 transition-transform">
                  <FaFacebook className="h-6 w-6" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100" style={{ height: '420px' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d116238.99503468502!2d72.16480572097365!3d24.16788358482598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395ce94b1548eebf%3A0xc3af87c94544d0f5!2sPalanpur%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Yunora Universal Location"
              />
            </div>

            {/* Quick info blocks */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-2 text-sm">Bulk Orders Welcome</h3>
                <p className="text-gray-500 text-xs leading-relaxed">Hotels, resorts, housing projects, and interior designers — we offer special trade pricing.</p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-2 text-sm">Custom Manufacturing</h3>
                <p className="text-gray-500 text-xs leading-relaxed">Need a non-standard size? We manufacture to your exact requirements with no minimum order.</p>
              </div>
              <div className="bg-primary/5 rounded-2xl p-5 border border-primary/10 col-span-2">
                <h3 className="font-bold text-primary mb-1.5 text-sm">Visit Our Showroom</h3>
                <p className="text-gray-600 text-xs leading-relaxed">Come experience the Yunora quality in person at our Palanpur, Gujarat showroom. Open Monday–Saturday, 9am to 7pm. Call before visiting to ensure our team is available for you.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
