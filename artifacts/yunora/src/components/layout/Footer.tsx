import React from 'react';
import { Link } from 'wouter';
import { Instagram, Facebook, MapPin, Phone, Mail, Heart } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import logoUrl from '@assets/01_(1)_1782191129123.png';

export function Footer() {
  return (
    <footer
      className="text-gray-800 pt-16 pb-8 lg:pb-12 mt-auto"
      style={{
        background: 'linear-gradient(135deg, #FFF5F0 0%, #FFF0E8 40%, #FFE8D6 70%, #FFF5F0 100%)',
        borderTop: '2px solid rgba(255,122,77,0.15)',
      }}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div>
            <div className="rounded-xl p-3 inline-block mb-6 shadow-sm" style={{ background: 'linear-gradient(135deg, #FF7A4D, #e8622a)' }}>
              <img src={logoUrl} alt="Yunora" className="h-10 w-auto brightness-0 invert" />
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Manufacturing Premium Comfort, Crafting Beautiful Homes Since 2018. Factory-direct luxury home furnishings delivered across India.
            </p>
            <div className="flex gap-3">
              <a href="https://instagram.com/myyunora" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-sm"
                style={{ background: 'linear-gradient(135deg, #FF7A4D, #e8622a)', color: 'white' }}>
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-sm hover:opacity-80"
                style={{ background: 'linear-gradient(135deg, #FF7A4D, #e8622a)', color: 'white' }}>
                <Facebook className="h-4 w-4" />
              </a>
              <a href="https://wa.me/919624818530" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-sm hover:opacity-80"
                style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)', color: 'white' }}>
                <FaWhatsapp className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base font-bold mb-6 text-gray-900">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { href: '/about', label: 'About Us' },
                { href: '/shop', label: 'Shop All Products' },
                { href: '/categories', label: 'Categories' },
                { href: '/contact', label: 'Contact Us' },
              ].map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-gray-500 hover:text-primary transition-colors text-sm font-medium">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-base font-bold mb-6 text-gray-900">Support & Warranty</h3>
            <ul className="space-y-3">
              {[
                { href: '/warranty', label: 'Warranty Hub' },
                { href: '/warranty/register', label: 'Register Warranty' },
                { href: '/warranty/claim', label: 'Claim Warranty' },
                { href: '/warranty/policy', label: 'Warranty Policy' },
                { href: '/warranty/terms', label: 'Terms & Conditions' },
              ].map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-gray-500 hover:text-primary transition-colors text-sm font-medium">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-base font-bold mb-6 text-gray-900">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-gray-600">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'rgba(255,122,77,0.15)' }}>
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <span className="leading-relaxed">Yunora Universal, Palanpur, Gujarat, India</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-600">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(255,122,77,0.15)' }}>
                  <Phone className="h-4 w-4 text-primary" />
                </div>
                <a href="tel:+919624818530" className="hover:text-primary transition-colors font-medium">+91 96248 18530</a>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-600">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(255,122,77,0.15)' }}>
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                <a href="mailto:info@myyunora.com" className="hover:text-primary transition-colors font-medium">info@myyunora.com</a>
              </li>
            </ul>
          </div>

        </div>

        <div
          className="border-t pt-8 mt-4 flex flex-col md:flex-row items-center justify-between gap-4 lg:mb-0 mb-16"
          style={{ borderColor: 'rgba(255,122,77,0.2)' }}
        >
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Yunora Universal. All rights reserved.
          </p>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            Made with <Heart className="h-3.5 w-3.5 text-primary fill-primary" /> in Palanpur, Gujarat.
          </p>
        </div>
      </div>
    </footer>
  );
}
