import React from 'react';

const items = [
  '🔥 Up to 40% Off — Factory Direct Pricing',
  '✨ Crafted in India · Luxury You Can Feel',
  '🚚 Free Shipping on Orders Above ₹5,000',
  '🛡️ 15 Year Warranty on Select Mattresses',
  '💬 Custom Sizes — Chat with Us on WhatsApp',
  '⭐ OekoTex Certified Premium Materials',
  '🏭 Direct from Our Factory · Zero Middlemen',
  '🎁 Exclusive Deals for New Customers',
];

const marqueeText = items.join('   ·   ');

export function OfferStrip() {
  return (
    <div
      className="relative w-full overflow-hidden flex items-center"
      style={{
        height: '38px',
        background: 'linear-gradient(90deg, #FF7A4D 0%, #ff9a6c 30%, #FF7A4D 60%, #e8622a 100%)',
      }}
    >
      {/* Glossy top highlight */}
      <div
        className="absolute inset-x-0 top-0 h-1/2 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.22) 0%, transparent 100%)' }}
      />

      {/* Scrolling marquee */}
      <div className="flex w-full overflow-hidden">
        <div
          className="flex items-center whitespace-nowrap"
          style={{ animation: 'marqueeScroll 38s linear infinite' }}
        >
          {/* Duplicate for seamless loop */}
          {[0, 1].map((dupe) => (
            <span key={dupe} className="flex items-center gap-0">
              {items.map((item, i) => (
                <React.Fragment key={`${dupe}-${i}`}>
                  <span
                    className="text-white font-semibold text-xs md:text-sm px-6"
                    style={{ textShadow: '0 1px 3px rgba(0,0,0,0.2)', letterSpacing: '0.02em' }}
                  >
                    {item}
                  </span>
                  <span className="text-white/50 text-sm">|</span>
                </React.Fragment>
              ))}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marqueeScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
