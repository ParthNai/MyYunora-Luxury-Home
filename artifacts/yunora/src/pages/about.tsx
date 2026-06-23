import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { CheckCircle2 } from 'lucide-react';

import heroImg from '@assets/e78948d9-787e-4d94-ba0f-dddc6690730c_1782191160787.jpg';
import mattressImg from '@assets/e5e0e026-5762-42f2-8179-798708c0be68_1782191177966.jpg';

export default function About() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <div className="relative h-[60vh] min-h-[500px] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={heroImg} alt="Yunora Factory" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="container relative z-10 text-center px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4"
          >
            About Yunora Universal
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/90 max-w-2xl mx-auto font-medium"
          >
            Manufacturing Premium Comfort, Crafting Beautiful Homes Since 2018
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20 lg:py-32">
        {/* Our Story */}
        <div className="flex flex-col lg:flex-row gap-16 items-center mb-32">
          <div className="lg:w-1/2">
            <h2 className="text-sm font-bold text-primary tracking-widest uppercase mb-3">Our Story</h2>
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">From a small unit in Palanpur to homes across India.</h3>
            <div className="text-gray-600 text-lg space-y-6 leading-relaxed">
              <p>
                Founded in 2018 in Palanpur, Gujarat, Yunora Universal began with a simple mission — to bring factory-direct premium home furnishings to every Indian home.
              </p>
              <p>
                What started as a small manufacturing unit has grown into a trusted brand serving thousands of happy customers across India. By cutting out the middlemen, we ensure that premium materials and expert craftsmanship remain accessible and affordable.
              </p>
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl">
              <img src={mattressImg} alt="Yunora Mattress Crafting" className="w-full h-auto object-cover aspect-[4/3]" />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent mix-blend-overlay" />
            </div>
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-8 mb-32">
          <div className="bg-gray-50 p-10 md:p-14 rounded-[2rem] border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              "To be India's most trusted luxury home furnishing brand, making premium comfort accessible to every Indian home."
            </p>
          </div>
          <div className="bg-primary/5 p-10 md:p-14 rounded-[2rem] border border-primary/10">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              "Manufacturing world-class home furnishings with precision, care, and craftsmanship — delivered directly to you at factory prices."
            </p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Why Choose Yunora</h2>
            <p className="text-lg text-gray-600">The pillars of our manufacturing excellence</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ReasonCard title="Factory Direct" desc="No middlemen, direct from factory to your home ensuring the best prices." />
            <ReasonCard title="Premium Quality" desc="Certified materials, rigorous quality checks at every step of manufacturing." />
            <ReasonCard title="Custom Sizes" desc="Made to measure for your space, because every home is unique." />
            <ReasonCard title="Since 2018" desc="6+ years of manufacturing excellence and thousands of satisfied customers." />
            <ReasonCard title="15 Year Warranty" desc="Industry-leading warranty on select mattress products for total peace of mind." />
          </div>
        </div>

        {/* What We Make */}
        <div className="bg-gray-900 text-white rounded-[2.5rem] p-10 lg:p-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">What We Make</h2>
            <p className="text-lg text-gray-400">Manufactured with precision in Palanpur</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-center">
            <ProductPill text="Premium Mattresses" />
            <ProductPill text="Luxury Pillows" />
            <ProductPill text="Designer Sofas" />
            <ProductPill text="Curtains & Blinds" />
            <ProductPill text="Bean Bags" />
            <ProductPill text="Bedsheets" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ReasonCard({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="bg-white border border-gray-100 p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-shadow duration-300">
      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
        <CheckCircle2 className="h-6 w-6" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{desc}</p>
    </div>
  );
}

function ProductPill({ text }: { text: string }) {
  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 py-4 px-6 rounded-2xl font-medium text-white hover:bg-white/20 transition-colors">
      {text}
    </div>
  );
}
