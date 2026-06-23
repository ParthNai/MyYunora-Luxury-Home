import React, { useState } from 'react';
import AdminLayout from './AdminLayout';
import { Star, Plus, Trash2, X, Check } from 'lucide-react';

interface Review { id: number; name: string; location: string; rating: number; text: string; approved: boolean; date: string; }

const INITIAL: Review[] = [
  { id: 1, name: 'Priya M.', location: 'Ahmedabad', rating: 5, text: 'The mattress is incredible. Best sleep I have had in years. The quality is outstanding for the price.', approved: true, date: '2025-11-15' },
  { id: 2, name: 'Rahul K.', location: 'Surat', rating: 5, text: 'Ordered a custom sofa and curtains. Delivered on time, impeccable finish. Yunora is our go-to for home furnishings.', approved: true, date: '2025-10-22' },
  { id: 3, name: 'Sneha P.', location: 'Mumbai', rating: 4, text: 'The bean bag is so comfortable and the leather looks premium. Fast delivery and great customer support!', approved: true, date: '2025-09-18' },
];

const EMPTY_FORM = { name: '', location: '', rating: 5, text: '', approved: false };

export default function AdminReviews() {
  const [reviews, setReviews] = useState<Review[]>(INITIAL);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [saved, setSaved] = useState<number | null>(null);

  const addReview = () => {
    const r: Review = { id: Date.now(), ...form, date: new Date().toISOString().split('T')[0] };
    setReviews(v => [...v, r]);
    setModal(false);
    setForm({ ...EMPTY_FORM });
  };

  const toggleApprove = (id: number) => {
    setReviews(v => v.map(r => r.id === id ? { ...r, approved: !r.approved } : r));
    setSaved(id);
    setTimeout(() => setSaved(null), 1500);
  };

  const deleteReview = (id: number) => setReviews(v => v.filter(r => r.id !== id));

  const inp = "w-full h-10 px-3 rounded-lg border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none text-sm";

  return (
    <AdminLayout title="Reviews">
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex gap-4 text-sm">
            <span className="text-emerald-600 font-semibold">{reviews.filter(r => r.approved).length} Approved</span>
            <span className="text-amber-600 font-semibold">{reviews.filter(r => !r.approved).length} Pending</span>
          </div>
          <button onClick={() => setModal(true)} className="flex items-center gap-2 h-10 px-5 rounded-xl text-white text-sm font-semibold shadow-sm" style={{ background: 'linear-gradient(135deg, #FF7A4D, #e8622a)' }}>
            <Plus className="h-4 w-4" /> Add Review
          </button>
        </div>

        <div className="space-y-3">
          {reviews.map(r => (
            <div key={r.id} className={`bg-white rounded-2xl border shadow-sm p-5 transition-all ${r.approved ? 'border-gray-100' : 'border-amber-200 bg-amber-50/30'}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-gray-900 text-sm">{r.name}</span>
                    <span className="text-xs text-gray-400">· {r.location}</span>
                    <span className="text-xs text-gray-400">· {r.date}</span>
                  </div>
                  <div className="flex items-center gap-0.5 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`h-3.5 w-3.5 ${i < r.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200 fill-gray-200'}`} />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{r.text}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${r.approved ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                    {r.approved ? 'Approved' : 'Pending'}
                  </span>
                  <div className="flex gap-1.5">
                    <button onClick={() => toggleApprove(r.id)} className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all ${saved === r.id ? 'border-emerald-300 bg-emerald-50' : 'border-gray-200 hover:border-emerald-300'}`}>
                      <Check className={`h-3.5 w-3.5 ${saved === r.id ? 'text-emerald-500' : 'text-gray-400'}`} />
                    </button>
                    <button onClick={() => deleteReview(r.id)} className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:border-red-300 hover:text-red-500 transition-all">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="font-bold text-gray-900">Add Review</h2>
              <button onClick={() => setModal(false)} className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center"><X className="h-4 w-4" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Name</label>
                  <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className={inp} placeholder="Customer Name" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Location</label>
                  <input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} className={inp} placeholder="City" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(n => (
                    <button key={n} onClick={() => setForm(f => ({ ...f, rating: n }))} className="focus:outline-none">
                      <Star className={`h-6 w-6 transition-colors ${n <= form.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200 fill-gray-200'}`} />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Review Text</label>
                <textarea value={form.text} onChange={e => setForm(f => ({ ...f, text: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-orange-400 outline-none text-sm resize-none" rows={3} />
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.approved} onChange={e => setForm(f => ({ ...f, approved: e.target.checked }))} className="rounded" />
                <span className="text-sm font-medium text-gray-700">Approve immediately</span>
              </label>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex gap-3 justify-end">
              <button onClick={() => setModal(false)} className="h-10 px-5 rounded-xl border border-gray-200 text-sm font-medium">Cancel</button>
              <button onClick={addReview} disabled={!form.name || !form.text} className="h-10 px-6 rounded-xl text-white text-sm font-semibold disabled:opacity-60 shadow-sm" style={{ background: 'linear-gradient(135deg, #FF7A4D, #e8622a)' }}>Add Review</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
