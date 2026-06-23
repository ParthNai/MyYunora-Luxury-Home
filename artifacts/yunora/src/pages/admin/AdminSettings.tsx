import React, { useState } from 'react';
import AdminLayout from './AdminLayout';
import { Check, Globe, Palette, Bell, Shield, Key } from 'lucide-react';

type Tab = 'general' | 'appearance' | 'notifications' | 'security';

export default function AdminSettings() {
  const [tab, setTab] = useState<Tab>('general');
  const [saved, setSaved] = useState(false);

  const [general, setGeneral] = useState({
    siteName: 'Yunora Universal', tagline: 'Manufacturing Premium Comfort, Crafting Beautiful Homes Since 2018.',
    phone: '+91 96248 18530', email: 'info@myyunora.com', whatsapp: '919624818530',
    address: 'Palanpur, Gujarat, India', instagram: 'https://instagram.com/myyunora',
    facebook: '', googleAnalytics: '',
  });

  const [notif, setNotif] = useState({
    newOrder: true, lowStock: true, newUser: true, paymentSuccess: true,
  });

  const showSaved = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };
  const inp = "w-full h-10 px-3 rounded-lg border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none text-sm";

  const TABS: { key: Tab; label: string; icon: any }[] = [
    { key: 'general', label: 'General', icon: Globe },
    { key: 'appearance', label: 'Appearance', icon: Palette },
    { key: 'notifications', label: 'Notifications', icon: Bell },
    { key: 'security', label: 'Security', icon: Shield },
  ];

  return (
    <AdminLayout title="Settings">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar tabs */}
        <div className="md:w-48 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-2 space-y-0.5">
            {TABS.map(t => {
              const Icon = t.icon;
              return (
                <button key={t.key} onClick={() => setTab(t.key)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${tab === t.key ? 'text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}
                  style={tab === t.key ? { background: 'linear-gradient(135deg, #FF7A4D, #e8622a)' } : {}}>
                  <Icon className="h-4 w-4" />
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          {tab === 'general' && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
              <h3 className="font-bold text-gray-900">General Settings</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { key: 'siteName', label: 'Website Name' }, { key: 'phone', label: 'Phone Number' },
                  { key: 'email', label: 'Email Address' }, { key: 'whatsapp', label: 'WhatsApp Number' },
                  { key: 'instagram', label: 'Instagram URL' }, { key: 'facebook', label: 'Facebook URL' },
                  { key: 'googleAnalytics', label: 'Google Analytics ID' },
                ].map(f => (
                  <div key={f.key}>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">{f.label}</label>
                    <input value={general[f.key as keyof typeof general]} onChange={e => setGeneral(g => ({ ...g, [f.key]: e.target.value }))} className={inp} />
                  </div>
                ))}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Tagline</label>
                  <textarea value={general.tagline} onChange={e => setGeneral(g => ({ ...g, tagline: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-orange-400 outline-none text-sm resize-none" rows={2} />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Address</label>
                  <input value={general.address} onChange={e => setGeneral(g => ({ ...g, address: e.target.value }))} className={inp} />
                </div>
              </div>
              <button onClick={showSaved} className="flex items-center gap-2 h-10 px-6 rounded-xl text-white text-sm font-semibold shadow-sm" style={{ background: 'linear-gradient(135deg, #FF7A4D, #e8622a)' }}>
                {saved ? <><Check className="h-4 w-4" /> Saved!</> : 'Save Settings'}
              </button>
            </div>
          )}

          {tab === 'appearance' && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
              <h3 className="font-bold text-gray-900">Appearance</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">Primary Brand Color</label>
                  <div className="flex items-center gap-3">
                    <input type="color" defaultValue="#FF7A4D" className="h-10 w-16 rounded-lg border border-gray-200 cursor-pointer" />
                    <span className="text-sm text-gray-600">Pumpkin Orange (Default)</span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">Current Theme Preview</label>
                  <div className="flex gap-3">
                    {['#FF7A4D', '#FFB38A', '#FF9A6C', '#e8622a'].map(c => (
                      <div key={c} className="w-10 h-10 rounded-xl shadow-sm border border-white" style={{ background: c }} title={c} />
                    ))}
                  </div>
                </div>
              </div>
              <button onClick={showSaved} className="flex items-center gap-2 h-10 px-6 rounded-xl text-white text-sm font-semibold shadow-sm" style={{ background: 'linear-gradient(135deg, #FF7A4D, #e8622a)' }}>
                {saved ? <><Check className="h-4 w-4" /> Saved!</> : 'Save Appearance'}
              </button>
            </div>
          )}

          {tab === 'notifications' && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
              <h3 className="font-bold text-gray-900">Notification Settings</h3>
              <div className="space-y-4">
                {[
                  { key: 'newOrder', label: 'New Order Alert', desc: 'Get notified when a new order is placed' },
                  { key: 'lowStock', label: 'Low Stock Alert', desc: 'Alert when a product goes out of stock' },
                  { key: 'newUser', label: 'New User Alert', desc: 'Notify when a new user registers' },
                  { key: 'paymentSuccess', label: 'Payment Success', desc: 'Alert for successful payments' },
                ].map(n => (
                  <div key={n.key} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                    <div>
                      <div className="text-sm font-semibold text-gray-900">{n.label}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{n.desc}</div>
                    </div>
                    <button onClick={() => setNotif(v => ({ ...v, [n.key]: !v[n.key as keyof typeof v] }))}
                      className={`w-12 h-6 rounded-full transition-all relative ${notif[n.key as keyof typeof notif] ? 'bg-orange-500' : 'bg-gray-200'}`}>
                      <div className={`w-5 h-5 bg-white rounded-full shadow absolute top-0.5 transition-all ${notif[n.key as keyof typeof notif] ? 'right-0.5' : 'left-0.5'}`} />
                    </button>
                  </div>
                ))}
              </div>
              <button onClick={showSaved} className="flex items-center gap-2 h-10 px-6 rounded-xl text-white text-sm font-semibold shadow-sm" style={{ background: 'linear-gradient(135deg, #FF7A4D, #e8622a)' }}>
                {saved ? <><Check className="h-4 w-4" /> Saved!</> : 'Save Settings'}
              </button>
            </div>
          )}

          {tab === 'security' && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
              <h3 className="font-bold text-gray-900">Security Settings</h3>
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Shield className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-semibold text-green-700">Admin Session Active</span>
                  </div>
                  <p className="text-xs text-green-600">You are logged in as YunoraAdmin. Session is protected.</p>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Change Admin Password</label>
                  <div className="space-y-2">
                    <input type="password" placeholder="Current password" className={inp} />
                    <input type="password" placeholder="New password" className={inp} />
                    <input type="password" placeholder="Confirm new password" className={inp} />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm py-2 border-b border-gray-100">
                    <span className="text-gray-700">Two-Factor Authentication</span>
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-amber-50 text-amber-600">Coming Soon</span>
                  </div>
                  <div className="flex items-center justify-between text-sm py-2">
                    <span className="text-gray-700">Activity Logs</span>
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-amber-50 text-amber-600">Coming Soon</span>
                  </div>
                </div>
              </div>
              <button onClick={showSaved} className="flex items-center gap-2 h-10 px-6 rounded-xl text-white text-sm font-semibold shadow-sm" style={{ background: 'linear-gradient(135deg, #FF7A4D, #e8622a)' }}>
                {saved ? <><Check className="h-4 w-4" /> Saved!</> : 'Update Password'}
              </button>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
