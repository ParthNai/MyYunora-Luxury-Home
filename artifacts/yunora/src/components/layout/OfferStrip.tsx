import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Truck, Shield, Star } from 'lucide-react';

const offers = [
  { icon: Tag, text: 'Factory Direct Pricing — No Middlemen. Save Up to 40%' },
  { icon: Truck, text: 'Free Delivery on Orders Above ₹5,000 Across India' },
  { icon: Shield, text: '15 Year Warranty on Select Mattresses. Shop With Confidence' },
  { icon: Star, text: 'OekoTex Certified Premium Materials. Trusted Since 2018' },
  { icon: Tag, text: 'Custom Sizes Available. Talk to Our Experts on WhatsApp' },
];

export function OfferStrip() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % offers.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const Icon = offers[currentIndex].icon;

  return (
    <div className="relative w-full h-10 overflow-hidden flex items-center justify-center" style={{ background: 'linear-gradient(90deg, #e8622a 0%, #FF7A4D 40%, #ff9a6c 60%, #FF7A4D 80%, #e8622a 100%)' }}>
      {/* Glossy shimmer overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 50%, rgba(0,0,0,0.08) 100%)',
      }} />
      {/* Animated shimmer sweep */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.22) 50%, transparent 70%)' }}
        animate={{ x: ['-100%', '200%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ y: 18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -18, opacity: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="flex items-center gap-2 text-white text-xs md:text-sm font-semibold tracking-wide"
        >
          <Icon className="h-3.5 w-3.5 opacity-90 flex-shrink-0" />
          <span style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>{offers[currentIndex].text}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
