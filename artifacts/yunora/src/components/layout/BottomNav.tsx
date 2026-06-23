import React from 'react';
import { Link, useLocation } from 'wouter';
import { Home, Grid, Heart, User, ShoppingCart } from 'lucide-react';
import { useCartStore, useWishlistStore } from '@/lib/store';
import { cn } from '@/lib/utils';

export function BottomNav() {
  const [location] = useLocation();
  const cartItems = useCartStore((state) => state.items);
  const wishlistItems = useWishlistStore((state) => state.items);
  
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlistItems.length;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 glass pb-safe">
      <div className="flex items-center justify-around h-16 px-2">
        <NavItem 
          href="/" 
          icon={<Home className="h-6 w-6" />} 
          label="Home" 
          isActive={location === '/'} 
        />
        <NavItem 
          href="/categories" 
          icon={<Grid className="h-6 w-6" />} 
          label="Categories" 
          isActive={location.startsWith('/categories') || location.startsWith('/shop')} 
        />
        <NavItem 
          href="/wishlist" 
          icon={<Heart className="h-6 w-6" />} 
          label="Wishlist" 
          isActive={location === '/wishlist'} 
          badge={wishlistCount}
        />
        <NavItem 
          href="/profile" 
          icon={<User className="h-6 w-6" />} 
          label="Account" 
          isActive={location === '/profile' || location === '/login'} 
        />
        <NavItem 
          href="/cart" 
          icon={<ShoppingCart className="h-6 w-6" />} 
          label="Cart" 
          isActive={location === '/cart' || location === '/checkout'} 
          badge={cartCount}
        />
      </div>
    </div>
  );
}

function NavItem({ 
  href, 
  icon, 
  label, 
  isActive, 
  badge = 0 
}: { 
  href: string; 
  icon: React.ReactNode; 
  label: string; 
  isActive: boolean;
  badge?: number;
}) {
  return (
    <Link 
      href={href} 
      className={cn(
        "relative flex flex-col items-center justify-center w-16 h-full gap-1 transition-colors",
        isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
      )}
    >
      <div className="relative">
        {icon}
        {badge > 0 && (
          <span className="absolute -top-1 -right-2 bg-primary text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center shadow-sm">
            {badge > 9 ? '9+' : badge}
          </span>
        )}
      </div>
      <span className="text-[10px] font-medium">{label}</span>
    </Link>
  );
}
