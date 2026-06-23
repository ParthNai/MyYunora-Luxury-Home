import React from 'react';
import { Link } from 'wouter';
import { Instagram, Facebook, MapPin, Phone, Mail } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import logoUrl from '@assets/01_(1)_1782191129123.png';

export function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white pt-16 pb-8 lg:pb-12 mt-auto">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Brand */}
          <div>
            <div className="bg-white/10 rounded-xl p-4 inline-block mb-6">
              <img src={logoUrl} alt="Yunora" className="h-10 w-auto" />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Manufacturing Premium Comfort, Crafting Beautiful Homes Since 2018. Factory-direct luxury home furnishings delivered across India.
            </p>
            <div className="flex gap-4">
              <a href="https://instagram.com/myyunora" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors text-white">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors text-white">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://wa.me/919624818530" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors text-white">
                <FaWhatsapp className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors text-sm">About Us</Link></li>
              <li><Link href="/shop" className="text-gray-400 hover:text-white transition-colors text-sm">Shop All Products</Link></li>
              <li><Link href="/categories" className="text-gray-400 hover:text-white transition-colors text-sm">Categories</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">Contact Us</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Support & Warranty</h3>
            <ul className="space-y-4">
              <li><Link href="/warranty" className="text-gray-400 hover:text-white transition-colors text-sm">Warranty Hub</Link></li>
              <li><Link href="/warranty/register" className="text-gray-400 hover:text-white transition-colors text-sm">Register Warranty</Link></li>
              <li><Link href="/warranty/claim" className="text-gray-400 hover:text-white transition-colors text-sm">Claim Warranty</Link></li>
              <li><Link href="/warranty/policy" className="text-gray-400 hover:text-white transition-colors text-sm">Warranty Policy</Link></li>
              <li><Link href="/warranty/terms" className="text-gray-400 hover:text-white transition-colors text-sm">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                <span>Yunora Universal, Palanpur, Gujarat, India</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <a href="tel:+919624818530" className="hover:text-white transition-colors">+91 96248 18530</a>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <a href="mailto:info@myyunora.com" className="hover:text-white transition-colors">info@myyunora.com</a>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 mt-8 flex flex-col md:flex-row items-center justify-between gap-4 lg:mb-0 mb-16">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Yunora Universal. All rights reserved.
          </p>
          <p className="text-sm text-gray-500">
            Made with love in Palanpur, Gujarat.
          </p>
        </div>
      </div>
    </footer>
  );
}
