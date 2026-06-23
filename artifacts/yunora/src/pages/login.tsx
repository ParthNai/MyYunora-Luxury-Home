import React, { useState } from 'react';
import { useAuth } from '@/lib/auth';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
import logoUrl from '@assets/image_1782191146126.png';
import sofaImg from '@assets/e78948d9-787e-4d94-ba0f-dddc6690730c_1782191160787.jpg';

export default function Login() {
  const [_, setLocation] = useLocation();
  const { login, isAuthenticated } = useAuth();
  const { toast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (isAuthenticated) setLocation('/profile');
  }, [isAuthenticated, setLocation]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    setTimeout(() => {
      login({ name: email.split('@')[0], email, phone: '+91 90000 00000' });
      toast({ title: 'Welcome back!', description: 'You have successfully logged in.' });
      setLocation('/profile');
      setLoading(false);
    }, 900);
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left image panel — hidden on mobile */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img src={sofaImg} alt="Yunora Luxury" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(255,122,77,0.3) 100%)' }} />
        <div className="absolute inset-0 flex flex-col items-start justify-end p-14">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="h-px w-8 bg-primary" />
            <span className="text-primary/90 text-sm font-semibold uppercase tracking-widest">Since 2018</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-3 leading-tight">
            Premium Home<br />Furnishings
          </h2>
          <p className="text-white/70 text-base max-w-xs leading-relaxed">
            Factory-direct luxury for your home. Mattresses, sofas, curtains and more — crafted in Palanpur, Gujarat.
          </p>
          <div className="flex items-center gap-6 mt-8">
            {['5000+ Homes', '15 Yr Warranty', 'Factory Direct'].map(s => (
              <div key={s} className="text-center">
                <div className="h-px w-6 bg-primary mx-auto mb-1.5" />
                <span className="text-white/60 text-xs font-medium">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-10">
            <Link href="/">
              <img src={logoUrl} alt="Yunora" className="h-10 w-auto mx-auto mb-8 cursor-pointer" />
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-gray-500">Sign in to your Yunora account</p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-gray-400" />
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="you@example.com"
                    className="pl-11 h-13 rounded-xl border-gray-200 bg-gray-50 focus-visible:bg-white focus-visible:ring-primary"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-gray-700">Password</label>
                  <a href="#" className="text-xs text-primary font-semibold hover:underline">Forgot password?</a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-gray-400" />
                  <Input
                    type={showPass ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter your password"
                    className="pl-11 pr-11 h-13 rounded-xl border-gray-200 bg-gray-50 focus-visible:bg-white focus-visible:ring-primary"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPass ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-13 rounded-xl text-base font-bold shadow-md mt-2"
                style={{ background: 'linear-gradient(135deg, #FF7A4D, #e85f2a)', boxShadow: '0 4px 16px rgba(255,122,77,0.3)' }}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Signing in...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Log In
                    <ArrowRight className="h-4 w-4" />
                  </span>
                )}
              </Button>
            </form>
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?{' '}
            <Link href="/signup" className="text-primary font-bold hover:underline">Create one free</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
