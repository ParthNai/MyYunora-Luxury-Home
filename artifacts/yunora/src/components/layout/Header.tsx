import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Search, Heart, ShoppingCart, User, Menu, X } from 'lucide-react';
import { useCartStore, useWishlistStore } from '@/lib/store';
import { useAuth } from '@/lib/auth';
import logoUrl from '@assets/image_1782191146126.png';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { user } = useAuth();
  
  const cartItems = useCartStore((state) => state.items);
  const wishlistItems = useWishlistStore((state) => state.items);
  
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlistItems.length;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header 
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300",
        isScrolled ? "bg-white shadow-sm" : "glass"
      )}
    >
      <div className="container mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden p-2 -ml-2 text-foreground"
          onClick={() => setIsMobileMenuOpen(true)}
          data-testid="button-mobile-menu"
        >
          <Menu className="h-6 w-6" />
        </button>

        {/* Logo */}
        <Link href="/" className="flex-shrink-0 flex items-center" data-testid="link-home">
          <img src={logoUrl} alt="Yunora" className="h-10 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          <NavLink href="/">Home</NavLink>
          <div className="group relative py-8">
            <NavLink href="/shop">Shop</NavLink>
            <div className="absolute top-full left-0 w-48 bg-white shadow-lg rounded-xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
              <div className="py-2">
                <SubNavLink href="/shop">All Products</SubNavLink>
                <SubNavLink href="/shop?category=mattresses">Mattresses</SubNavLink>
                <SubNavLink href="/shop?category=pillows">Pillows</SubNavLink>
                <SubNavLink href="/shop?category=sofas">Sofas</SubNavLink>
              </div>
            </div>
          </div>
          <NavLink href="/categories">Categories</NavLink>
          <NavLink href="/about">About</NavLink>
          <div className="group relative py-8">
            <NavLink href="/warranty">Warranty</NavLink>
            <div className="absolute top-full left-0 w-48 bg-white shadow-lg rounded-xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
              <div className="py-2">
                <SubNavLink href="/warranty/register">Register</SubNavLink>
                <SubNavLink href="/warranty/policy">Policy</SubNavLink>
                <SubNavLink href="/warranty/terms">Terms</SubNavLink>
                <SubNavLink href="/warranty/claim">Claim</SubNavLink>
              </div>
            </div>
          </div>
          <NavLink href="/contact">Contact</NavLink>
        </nav>

        {/* Right Icons */}
        <div className="flex items-center gap-4 lg:gap-6">
          <button className="text-foreground hover:text-primary transition-colors hidden sm:block" data-testid="button-search">
            <Search className="h-5 w-5" />
          </button>
          
          <Link href="/wishlist" className="relative text-foreground hover:text-primary transition-colors hidden sm:block" data-testid="link-wishlist">
            <Heart className="h-5 w-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>
          
          <Link href="/profile" className="text-foreground hover:text-primary transition-colors hidden sm:block" data-testid="link-profile">
            <User className="h-5 w-5" />
          </Link>
          
          <Link href="/cart" className="relative text-foreground hover:text-primary transition-colors" data-testid="link-cart">
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 z-50 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 left-0 bottom-0 w-4/5 max-w-sm bg-white z-50 shadow-2xl flex flex-col lg:hidden"
            >
              <div className="p-4 border-b flex items-center justify-between">
                <img src={logoUrl} alt="Yunora" className="h-8 w-auto" />
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto py-4">
                <div className="flex flex-col space-y-1 px-2">
                  <MobileNavLink href="/">Home</MobileNavLink>
                  <MobileNavLink href="/shop">Shop All</MobileNavLink>
                  <MobileNavLink href="/categories">Categories</MobileNavLink>
                  <MobileNavLink href="/about">About Us</MobileNavLink>
                  <MobileNavLink href="/contact">Contact</MobileNavLink>
                  
                  <div className="my-4 mx-4 h-px bg-border" />
                  <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Warranty
                  </div>
                  <MobileNavLink href="/warranty">Warranty Hub</MobileNavLink>
                  <MobileNavLink href="/warranty/register">Register Product</MobileNavLink>
                  <MobileNavLink href="/warranty/claim">Claim Warranty</MobileNavLink>
                  
                  <div className="my-4 mx-4 h-px bg-border" />
                  {user ? (
                    <>
                      <MobileNavLink href="/profile">My Account</MobileNavLink>
                      <MobileNavLink href="/cart">Cart ({cartCount})</MobileNavLink>
                    </>
                  ) : (
                    <>
                      <MobileNavLink href="/login">Log In</MobileNavLink>
                      <MobileNavLink href="/signup">Sign Up</MobileNavLink>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const [location] = useLocation();
  const isActive = location === href || (href !== '/' && location.startsWith(href));
  
  return (
    <Link href={href} className={cn(
      "text-sm font-medium transition-colors hover:text-primary",
      isActive ? "text-primary" : "text-foreground"
    )}>
      {children}
    </Link>
  );
}

function SubNavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const [location] = useLocation();
  const isActive = location === href;
  
  return (
    <Link href={href} className={cn(
      "block px-4 py-2 text-sm transition-colors hover:bg-slate-50 hover:text-primary",
      isActive ? "text-primary bg-slate-50 font-medium" : "text-foreground"
    )}>
      {children}
    </Link>
  );
}

function MobileNavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const [location] = useLocation();
  const isActive = location === href;
  
  return (
    <Link href={href} className={cn(
      "block px-4 py-3 text-base font-medium rounded-lg transition-colors",
      isActive ? "bg-primary/10 text-primary" : "text-foreground hover:bg-slate-50"
    )}>
      {children}
    </Link>
  );
}
