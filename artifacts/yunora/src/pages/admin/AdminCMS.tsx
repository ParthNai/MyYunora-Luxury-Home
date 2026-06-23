import React, { useState } from 'react';
import AdminLayout from './AdminLayout';
import { Check, Info } from 'lucide-react';

const DEFAULT_OFFERS = [
  '🔥 Up to 40% Off — Factory Direct Pricing',
  '✨ Crafted in India · Luxury You Can Feel',
  '🚚 Free Shipping on Orders Above ₹5,000',
  '🛡️ 15 Year Warranty on Select Mattresses',
  '💬 Custom Sizes — Chat with Us on WhatsApp',
  '⭐ OekoTex Certified Premium Materials',
  '🏭 Direct from Our Factory · Zero Middlemen',
  '🎁 Exclusive Deals for New Customers',
];

const HERO_TEXTS = [
  { tag: 'Premium Living', headline: 'Crafting Luxury.', sub: 'Manufacturing Comfort.' },
  { tag: 'Luxury Sofas', headline: 'Elevate Your', sub: 'Living Space.' },
  { tag: 'Orthopedic Mattresses', headline: 'Sleep Better.', sub: 'Live Better.' },
  { tag: 'Premium Curtains', headline: 'Dress Your', sub: 'Windows in Style.' },
  { tag: 'Designer Sofas', headline: 'Your Home.', sub: 'Your Statement.' },
  { tag: 'Bean Bags & Loungers', headline: 'Relax in', sub: 'Premium Comfort.' },
];

type Tab = 'offers' | 'hero' | 'contact' | 'footer';

export default function AdminCMS() {
  const [tab, setTab] = useState<Tab>('offers');
  const [offers, setOffers] = useState<string[]>([...DEFAULT_OFFERS]);
  const [newOffer, setNewOffer] = useState('');
  const [saved, setSaved] = useState(false);
  const [heroTexts, setHeroTexts] = useState(HERO_TEXTS.map(h => ({ ...h })));

  const [contact, setContact] = useState({
    phone: '+91 96248 18530', email: 'info@myyunora.com',
    whatsapp: '919624818530', address: 'Palanpur, Gujarat, India',
    instagram: 'https://instagram.com/myyunora',
    hours: 'Mon-Sat: 10am - 7pm',
  });

  const showSaved = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  const TABS: { key: Tab; label: string }[] = [
    { key: 'offers', label: 'Offer Strip' },
    { key: 'hero', label: 'Hero Slider' },
    { key: 'contact', label: 'Contact Info' },
    { key: 'footer', label: 'Footer' },
  ];

  const inp = "w-full h-10 px-3 rounded-lg border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none text-sm";

  return (
    <AdminLayout title="CMS — Content Management">
      <div className="space-y-5">
        {/* Info banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-start gap-3">
          <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-700">
            <strong>CMS Module:</strong> Content changes here are currently previewed locally. For full live sync, connect these values to the database Settings table. Your developer can wire these up to the API.
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit">
          {TABS.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${tab === t.key ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'offers' && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
            <div>
              <h3 className="font-bold text-gray-900 mb-1">Offer Strip Messages</h3>
              <p className="text-xs text-gray-400">These messages scroll continuously in the top offer strip.</p>
            </div>
            <div className="space-y-2">
              {offers.map((offer, i) => (
                <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-2.5">
                  <span className="text-xs text-gray-400 font-mono w-5">{i + 1}</span>
                  <input
                    value={offer}
                    onChange={e => setOffers(o => o.map((x, j) => j === i ? e.target.value : x))}
                    className="flex-1 bg-transparent text-sm text-gray-800 outline-none"
                  />
                  <button onClick={() => setOffers(o => o.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600 text-xs font-medium">Remove</button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input value={newOffer} onChange={e => setNewOffer(e.target.value)} placeholder="Add new offer message..." className={`${inp} flex-1`} onKeyDown={e => { if (e.key === 'Enter' && newOffer.trim()) { setOffers(o => [...o, newOffer.trim()]); setNewOffer(''); } }} />
              <button onClick={() => { if (newOffer.trim()) { setOffers(o => [...o, newOffer.trim()]); setNewOffer(''); } }} className="h-10 px-5 rounded-lg text-white text-sm font-medium" style={{ background: 'linear-gradient(135deg, #FF7A4D, #e8622a)' }}>Add</button>
            </div>
            <button onClick={showSaved} className="flex items-center gap-2 h-10 px-6 rounded-xl text-white text-sm font-semibold shadow-sm" style={{ background: 'linear-gradient(135deg, #FF7A4D, #e8622a)' }}>
              {saved ? <><Check className="h-4 w-4" /> Saved!</> : 'Save Changes'}
            </button>
          </div>
        )}

        {tab === 'hero' && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
            <div>
              <h3 className="font-bold text-gray-900 mb-1">Hero Slider Text</h3>
              <p className="text-xs text-gray-400">Edit the text shown on each hero slide. Slides change every 6 seconds.</p>
            </div>
            <div className="space-y-4">
              {heroTexts.map((h, i) => (
                <div key={i} className="border border-gray-200 rounded-xl p-4 space-y-3">
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Slide {i + 1}</div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Tag (small text)</label>
                      <input value={h.tag} onChange={e => setHeroTexts(t => t.map((x, j) => j === i ? { ...x, tag: e.target.value } : x))} className={inp} />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Main Headline</label>
                      <input value={h.headline} onChange={e => setHeroTexts(t => t.map((x, j) => j === i ? { ...x, headline: e.target.value } : x))} className={inp} />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Sub Headline (orange)</label>
                      <input value={h.sub} onChange={e => setHeroTexts(t => t.map((x, j) => j === i ? { ...x, sub: e.target.value } : x))} className={inp} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={showSaved} className="flex items-center gap-2 h-10 px-6 rounded-xl text-white text-sm font-semibold shadow-sm" style={{ background: 'linear-gradient(135deg, #FF7A4D, #e8622a)' }}>
              {saved ? <><Check className="h-4 w-4" /> Saved!</> : 'Save Changes'}
            </button>
          </div>
        )}

        {tab === 'contact' && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
            <h3 className="font-bold text-gray-900">Contact Page Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { key: 'phone', label: 'Phone Number' }, { key: 'email', label: 'Email Address' },
                { key: 'whatsapp', label: 'WhatsApp Number' }, { key: 'address', label: 'Address' },
                { key: 'instagram', label: 'Instagram URL' }, { key: 'hours', label: 'Store Hours' },
              ].map(f => (
                <div key={f.key}>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">{f.label}</label>
                  <input value={contact[f.key as keyof typeof contact]} onChange={e => setContact(c => ({ ...c, [f.key]: e.target.value }))} className={inp} />
                </div>
              ))}
            </div>
            <button onClick={showSaved} className="flex items-center gap-2 h-10 px-6 rounded-xl text-white text-sm font-semibold shadow-sm" style={{ background: 'linear-gradient(135deg, #FF7A4D, #e8622a)' }}>
              {saved ? <><Check className="h-4 w-4" /> Saved!</> : 'Save Changes'}
            </button>
          </div>
        )}

        {tab === 'footer' && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-bold text-gray-900 mb-4">Footer Settings</h3>
            <div className="space-y-4">
              {[
                { label: 'Company Description', value: 'Manufacturing Premium Comfort, Crafting Beautiful Homes Since 2018.' },
                { label: 'Copyright Text', value: '© 2026 Yunora Universal. All rights reserved.' },
              ].map((f, i) => (
                <div key={i}>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">{f.label}</label>
                  <textarea defaultValue={f.value} className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-orange-400 outline-none text-sm resize-none" rows={2} />
                </div>
              ))}
            </div>
            <button onClick={showSaved} className="flex items-center gap-2 h-10 px-6 rounded-xl text-white text-sm font-semibold shadow-sm mt-4" style={{ background: 'linear-gradient(135deg, #FF7A4D, #e8622a)' }}>
              {saved ? <><Check className="h-4 w-4" /> Saved!</> : 'Save Changes'}
            </button>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
