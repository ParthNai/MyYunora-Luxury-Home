import React, { useState } from 'react';
import { useAuth } from '@/lib/auth';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import logoUrl from '@assets/image_1782191146126.png';

export default function Signup() {
  const [_, setLocation] = useLocation();
  const { login, isAuthenticated } = useAuth();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });

  // Redirect if already logged in
  React.useEffect(() => {
    if (isAuthenticated) {
      setLocation('/profile');
    }
  }, [isAuthenticated, setLocation]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock signup
    setTimeout(() => {
      login({
        name: formData.name,
        email: formData.email,
        phone: formData.phone
      });
      toast({ title: 'Account Created!', description: 'Welcome to Yunora.' });
      setLocation('/profile');
    }, 800);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100">
        <div className="text-center mb-10">
          <Link href="/">
            <img src={logoUrl} alt="Yunora" className="h-10 w-auto mx-auto mb-6 cursor-pointer" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Create Account</h1>
          <p className="text-gray-500 text-sm">Join Yunora for exclusive offers and faster checkout</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input 
              id="name" 
              name="name"
              value={formData.name} 
              onChange={handleChange} 
              required 
              className="h-12 rounded-xl bg-gray-50 border-transparent focus-visible:bg-white" 
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input 
              id="email" 
              name="email"
              type="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
              className="h-12 rounded-xl bg-gray-50 border-transparent focus-visible:bg-white" 
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input 
              id="phone" 
              name="phone"
              value={formData.phone} 
              onChange={handleChange} 
              required 
              className="h-12 rounded-xl bg-gray-50 border-transparent focus-visible:bg-white" 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              name="password"
              type="password" 
              value={formData.password} 
              onChange={handleChange} 
              required 
              className="h-12 rounded-xl bg-gray-50 border-transparent focus-visible:bg-white" 
            />
          </div>

          <Button type="submit" className="w-full h-14 rounded-xl text-base font-bold bg-primary shadow-md hover:bg-primary/90 mt-4" data-testid="btn-signup-submit">
            Create Account
          </Button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-500">
          Already have an account? <Link href="/login" className="text-primary font-bold hover:underline">Log in</Link>
        </div>
      </div>
    </div>
  );
}
