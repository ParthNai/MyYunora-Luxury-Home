import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Factory, Award, Star, Users, ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import heroImg from '@assets/e78948d9-787e-4d94-ba0f-dddc6690730c_1782191160787.jpg';
import mattressImg from '@assets/e5e0e026-5762-42f2-8179-798708c0be68_1782191177966.jpg';
import curtainImg from '@assets/7278f6a4-3588-4878-8043-12715e50fd5b_1782191234202.jpg';
import sofaImg from '@assets/eb59e23c-77b3-4e9e-aad6-36d4f319a4be_1782191151335.jpg';

const stats = [
  { val: '2018', label: 'Year Founded' },
  { val: '5000+', label: 'Happy Homes' },
  { val: '15 Yr', label: 'Max Warranty' },
  { val: '100%', label: 'Factory Direct' },
];

const reasons = [
  { icon: Factory, title: 'Factory Direct', desc: 'We design, manufacture and sell directly. No middlemen means you save up to 40% over retail prices without compromising on quality.' },
  { icon: Award, title: 'Certified Materials', desc: 'OekoTex certified high-GSM fabrics, high-density orthopedic foam, and premium stitching — every material we use passes rigorous quality standards.' },
  { icon: CheckCircle2, title: 'Custom Manufacturing', desc: 'Your sofa, mattress, or curtain — made to your exact dimensions. We accommodate any custom size with no minimum order quantity.' },
  { icon: Star, title: 'Industry-Leading Warranty', desc: 'Up to 15 years warranty on select mattresses. We stand behind every product because we build them to last a lifetime.' },
  { icon: Users, title: 'Trusted Since 2018', desc: 'From a small unit in Palanpur to thousands of satisfied customers across India — our growth is built on trust, quality, and word of mouth.' },
  { icon: ArrowRight, title: 'Pan India Delivery', desc: 'Fast and safe delivery to your doorstep across India. Free delivery on orders above ₹5,000, with professional installation available.' },
];

export default function About() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <div className="relative h-[70vh] min-h-[520px] w-full flex items-end overflow-hidden">
        <img src={heroImg} alt="Yunora" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.7) 100%)' }} />
        <div className="relative z-10 container mx-auto px-6 lg:px-10 pb-16">
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">
            Our Story
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">
            About Yunora Universal
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-white/80 text-lg md:text-xl max-w-2xl font-light leading-relaxed">
            Manufacturing Premium Comfort, Crafting Beautiful Homes Since 2018 — from Palanpur, Gujarat to homes across India.
          </motion.p>
        </div>
      </div>

      {/* Stats bar */}
      <div className="bg-gray-950">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <div className="text-3xl font-bold text-primary mb-1">{s.val}</div>
                <div className="text-gray-400 text-sm font-medium">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Story */}
      <div className="container mx-auto px-4 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <p className="text-primary font-bold text-xs uppercase tracking-widest mb-3">From Our Factory to Your Home</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">A small unit in Palanpur. A dream of premium comfort for every Indian home.</h2>
            <div className="text-gray-600 text-base space-y-5 leading-relaxed">
              <p>
                Yunora Universal was founded in 2018 in Palanpur, Gujarat, with a clear and powerful mission — bring factory-direct luxury home furnishings to Indian households at prices that make sense.
              </p>
              <p>
                We started with mattresses. The idea was simple: why should an Indian family pay 2–3x the manufacturing cost just because of middlemen and distributor margins? By building our own factory and selling directly to consumers, we eliminated that gap entirely.
              </p>
              <p>
                Today, Yunora crafts premium mattresses, designer sofas, curtains, pillows, bean bags, and more — all manufactured under one roof in Gujarat and delivered across India. Every product is a direct expression of our commitment to quality, craftsmanship, and honest pricing.
              </p>
              <p>
                Over 5,000 homes trust Yunora. Families in Ahmedabad, Mumbai, Delhi, Surat, and beyond sleep on our mattresses, sit on our sofas, and live inside our curtains every single day. That trust is our greatest achievement.
              </p>
            </div>
            <Link href="/shop">
              <Button className="mt-8 rounded-xl h-12 px-8 font-semibold gap-2" style={{ background: 'linear-gradient(135deg, #FF7A4D, #e85f2a)' }}>
                Shop Our Products <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="grid grid-cols-2 gap-4">
            <div className="rounded-3xl overflow-hidden aspect-[3/4] shadow-xl">
              <img src={mattressImg} alt="Yunora Mattress" className="w-full h-full object-cover" />
            </div>
            <div className="rounded-3xl overflow-hidden aspect-[3/4] shadow-xl mt-8">
              <img src={curtainImg} alt="Yunora Curtains" className="w-full h-full object-cover" />
            </div>
          </motion.div>
        </div>

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-8 mb-24">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative rounded-3xl overflow-hidden p-10 md:p-12" style={{ background: 'linear-gradient(135deg, #FF7A4D, #e85f2a)' }}>
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, white, transparent)', transform: 'translate(30%, -30%)' }} />
            <p className="text-white/70 text-xs font-bold uppercase tracking-widest mb-4">Our Vision</p>
            <h3 className="text-2xl font-bold text-white mb-4 leading-snug">India's Most Trusted Luxury Home Brand</h3>
            <p className="text-white/80 text-base leading-relaxed">
              "To be India's most trusted luxury home furnishing brand — making premium comfort accessible, authentic, and affordable for every Indian home."
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-gray-950 rounded-3xl p-10 md:p-12">
            <p className="text-primary text-xs font-bold uppercase tracking-widest mb-4">Our Mission</p>
            <h3 className="text-2xl font-bold text-white mb-4 leading-snug">Manufacture. Deliver. Delight.</h3>
            <p className="text-gray-400 text-base leading-relaxed">
              "To manufacture world-class home furnishings with precision, care, and uncompromising craftsmanship — and deliver them directly to you at factory prices, backed by India's strongest warranty."
            </p>
          </motion.div>
        </div>

        {/* Why Choose Yunora */}
        <div className="mb-24">
          <div className="text-center mb-14">
            <p className="text-primary font-semibold text-xs uppercase tracking-widest mb-2">Why Us</p>
            <h2 className="text-4xl font-bold text-gray-900">The Yunora Difference</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reasons.map((r, i) => {
              const Icon = r.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="group bg-white border border-gray-100 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-400"
                >
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-orange-500 flex items-center justify-center mb-5 shadow-md group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{r.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{r.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* What We Make */}
        <div className="relative rounded-[2.5rem] overflow-hidden">
          <img src={sofaImg} alt="Yunora Products" className="w-full h-80 object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 100%)' }} />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-8 py-14 text-center">
            <p className="text-primary font-semibold text-xs uppercase tracking-widest mb-3">Manufactured in Palanpur, Gujarat</p>
            <h2 className="text-3xl font-bold text-white mb-8">What We Make</h2>
            <div className="flex flex-wrap gap-3 justify-center">
              {['Premium Mattresses', 'Orthopedic Mattresses', 'Memory Foam', 'Luxury Pillows', 'Designer Sofas', 'Sectional Sofas', 'Blackout Curtains', 'Bean Bags', 'Cushions', 'Bedsheets'].map(item => (
                <div key={item} className="bg-white/10 backdrop-blur-md border border-white/20 py-2 px-5 rounded-full text-white text-sm font-medium hover:bg-white/20 transition-colors">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
