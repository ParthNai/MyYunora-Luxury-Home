import React, { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout';
import { adminFetch } from '@/lib/adminAuth';
import { Search, ChevronDown, Eye, X } from 'lucide-react';

interface OrderItem { name: string; quantity: number; price: number; }
interface Order {
  id: number; orderId: string; status: string; fullName: string; phone: string;
  email: string | null; address: string; city: string; state: string; pinCode: string;
  items: OrderItem[]; totalAmount: number; couponCode: string | null;
  paymentMethod: string; createdAt: string;
}

const STATUSES = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];
const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  pending:    { bg: '#fffbeb', text: '#d97706' },
  confirmed:  { bg: '#eff6ff', text: '#2563eb' },
  processing: { bg: '#f5f3ff', text: '#7c3aed' },
  shipped:    { bg: '#ecfeff', text: '#0891b2' },
  delivered:  { bg: '#f0fdf4', text: '#16a34a' },
  cancelled:  { bg: '#fef2f2', text: '#dc2626' },
};

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [viewOrder, setViewOrder] = useState<Order | null>(null);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const load = () => adminFetch<Order[]>('/admin/orders').then(setOrders).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const filtered = orders.filter(o =>
    (!search || o.fullName.toLowerCase().includes(search.toLowerCase()) || o.orderId.toLowerCase().includes(search.toLowerCase()) || o.phone.includes(search)) &&
    (!statusFilter || o.status === statusFilter)
  );

  const updateStatus = async (id: number, status: string) => {
    setUpdatingId(id);
    await adminFetch(`/admin/orders/${id}`, { method: 'PUT', body: JSON.stringify({ status }) });
    if (viewOrder?.id === id) setViewOrder(v => v ? { ...v, status } : v);
    await load();
    setUpdatingId(null);
  };

  const sc = (s: string) => STATUS_COLORS[s] ?? { bg: '#f3f4f6', text: '#6b7280' };

  return (
    <AdminLayout title="Orders">
      <div className="space-y-5">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, order ID, phone..." className="w-full h-10 pl-9 pr-3 rounded-xl border border-gray-200 focus:border-orange-400 outline-none text-sm" />
          </div>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="h-10 px-3 rounded-xl border border-gray-200 text-sm outline-none capitalize">
            <option value="">All Status</option>
            {STATUSES.map(s => <option key={s} value={s} className="capitalize">{s}</option>)}
          </select>
        </div>

        {/* Status summary */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {STATUSES.map(s => {
            const count = orders.filter(o => o.status === s).length;
            const c = sc(s);
            return (
              <button key={s} onClick={() => setStatusFilter(statusFilter === s ? '' : s)}
                className={`rounded-xl p-3 text-center transition-all border-2 ${statusFilter === s ? 'border-orange-400' : 'border-transparent'}`}
                style={{ background: c.bg }}>
                <div className="text-xl font-bold" style={{ color: c.text }}>{count}</div>
                <div className="text-xs font-medium capitalize mt-0.5" style={{ color: c.text }}>{s}</div>
              </button>
            );
          })}
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  {['Order ID', 'Customer', 'Amount', 'Payment', 'Status', 'Date', 'Actions'].map(h => (
                    <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {loading ? Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}><td colSpan={7} className="px-5 py-4"><div className="h-5 bg-gray-100 rounded animate-pulse" /></td></tr>
                )) : filtered.length === 0 ? (
                  <tr><td colSpan={7} className="text-center py-12 text-gray-400">No orders found</td></tr>
                ) : filtered.map(o => {
                  const c = sc(o.status);
                  return (
                    <tr key={o.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-5 py-4 text-sm font-mono font-medium text-gray-800">{o.orderId}</td>
                      <td className="px-5 py-4">
                        <div className="text-sm font-semibold text-gray-800">{o.fullName}</div>
                        <div className="text-xs text-gray-400">{o.phone}</div>
                      </td>
                      <td className="px-5 py-4 text-sm font-bold text-gray-900">₹{o.totalAmount.toLocaleString('en-IN')}</td>
                      <td className="px-5 py-4"><span className="text-xs font-medium text-gray-600 capitalize">{o.paymentMethod}</span></td>
                      <td className="px-5 py-4">
                        <select value={o.status} onChange={e => updateStatus(o.id, e.target.value)} disabled={updatingId === o.id}
                          className="text-xs font-semibold px-2.5 py-1.5 rounded-lg outline-none cursor-pointer capitalize"
                          style={{ background: c.bg, color: c.text }}>
                          {STATUSES.map(s => <option key={s} value={s} className="text-gray-900 bg-white capitalize">{s}</option>)}
                        </select>
                      </td>
                      <td className="px-5 py-4 text-xs text-gray-400">{new Date(o.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                      <td className="px-5 py-4">
                        <button onClick={() => setViewOrder(o)} className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:border-orange-300 hover:text-primary transition-all">
                          <Eye className="h-3.5 w-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-3 border-t border-gray-100 text-xs text-gray-400">{filtered.length} order{filtered.length !== 1 ? 's' : ''}</div>
        </div>
      </div>

      {/* Order Detail Modal */}
      {viewOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div>
                <h2 className="font-bold text-gray-900">{viewOrder.orderId}</h2>
                <p className="text-xs text-gray-400">{new Date(viewOrder.createdAt).toLocaleString('en-IN')}</p>
              </div>
              <button onClick={() => setViewOrder(null)} className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50"><X className="h-4 w-4" /></button>
            </div>
            <div className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-gray-400 font-medium mb-1">Customer</div>
                  <div className="text-sm font-semibold text-gray-800">{viewOrder.fullName}</div>
                  <div className="text-xs text-gray-500">{viewOrder.phone}</div>
                  {viewOrder.email && <div className="text-xs text-gray-500">{viewOrder.email}</div>}
                </div>
                <div>
                  <div className="text-xs text-gray-400 font-medium mb-1">Delivery Address</div>
                  <div className="text-sm text-gray-700">{viewOrder.address}, {viewOrder.city}, {viewOrder.state} - {viewOrder.pinCode}</div>
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-400 font-medium mb-2">Order Items</div>
                <div className="rounded-xl border border-gray-100 divide-y divide-gray-50">
                  {(viewOrder.items as any[]).map((item: any, i: number) => (
                    <div key={i} className="flex items-center justify-between px-4 py-3">
                      <div>
                        <div className="text-sm font-medium text-gray-800">{item.name}</div>
                        <div className="text-xs text-gray-400">Qty: {item.quantity}</div>
                      </div>
                      <div className="text-sm font-bold text-gray-900">₹{(item.price * item.quantity).toLocaleString('en-IN')}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between bg-orange-50 rounded-xl px-4 py-3">
                <span className="font-semibold text-gray-800">Total Amount</span>
                <span className="text-xl font-bold text-primary">₹{viewOrder.totalAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Payment: <span className="font-medium capitalize">{viewOrder.paymentMethod}</span></span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Status:</span>
                  <select value={viewOrder.status} onChange={e => updateStatus(viewOrder.id, e.target.value)}
                    className="text-xs font-semibold px-2.5 py-1.5 rounded-lg outline-none cursor-pointer capitalize border border-gray-200">
                    {STATUSES.map(s => <option key={s} value={s} className="capitalize">{s}</option>)}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
