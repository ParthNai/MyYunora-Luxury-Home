import React, { useState } from 'react';
import AdminLayout from './AdminLayout';
import { MessageSquare, Phone, Mail, Calendar, CheckCircle, Clock, X } from 'lucide-react';

interface Enquiry { id: number; name: string; phone: string; email: string; message: string; product: string; date: string; status: 'new' | 'contacted' | 'closed'; }

const SAMPLE: Enquiry[] = [
  { id: 1, name: 'Amit Shah', phone: '+91 98765 43210', email: 'amit@example.com', message: 'I need a custom mattress for a king size bed with orthopedic support. What are my options?', product: 'Mattresses', date: '2026-06-20', status: 'new' },
  { id: 2, name: 'Kavya Patel', phone: '+91 87654 32109', email: 'kavya@example.com', message: 'Looking for curtains for a 10x12 ft window. Can you provide eyelet curtains in beige?', product: 'Curtains', date: '2026-06-18', status: 'contacted' },
  { id: 3, name: 'Rohan Mehta', phone: '+91 76543 21098', email: '', message: 'Need pricing for a complete bedroom set — mattress, pillow, bedsheet combination.', product: 'General', date: '2026-06-15', status: 'closed' },
];

const STATUS_CONFIG = {
  new: { label: 'New', bg: 'bg-blue-50', text: 'text-blue-600', icon: Clock },
  contacted: { label: 'Contacted', bg: 'bg-amber-50', text: 'text-amber-600', icon: CheckCircle },
  closed: { label: 'Closed', bg: 'bg-gray-100', text: 'text-gray-500', icon: X },
};

export default function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>(SAMPLE);
  const [filter, setFilter] = useState<string>('');
  const [selected, setSelected] = useState<Enquiry | null>(null);

  const filtered = filter ? enquiries.filter(e => e.status === filter) : enquiries;

  const updateStatus = (id: number, status: Enquiry['status']) => {
    setEnquiries(v => v.map(e => e.id === id ? { ...e, status } : e));
    if (selected?.id === id) setSelected(v => v ? { ...v, status } : v);
  };

  return (
    <AdminLayout title="Customer Enquiries">
      <div className="space-y-5">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {(['new', 'contacted', 'closed'] as const).map(s => {
            const count = enquiries.filter(e => e.status === s).length;
            const c = STATUS_CONFIG[s];
            return (
              <button key={s} onClick={() => setFilter(filter === s ? '' : s)} className={`rounded-2xl p-4 text-left border-2 transition-all ${filter === s ? 'border-orange-400' : 'border-transparent'} ${c.bg}`}>
                <div className={`text-2xl font-bold ${c.text}`}>{count}</div>
                <div className={`text-sm font-medium mt-0.5 ${c.text}`}>{c.label}</div>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* List */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-50 overflow-hidden">
            {filtered.length === 0 ? (
              <div className="py-12 text-center text-gray-400 text-sm">No enquiries</div>
            ) : filtered.map(e => {
              const c = STATUS_CONFIG[e.status];
              const StatusIcon = c.icon;
              return (
                <div key={e.id} onClick={() => setSelected(e)} className="p-5 hover:bg-gray-50 cursor-pointer transition-colors">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-sm text-gray-900">{e.name}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${c.bg} ${c.text}`}>{c.label}</span>
                      </div>
                      <p className="text-xs text-gray-500 truncate">{e.message}</p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                        <span>{e.phone}</span>
                        <span>·</span>
                        <span>{e.product}</span>
                        <span>·</span>
                        <span>{e.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detail */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            {selected ? (
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <h3 className="font-bold text-gray-900">{selected.name}</h3>
                  <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600"><X className="h-4 w-4" /></button>
                </div>
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 text-sm text-gray-600"><Phone className="h-4 w-4 text-primary" />{selected.phone}</div>
                  {selected.email && <div className="flex items-center gap-2 text-sm text-gray-600"><Mail className="h-4 w-4 text-primary" />{selected.email}</div>}
                  <div className="flex items-center gap-2 text-sm text-gray-600"><Calendar className="h-4 w-4 text-primary" />{selected.date}</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <div className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Product Interest</div>
                  <div className="text-sm font-medium text-gray-800">{selected.product}</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <div className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Message</div>
                  <p className="text-sm text-gray-700 leading-relaxed">{selected.message}</p>
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Update Status</div>
                  <div className="flex flex-col gap-2">
                    {(['new', 'contacted', 'closed'] as const).map(s => (
                      <button key={s} onClick={() => updateStatus(selected.id, s)}
                        className={`h-9 rounded-lg text-sm font-medium transition-all capitalize ${selected.status === s ? 'text-white shadow-sm' : 'border border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                        style={selected.status === s ? { background: 'linear-gradient(135deg, #FF7A4D, #e8622a)' } : {}}>
                        Mark as {s}
                      </button>
                    ))}
                  </div>
                </div>
                <a href={`https://wa.me/${selected.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 h-10 rounded-xl text-white text-sm font-medium w-full"
                  style={{ background: '#25D366' }}>
                  Reply on WhatsApp
                </a>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-48 text-gray-400">
                <MessageSquare className="h-8 w-8 mb-2" />
                <p className="text-sm">Select an enquiry to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
