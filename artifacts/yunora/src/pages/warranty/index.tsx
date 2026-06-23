import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, AlertCircle, FileText, FileSignature, Clock, Award, CheckCircle } from 'lucide-react';
import { Link } from 'wouter';
import mattressImg from '@assets/e5e0e026-5762-42f2-8179-798708c0be68_1782191177966.jpg';
import sofaImg from '@assets/eb59e23c-77b3-4e9e-aad6-36d4f319a4be_1782191151335.jpg';

const cards = [
  {
    href: '/warranty/register',
    icon: ShieldCheck,
    title: 'Warranty Registration',
    desc: 'Register your newly purchased Yunora product to activate your warranty coverage and access priority support.',
    cta: 'Register Now',
    color: 'from-primary to-orange-500',
    bg: 'bg-orange-50',
    iconBg: 'text-primary',
  },
  {
    href: '/warranty/claim',
    icon: AlertCircle,
    title: 'Submit a Claim',
    desc: 'Facing an issue with your product? Submit a warranty claim and our expert team will resolve it within 48 hours.',
    cta: 'Submit Claim',
    color: 'from-red-400 to-red-500',
    bg: 'bg-red-50',
    iconBg: 'text-red-500',
  },
  {
    href: '/warranty/policy',
    icon: FileText,
    title: 'Warranty Policy',
    desc: 'Understand the duration and coverage details for every product category — from mattresses to sofas.',
    cta: 'Read Policy',
    color: 'from-blue-400 to-blue-500',
    bg: 'bg-blue-50',
    iconBg: 'text-blue-500',
  },
  {
    href: '/warranty/terms',
    icon: FileSignature,
    title: 'Terms & Conditions',
    desc: 'Complete terms, conditions, and limitations of the Yunora warranty program for your reference.',
    cta: 'View Terms',
    color: 'from-violet-400 to-purple-500',
    bg: 'bg-violet-50',
    iconBg: 'text-violet-500',
  },
];

const promises = [
  { icon: Clock, label: '48-Hour Resolution', desc: 'Fast turnaround on all warranty claims' },
  { icon: Award, label: 'Up to 15 Years', desc: 'Industry-leading warranty on mattresses' },
  { icon: CheckCircle, label: 'No Hidden Clauses', desc: 'Transparent, customer-first warranty policy' },
];

export default function WarrantyHub() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative overflow-hidden py-24 lg:py-32" style={{ background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 60%, #0f3460 100%)' }}>
        <div className="absolute inset-0 pointer-events-none opacity-15" style={{ background: 'radial-gradient(circle at 25% 50%, #FF7A4D, transparent 50%), radial-gradient(circle at 75% 40%, #e85f2a, transparent 50%)' }} />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-orange-500 flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-primary/30"
          >
            <ShieldCheck className="h-10 w-10 text-white" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold text-white mb-5"
          >
            Warranty Hub
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Yunora products are built to last. We stand behind every product with industry-leading warranties so you can shop with complete confidence.
          </motion.p>
        </div>
      </div>

      {/* Promise Strip */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-14">
            {promises.map((p, i) => {
              const Icon = p.icon;
              return (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-sm">{p.label}</div>
                    <div className="text-gray-500 text-xs">{p.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="container mx-auto px-4 py-16 lg:py-20 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link href={card.href} className="group block bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-400 hover:-translate-y-1.5 p-8 h-full">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-3">{card.title}</h2>
                  <p className="text-gray-500 leading-relaxed mb-6 text-sm">{card.desc}</p>
                  <div className="flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all">
                    {card.cta}
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                      <span className="text-xs">→</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Showcase photos */}
      <div className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden h-64 shadow-xl">
            <img src={mattressImg} alt="Yunora Mattress Warranty" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="inline-flex items-center gap-2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full mb-2">
                15 YEAR WARRANTY
              </div>
              <h3 className="text-white font-bold text-xl">Orthopedic Mattresses</h3>
              <p className="text-white/70 text-sm mt-1">Industry's longest warranty coverage</p>
            </div>
          </div>
          <div className="relative rounded-3xl overflow-hidden h-64 shadow-xl">
            <img src={sofaImg} alt="Yunora Sofa Warranty" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="inline-flex items-center gap-2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full mb-2">
                5 YEAR WARRANTY
              </div>
              <h3 className="text-white font-bold text-xl">Sofas & Seating</h3>
              <p className="text-white/70 text-sm mt-1">Structural warranty on all sofa frames</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
