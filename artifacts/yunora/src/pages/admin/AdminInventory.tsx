import React, { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout';
import { adminFetch } from '@/lib/adminAuth';
import { Package, AlertTriangle, CheckCircle, XCircle, TrendingDown } from 'lucide-react';

interface Product {
  id: number; name: string; category: string; price: number;
  inStock: boolean; reviewCount: number; isFeatured: boolean;
}

export default function AdminInventory() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { adminFetch<Product[]>('/admin/products').then(setProducts).finally(() => setLoading(false)); }, []);

  const inStock = products.filter(p => p.inStock);
  const outOfStock = products.filter(p => !p.inStock);

  const toggleStock = async (p: Product) => {
    await adminFetch(`/admin/products/${p.id}`, { method: 'PUT', body: JSON.stringify({ ...p, inStock: !p.inStock }) });
    adminFetch<Product[]>('/admin/products').then(setProducts);
  };

  return (
    <AdminLayout title="Inventory">
      <div className="space-y-6">
        {/* Summary cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Products', value: products.length, icon: Package, color: '#FF7A4D', bg: '#fff5f0' },
            { label: 'In Stock', value: inStock.length, icon: CheckCircle, color: '#10b981', bg: '#f0fdf4' },
            { label: 'Out of Stock', value: outOfStock.length, icon: XCircle, color: '#ef4444', bg: '#fef2f2' },
            { label: 'Low Reviews', value: products.filter(p => (p.reviewCount ?? 0) < 10).length, icon: TrendingDown, color: '#f59e0b', bg: '#fffbeb' },
          ].map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: s.bg }}>
                  <Icon className="h-5 w-5" style={{ color: s.color }} />
                </div>
                <div className="text-2xl font-bold text-gray-900">{s.value}</div>
                <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
              </div>
            );
          })}
        </div>

        {/* Out of stock alert */}
        {outOfStock.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-red-800 text-sm">{outOfStock.length} product{outOfStock.length !== 1 ? 's are' : ' is'} out of stock</div>
              <div className="text-xs text-red-600 mt-0.5">{outOfStock.map(p => p.name).join(', ')}</div>
            </div>
          </div>
        )}

        {/* Inventory table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h3 className="font-bold text-gray-900">All Products — Stock Status</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  {['Product', 'Category', 'Price', 'Reviews', 'Status', 'Action'].map(h => (
                    <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {loading ? Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}><td colSpan={6} className="px-5 py-4"><div className="h-5 bg-gray-100 rounded animate-pulse" /></td></tr>
                )) : products.map(p => (
                  <tr key={p.id} className={`hover:bg-gray-50/50 transition-colors ${!p.inStock ? 'bg-red-50/30' : ''}`}>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-orange-50 flex items-center justify-center"><Package className="h-4 w-4 text-primary" /></div>
                        <span className="text-sm font-semibold text-gray-800">{p.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4"><span className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 capitalize">{p.category}</span></td>
                    <td className="px-5 py-4 text-sm font-bold text-gray-900">₹{Number(p.price).toLocaleString('en-IN')}</td>
                    <td className="px-5 py-4 text-sm text-gray-600">{p.reviewCount}</td>
                    <td className="px-5 py-4">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${p.inStock ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'}`}>
                        {p.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <button onClick={() => toggleStock(p)} className={`text-xs h-7 px-3 rounded-lg font-medium transition-all ${p.inStock ? 'bg-red-50 text-red-500 hover:bg-red-100' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'}`}>
                        Mark {p.inStock ? 'Out of Stock' : 'In Stock'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
