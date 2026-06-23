import React, { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout';
import { adminFetch } from '@/lib/adminAuth';
import { Plus, Pencil, Trash2, Search, Star, Eye, EyeOff, Package, X, Check } from 'lucide-react';

interface Product {
  id: number; name: string; slug: string; price: number; originalPrice: number | null;
  category: string; shortDescription: string; description: string | null;
  features: string[]; colors: string[]; sizes: string[];
  warrantyYears: number | null; rating: number | null; reviewCount: number;
  inStock: boolean; isFeatured: boolean; badge: string | null; material: string | null;
  createdAt: string;
}

const CATEGORIES = ['mattresses', 'pillows', 'sofas', 'curtains', 'bean-bags', 'bedsheets'];
const EMPTY_FORM = {
  name: '', price: '', originalPrice: '', category: 'mattresses',
  shortDescription: '', description: '', material: '', badge: '',
  warrantyYears: '', features: '', colors: '', sizes: '',
  inStock: true, isFeatured: false,
};

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('');
  const [modal, setModal] = useState<'add' | 'edit' | null>(null);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const load = () => adminFetch<Product[]>('/admin/products').then(setProducts).finally(() => setLoading(false));

  useEffect(() => { load(); }, []);

  const filtered = products.filter(p => {
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = !catFilter || p.category === catFilter;
    return matchSearch && matchCat;
  });

  const openAdd = () => { setForm({ ...EMPTY_FORM }); setEditing(null); setModal('add'); };
  const openEdit = (p: Product) => {
    setEditing(p);
    setForm({
      name: p.name, price: String(p.price), originalPrice: p.originalPrice ? String(p.originalPrice) : '',
      category: p.category, shortDescription: p.shortDescription, description: p.description ?? '',
      material: p.material ?? '', badge: p.badge ?? '',
      warrantyYears: p.warrantyYears ? String(p.warrantyYears) : '',
      features: p.features.join('\n'), colors: p.colors.join(', '), sizes: p.sizes.join(', '),
      inStock: p.inStock, isFeatured: p.isFeatured,
    });
    setModal('edit');
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const body = {
        name: form.name, price: parseFloat(form.price),
        originalPrice: form.originalPrice ? parseFloat(form.originalPrice) : null,
        category: form.category, shortDescription: form.shortDescription,
        description: form.description || null, material: form.material || null,
        badge: form.badge || null, warrantyYears: form.warrantyYears ? parseInt(form.warrantyYears) : null,
        features: form.features.split('\n').map(s => s.trim()).filter(Boolean),
        colors: form.colors.split(',').map(s => s.trim()).filter(Boolean),
        sizes: form.sizes.split(',').map(s => s.trim()).filter(Boolean),
        inStock: form.inStock, isFeatured: form.isFeatured,
      };
      if (modal === 'add') {
        await adminFetch('/admin/products', { method: 'POST', body: JSON.stringify(body) });
      } else if (editing) {
        await adminFetch(`/admin/products/${editing.id}`, { method: 'PUT', body: JSON.stringify(body) });
      }
      setModal(null);
      load();
    } finally { setSaving(false); }
  };

  const handleDelete = async (id: number) => {
    await adminFetch(`/admin/products/${id}`, { method: 'DELETE' });
    setDeleteId(null);
    load();
  };

  const toggleStock = async (p: Product) => {
    await adminFetch(`/admin/products/${p.id}`, { method: 'PUT', body: JSON.stringify({ ...p, inStock: !p.inStock }) });
    load();
  };

  const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div>
      <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">{label}</label>
      {children}
    </div>
  );

  const inp = "w-full h-10 px-3 rounded-lg border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none text-sm";
  const ta = "w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none text-sm resize-none";

  return (
    <AdminLayout title="Products">
      <div className="space-y-5">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="flex gap-2 flex-1 flex-wrap">
            <div className="relative flex-1 min-w-52">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..." className="w-full h-10 pl-9 pr-3 rounded-xl border border-gray-200 focus:border-orange-400 outline-none text-sm" />
            </div>
            <select value={catFilter} onChange={e => setCatFilter(e.target.value)} className="h-10 px-3 rounded-xl border border-gray-200 text-sm outline-none">
              <option value="">All Categories</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <button onClick={openAdd} className="flex items-center gap-2 h-10 px-5 rounded-xl text-white text-sm font-semibold shadow-sm" style={{ background: 'linear-gradient(135deg, #FF7A4D, #e8622a)' }}>
            <Plus className="h-4 w-4" /> Add Product
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  {['Product', 'Category', 'Price', 'Stock', 'Featured', 'Rating', 'Actions'].map(h => (
                    <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i}><td colSpan={7} className="px-5 py-4"><div className="h-5 bg-gray-100 rounded animate-pulse" /></td></tr>
                  ))
                ) : filtered.length === 0 ? (
                  <tr><td colSpan={7} className="text-center py-12 text-gray-400">No products found</td></tr>
                ) : filtered.map(p => (
                  <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0">
                          <Package className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-gray-800 max-w-[180px] truncate">{p.name}</div>
                          {p.badge && <span className="text-xs px-1.5 py-0.5 rounded bg-orange-100 text-orange-700">{p.badge}</span>}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4"><span className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 capitalize">{p.category}</span></td>
                    <td className="px-5 py-4">
                      <div className="text-sm font-bold text-gray-900">₹{p.price.toLocaleString('en-IN')}</div>
                      {p.originalPrice && <div className="text-xs text-gray-400 line-through">₹{p.originalPrice.toLocaleString('en-IN')}</div>}
                    </td>
                    <td className="px-5 py-4">
                      <button onClick={() => toggleStock(p)} className={`text-xs font-semibold px-2.5 py-1 rounded-full ${p.inStock ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'}`}>
                        {p.inStock ? 'In Stock' : 'Out of Stock'}
                      </button>
                    </td>
                    <td className="px-5 py-4">
                      {p.isFeatured ? <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-1 rounded-full">Featured</span> : <span className="text-xs text-gray-400">—</span>}
                    </td>
                    <td className="px-5 py-4">
                      {p.rating ? (
                        <div className="flex items-center gap-1">
                          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                          <span className="text-sm font-medium text-gray-700">{p.rating}</span>
                          <span className="text-xs text-gray-400">({p.reviewCount})</span>
                        </div>
                      ) : <span className="text-xs text-gray-400">—</span>}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => openEdit(p)} className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:border-orange-300 hover:text-primary transition-all">
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button onClick={() => setDeleteId(p.id)} className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:border-red-300 hover:text-red-500 transition-all">
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-3 border-t border-gray-100 text-xs text-gray-400">
            {filtered.length} product{filtered.length !== 1 ? 's' : ''} {catFilter && `in ${catFilter}`}
          </div>
        </div>
      </div>

      {/* Product Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
              <h2 className="text-lg font-bold text-gray-900">{modal === 'add' ? 'Add New Product' : 'Edit Product'}</h2>
              <button onClick={() => setModal(null)} className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Product Name">
                  <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className={inp} placeholder="e.g. Active Pro Mattress" />
                </Field>
                <Field label="Category">
                  <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className={inp}>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </Field>
                <Field label="Price (₹)">
                  <input type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} className={inp} placeholder="18999" />
                </Field>
                <Field label="Original Price (₹)">
                  <input type="number" value={form.originalPrice} onChange={e => setForm(f => ({ ...f, originalPrice: e.target.value }))} className={inp} placeholder="24999 (optional)" />
                </Field>
                <Field label="Badge">
                  <input value={form.badge} onChange={e => setForm(f => ({ ...f, badge: e.target.value }))} className={inp} placeholder="e.g. Best Seller (optional)" />
                </Field>
                <Field label="Material">
                  <input value={form.material} onChange={e => setForm(f => ({ ...f, material: e.target.value }))} className={inp} placeholder="e.g. Memory Foam" />
                </Field>
                <Field label="Warranty (Years)">
                  <input type="number" value={form.warrantyYears} onChange={e => setForm(f => ({ ...f, warrantyYears: e.target.value }))} className={inp} placeholder="e.g. 5" />
                </Field>
                <div className="flex flex-col gap-3 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.inStock} onChange={e => setForm(f => ({ ...f, inStock: e.target.checked }))} className="rounded" />
                    <span className="text-sm font-medium text-gray-700">In Stock</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.isFeatured} onChange={e => setForm(f => ({ ...f, isFeatured: e.target.checked }))} className="rounded" />
                    <span className="text-sm font-medium text-gray-700">Featured Product</span>
                  </label>
                </div>
              </div>
              <Field label="Short Description">
                <textarea value={form.shortDescription} onChange={e => setForm(f => ({ ...f, shortDescription: e.target.value }))} className={ta} rows={2} />
              </Field>
              <Field label="Full Description">
                <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} className={ta} rows={3} />
              </Field>
              <Field label="Features (one per line)">
                <textarea value={form.features} onChange={e => setForm(f => ({ ...f, features: e.target.value }))} className={ta} rows={3} placeholder="Dual-side design&#10;OekoTex certified&#10;15 year warranty" />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Colors (comma separated)">
                  <input value={form.colors} onChange={e => setForm(f => ({ ...f, colors: e.target.value }))} className={inp} placeholder="White, Cream, Grey" />
                </Field>
                <Field label="Sizes (comma separated)">
                  <input value={form.sizes} onChange={e => setForm(f => ({ ...f, sizes: e.target.value }))} className={inp} placeholder="Single, Double, Queen, King" />
                </Field>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex gap-3 justify-end">
              <button onClick={() => setModal(null)} className="h-10 px-5 rounded-xl border border-gray-200 text-sm font-medium hover:bg-gray-50">Cancel</button>
              <button onClick={handleSave} disabled={saving || !form.name || !form.price} className="h-10 px-6 rounded-xl text-white text-sm font-semibold disabled:opacity-60 shadow-sm" style={{ background: 'linear-gradient(135deg, #FF7A4D, #e8622a)' }}>
                {saving ? 'Saving...' : modal === 'add' ? 'Create Product' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full">
            <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center mb-4"><Trash2 className="h-6 w-6 text-red-500" /></div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Product?</h3>
            <p className="text-gray-500 text-sm mb-6">This action cannot be undone. The product will be permanently removed.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 h-10 rounded-xl border border-gray-200 text-sm font-medium hover:bg-gray-50">Cancel</button>
              <button onClick={() => handleDelete(deleteId)} className="flex-1 h-10 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600">Delete</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
