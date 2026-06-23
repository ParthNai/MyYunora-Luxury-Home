import React, { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout';
import { adminFetch } from '@/lib/adminAuth';
import { Search, Users, Mail, Download } from 'lucide-react';

interface Sub { id: number; email: string; name: string | null; createdAt: string; }

export default function AdminSubscribers() {
  const [subs, setSubs] = useState<Sub[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => { adminFetch<Sub[]>('/admin/subscribers').then(setSubs).finally(() => setLoading(false)); }, []);

  const filtered = subs.filter(s => !search || s.email.includes(search) || (s.name ?? '').toLowerCase().includes(search.toLowerCase()));

  const exportCSV = () => {
    const csv = ['Email,Name,Joined', ...subs.map(s => `${s.email},${s.name ?? ''},${new Date(s.createdAt).toLocaleDateString()}`).join('\n')];
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([csv.join('\n')], { type: 'text/csv' }));
    a.download = 'yunora-subscribers.csv';
    a.click();
  };

  return (
    <AdminLayout title="Newsletter Subscribers">
      <div className="space-y-5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 bg-white rounded-xl border border-gray-100 shadow-sm px-5 py-4">
            <Users className="h-6 w-6 text-primary" />
            <div>
              <div className="text-2xl font-bold text-gray-900">{subs.length}</div>
              <div className="text-xs text-gray-500">Total Subscribers</div>
            </div>
          </div>
          <div className="flex gap-2 flex-1 justify-end">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search subscribers..." className="h-10 pl-9 pr-3 rounded-xl border border-gray-200 focus:border-orange-400 outline-none text-sm w-60" />
            </div>
            <button onClick={exportCSV} className="flex items-center gap-2 h-10 px-4 rounded-xl border border-gray-200 text-sm font-medium hover:bg-gray-50 transition-all">
              <Download className="h-4 w-4" /> Export CSV
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {['#', 'Email', 'Name', 'Joined'].map(h => (
                  <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}><td colSpan={4} className="px-5 py-4"><div className="h-5 bg-gray-100 rounded animate-pulse" /></td></tr>
              )) : filtered.length === 0 ? (
                <tr><td colSpan={4} className="text-center py-12 text-gray-400">No subscribers found</td></tr>
              ) : filtered.map((s, i) => (
                <tr key={s.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-3.5 text-xs text-gray-400 font-mono">{i + 1}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-orange-50 flex items-center justify-center flex-shrink-0">
                        <Mail className="h-3.5 w-3.5 text-primary" />
                      </div>
                      <span className="text-sm font-medium text-gray-800">{s.email}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-gray-600">{s.name ?? '—'}</td>
                  <td className="px-5 py-3.5 text-sm text-gray-400">{new Date(s.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-5 py-3 border-t border-gray-100 text-xs text-gray-400">{filtered.length} subscriber{filtered.length !== 1 ? 's' : ''}</div>
        </div>
      </div>
    </AdminLayout>
  );
}
