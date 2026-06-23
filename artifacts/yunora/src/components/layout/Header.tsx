import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Search, Heart, ShoppingCart, User, Menu, X, ChevronDown } from 'lucide-react';
import { useCartStore, useWishlistStore } from '@/lib/store';
import { useAuth } from '@/lib/auth';
import logoOrange from '@assets/image_1782191146126.png';
import logoWhite from '@assets/01_(1)_1782191129123.png';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { user } = useAuth();
  const isHome = location === '/';

  const cartItems = useCartStore((state) => state.items);
  const wishlistItems = useWishlistStore((state) => state.items);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlistItems.length;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setIsMobileMenuOpen(false); }, [location]);

  const transparent = isHome && !isScrolled;
  const textColor = transparent ? 'text-white' : 'text-gray-800';
  const iconColor = transparent ? 'text-white/90 hover:text-white' : 'text-gray-600 hover:text-primary';

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-40 w-full transition-all duration-500',
          transparent
            ? 'bg-transparent'
            : 'bg-white/90 backdrop-blur-xl border-b border-gray-100/60 shadow-sm'
        )}
      >
        <div className="container mx-auto px-4 lg:px-8 h-[72px] flex items-center justify-between gap-6">

          {/* Mobile Hamburger */}
          <button
            className={cn('lg:hidden p-2 -ml-2 rounded-lg transition-colors', iconColor)}
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Logo */}
          <Link href="/" className="flex-shrink-0" aria-label="Yunora Home">
            <img
              src={transparent ? logoWhite : logoOrange}
              alt="Yunora"
              className="h-9 w-auto transition-opacity duration-300"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            <NavLink href="/" label="Home" transparent={transparent} />

            {/* Shop dropdown */}
            <div className="group relative">
              <NavLink href="/shop" label="Shop" transparent={transparent} hasDropdown />
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none group-hover:pointer-events-auto">
                <div className="w-52 bg-white rounded-2xl shadow-2xl border border-gray-100/80 overflow-hidden py-2">
                  <DropItem href="/shop">All Products</DropItem>
                  <DropItem href="/shop?category=mattresses">Mattresses</DropItem>
                  <DropItem href="/shop?category=pillows">Pillows & Cushions</DropItem>
                  <DropItem href="/shop?category=sofas">Sofas</DropItem>
                  <DropItem href="/shop?category=curtains">Curtains</DropItem>
                  <DropItem href="/shop?category=bean-bags">Bean Bags</DropItem>
                </div>
              </div>
            </div>

            <NavLink href="/categories" label="Categories" transparent={transparent} />
            <NavLink href="/about" label="About" transparent={transparent} />

            {/* Warranty dropdown */}
            <div className="group relative">
              <NavLink href="/warranty" label="Warranty" transparent={transparent} hasDropdown />
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none group-hover:pointer-events-auto">
                <div className="w-48 bg-white rounded-2xl shadow-2xl border border-gray-100/80 overflow-hidden py-2">
                  <DropItem href="/warranty/register">Register Product</DropItem>
                  <DropItem href="/warranty/claim">Submit a Claim</DropItem>
                  <DropItem href="/warranty/policy">Warranty Policy</DropItem>
                  <DropItem href="/warranty/terms">Terms & Conditions</DropItem>
                </div>
              </div>
            </div>

            <NavLink href="/contact" label="Contact" transparent={transparent} />
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-1 lg:gap-2 flex-shrink-0">
            <button
              className={cn('p-2.5 rounded-full transition-all hidden sm:flex items-center justify-center', iconColor, 'hover:bg-black/5')}
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>

            <Link
              href="/wishlist"
              className={cn('relative p-2.5 rounded-full transition-all hidden sm:flex items-center justify-center', iconColor, 'hover:bg-black/5')}
              aria-label="Wishlist"
            >
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-primary text-white text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center leading-none">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link
              href="/profile"
              className={cn('p-2.5 rounded-full transition-all hidden sm:flex items-center justify-center', iconColor, 'hover:bg-black/5')}
              aria-label="Account"
            >
              <User className="h-5 w-5" />
            </Link>

            <Link
              href="/cart"
              className={cn('relative p-2.5 rounded-full transition-all flex items-center justify-center', iconColor, 'hover:bg-black/5')}
              aria-label="Cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-primary text-white text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center leading-none">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 lg:hidden backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.28 }}
              className="fixed top-0 left-0 bottom-0 w-[82%] max-w-xs bg-white z-50 shadow-2xl flex flex-col lg:hidden"
            >
              <div className="p-5 flex items-center justify-between border-b border-gray-100">
                <img src={logoOrange} alt="Yunora" className="h-8 w-auto" />
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-4 px-3">
                <MobLink href="/">Home</MobLink>
                <MobLink href="/shop">Shop All Products</MobLink>
                <MobLink href="/categories">Categories</MobLink>
                <MobLink href="/about">About Us</MobLink>
                <MobLink href="/contact">Contact</MobLink>

                <div className="my-3 mx-2 h-px bg-gray-100" />
                <p className="px-3 py-2 text-[11px] font-semibold text-gray-400 uppercase tracking-widest">Warranty</p>
                <MobLink href="/warranty">Warranty Hub</MobLink>
                <MobLink href="/warranty/register">Register Product</MobLink>
                <MobLink href="/warranty/claim">Submit a Claim</MobLink>

                <div className="my-3 mx-2 h-px bg-gray-100" />
                {user ? (
                  <>
                    <MobLink href="/profile">My Account</MobLink>
                    <MobLink href="/cart">Cart {cartCount > 0 ? `(${cartCount})` : ''}</MobLink>
                    <MobLink href="/wishlist">Wishlist {wishlistCount > 0 ? `(${wishlistCount})` : ''}</MobLink>
                  </>
                ) : (
                  <>
                    <MobLink href="/login">Log In</MobLink>
                    <MobLink href="/signup">Create Account</MobLink>
                  </>
                )}
              </div>

              <div className="p-5 border-t border-gray-100 bg-gray-50">
                <p className="text-xs text-gray-400 text-center">Palanpur, Gujarat · +91 96248 18530</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function NavLink({ href, label, transparent, hasDropdown }: { href: string; label: string; transparent: boolean; hasDropdown?: boolean }) {
  const [location] = useLocation();
  const isActive = location === href || (href !== '/' && location.startsWith(href));
  return (
    <Link
      href={href}
      className={cn(
        'inline-flex items-center gap-0.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
        transparent
          ? isActive ? 'text-white font-semibold' : 'text-white/85 hover:text-white hover:bg-white/10'
          : isActive ? 'text-primary font-semibold bg-primary/8' : 'text-gray-700 hover:text-primary hover:bg-primary/5'
      )}
    >
      {label}
      {hasDropdown && <ChevronDown className="h-3.5 w-3.5 opacity-60" />}
    </Link>
  );
}

function DropItem({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="block px-5 py-2.5 text-sm text-gray-700 hover:text-primary hover:bg-orange-50 transition-colors font-medium">
      {children}
    </Link>
  );
}

function MobLink({ href, children }: { href: string; children: React.ReactNode }) {
  const [location] = useLocation();
  const isActive = location === href;
  return (
    <Link href={href} className={cn(
      'block px-3 py-3 text-base font-medium rounded-xl transition-colors mb-0.5',
      isActive ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-50'
    )}>
      {children}
    </Link>
  );
}
