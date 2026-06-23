import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'wouter';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth';

export function AuthPopup() {
  const { isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem('yunora_auth_popup_seen');
    if (!isAuthenticated && !hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem('yunora_auth_popup_seen', 'true');
      }, 3000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [isAuthenticated]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md p-8 glass shadow-2xl rounded-[24px] bg-white/90"
          >
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-900 transition-colors bg-white/50 rounded-full"
            >
              <X className="h-5 w-5" />
            </button>
            
            <div className="text-center mt-2 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Start Your Shopping With Yunora</h2>
              <p className="text-gray-600">Create your account to save favourites, manage orders and enjoy a seamless shopping experience.</p>
            </div>
            
            <div className="flex flex-col gap-3">
              <Link href="/signup" onClick={() => setIsOpen(false)}>
                <Button size="lg" className="w-full h-14 rounded-xl text-base bg-primary hover:bg-primary/90 text-white">
                  Sign Up
                </Button>
              </Link>
              <Link href="/login" onClick={() => setIsOpen(false)}>
                <Button variant="outline" size="lg" className="w-full h-14 rounded-xl text-base border-gray-300 text-gray-700 hover:bg-gray-50">
                  Log In
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
