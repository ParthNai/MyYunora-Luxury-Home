import React, { useState } from 'react';
import { useAuth } from '@/lib/auth';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import logoUrl from '@assets/image_1782191146126.png';

export default function Login() {
  const [_, setLocation] = useLocation();
  const { login, isAuthenticated } = useAuth();
  const { toast } = useToast();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Redirect if already logged in
  React.useEffect(() => {
    if (isAuthenticated) {
      setLocation('/profile');
    }
  }, [isAuthenticated, setLocation]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock login - in a real app, this would verify with backend
    if (email && password) {
      // Simulate network request
      setTimeout(() => {
        login({
          name: email.split('@')[0],
          email: email,
          phone: '+91 90000 00000'
        });
        toast({ title: 'Welcome back!', description: 'You have successfully logged in.' });
        setLocation('/profile');
      }, 800);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100">
        <div className="text-center mb-10">
          <Link href="/">
            <img src={logoUrl} alt="Yunora" className="h-10 w-auto mx-auto mb-6 cursor-pointer" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-500 text-sm">Enter your credentials to access your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input 
              id="email" 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              className="h-12 rounded-xl bg-gray-50 border-transparent focus-visible:bg-white" 
              placeholder="you@example.com"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <a href="#" className="text-sm font-medium text-primary hover:underline">Forgot password?</a>
            </div>
            <Input 
              id="password" 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              className="h-12 rounded-xl bg-gray-50 border-transparent focus-visible:bg-white" 
              placeholder="••••••••"
            />
          </div>

          <Button type="submit" className="w-full h-14 rounded-xl text-base font-bold bg-primary shadow-md hover:bg-primary/90 mt-2" data-testid="btn-login-submit">
            Log In
          </Button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-500">
          Don't have an account? <Link href="/signup" className="text-primary font-bold hover:underline">Sign up</Link>
        </div>
      </div>
    </div>
  );
}
