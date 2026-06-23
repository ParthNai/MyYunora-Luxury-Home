import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const offers = [
  "Free Consultation Available",
  "Factory Direct Pricing — No Middlemen",
  "Premium Quality Since 2018",
  "Free Delivery on Orders Above ₹5000",
  "15 Year Warranty on Select Mattresses"
];

export function OfferStrip() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % offers.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-primary h-10 w-full overflow-hidden flex items-center justify-center px-4 relative z-50">
      <AnimatePresence mode="wait">
        <motion.p
          key={currentIndex}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="text-white text-xs md:text-sm font-medium tracking-wide text-center absolute"
        >
          {offers[currentIndex]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
