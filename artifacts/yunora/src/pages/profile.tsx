import React from 'react';
import { useAuth } from '@/lib/auth';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LogOut, User, MapPin, Package, Heart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Profile() {
  const [_, setLocation] = useLocation();
  const { user, logout, isAuthenticated } = useAuth();
  const { toast } = useToast();

  React.useEffect(() => {
    if (!isAuthenticated) {
      setLocation('/login');
    }
  }, [isAuthenticated, setLocation]);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    toast({ title: 'Logged out successfully' });
    setLocation('/');
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Account</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar Nav */}
          <div className="md:col-span-1 space-y-2">
            <button className="w-full flex items-center gap-3 px-4 py-3 bg-white rounded-xl text-primary font-semibold border border-primary/20 shadow-sm text-left">
              <User className="h-5 w-5" /> Profile Info
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white rounded-xl text-gray-600 hover:text-gray-900 font-medium transition-colors text-left">
              <Package className="h-5 w-5" /> My Orders
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white rounded-xl text-gray-600 hover:text-gray-900 font-medium transition-colors text-left">
              <MapPin className="h-5 w-5" /> Saved Addresses
            </button>
            <Link href="/wishlist">
              <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white rounded-xl text-gray-600 hover:text-gray-900 font-medium transition-colors text-left">
                <Heart className="h-5 w-5" /> My Wishlist
              </button>
            </Link>
            
            <div className="pt-4 mt-4 border-t border-gray-200">
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl font-medium transition-colors text-left"
              >
                <LogOut className="h-5 w-5" /> Log Out
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="md:col-span-3 space-y-8">
            
            {/* Profile Info Form */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Personal Information</h2>
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); toast({ title: "Profile updated" }); }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue={user.name} className="h-12 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" defaultValue={user.email} disabled className="h-12 rounded-xl bg-gray-50 text-gray-500" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" defaultValue={user.phone} className="h-12 rounded-xl" />
                  </div>
                </div>
                <Button type="submit" className="rounded-xl px-8 h-12">Save Changes</Button>
              </form>
            </div>

            {/* Empty States for other sections (mocked for demo) */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
                <Button variant="outline" size="sm" className="rounded-lg">View All</Button>
              </div>
              <div className="text-center py-10 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                <Package className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 font-medium">No orders found</p>
                <Link href="/shop" className="text-primary text-sm hover:underline mt-2 inline-block">Start shopping</Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
