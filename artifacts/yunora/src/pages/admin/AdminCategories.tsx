import React, { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout';
import { adminFetch } from '@/lib/adminAuth';
import { Plus, Pencil, Trash2, X, Tag } from 'lucide-react';

interface Category { id: number; name: string; slug: string; image: string | null; productCount: number; description: string | null; }
const EMPTY = { name: '', slug: '', image: '', description: '' };

export default function AdminCategories() {
  const [cats, setCats] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<'add' | 'edit' | null>(null);
  const [editing, setEditing] = useState<Category | null>(null);
  const [form, setForm] = useState({ ...EMPTY });
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const load = () => adminFetch<Category[]>('/admin/categories').then(setCats).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const openAdd = () => { setForm({ ...EMPTY }); setEditing(null); setModal('add'); };
  const openEdit = (c: Category) => { setEditing(c); setForm({ name: c.name, slug: c.slug, image: c.image ?? '', description: c.description ?? '' }); setModal('edit'); };

  const handleSave = async () => {
    setSaving(true);
    try {
      const body = { name: form.name, slug: form.slug, image: form.image || null, description: form.description || null };
      if (modal === 'add') await adminFetch('/admin/categories', { method: 'POST', body: JSON.stringify(body) });
      else if (editing) await adminFetch(`/admin/categories/${editing.id}`, { method: 'PUT', body: JSON.stringify(body) });
      setModal(null); load();
    } finally { setSaving(false); }
  };

  const handleDelete = async (id: number) => {
    await adminFetch(`/admin/categories/${id}`, { method: 'DELETE' });
    setDeleteId(null); load();
  };

  const autoSlug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const inp = "w-full h-10 px-3 rounded-lg border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none text-sm";

  return (
    <AdminLayout title="Categories">
      <div className="space-y-5">
        <div className="flex justify-end">
          <button onClick={openAdd} className="flex items-center gap-2 h-10 px-5 rounded-xl text-white text-sm font-semibold shadow-sm" style={{ background: 'linear-gradient(135deg, #FF7A4D, #e8622a)' }}>
            <Plus className="h-4 w-4" /> Add Category
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading ? Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl h-32 animate-pulse border border-gray-100" />
          )) : cats.map(c => (
            <div key={c.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-28 bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center relative">
                {c.image ? (
                  <img src={c.image} alt={c.name} className="w-full h-full object-cover" />
                ) : (
                  <Tag className="h-10 w-10 text-orange-200" />
                )}
                <div className="absolute top-3 right-3 flex gap-1.5">
                  <button onClick={() => openEdit(c)} className="w-7 h-7 rounded-lg bg-white/90 flex items-center justify-center shadow-sm hover:bg-white transition-all">
                    <Pencil className="h-3 w-3 text-gray-600" />
                  </button>
                  <button onClick={() => setDeleteId(c.id)} className="w-7 h-7 rounded-lg bg-white/90 flex items-center justify-center shadow-sm hover:bg-white transition-all">
                    <Trash2 className="h-3 w-3 text-red-500" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900">{c.name}</h3>
                <p className="text-xs text-gray-400 mt-0.5">Slug: {c.slug}</p>
                <p className="text-xs text-gray-500 mt-1">{c.productCount} products</p>
                {c.description && <p className="text-xs text-gray-500 mt-1 line-clamp-2">{c.description}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="font-bold text-gray-900">{modal === 'add' ? 'Add Category' : 'Edit Category'}</h2>
              <button onClick={() => setModal(null)} className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center"><X className="h-4 w-4" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Name</label>
                <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value, slug: autoSlug(e.target.value) }))} className={inp} placeholder="e.g. Mattresses" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Slug</label>
                <input value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} className={inp} placeholder="e.g. mattresses" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Image URL</label>
                <input value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} className={inp} placeholder="https://..." />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Description</label>
                <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-orange-400 outline-none text-sm resize-none" rows={2} />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex gap-3 justify-end">
              <button onClick={() => setModal(null)} className="h-10 px-5 rounded-xl border border-gray-200 text-sm font-medium hover:bg-gray-50">Cancel</button>
              <button onClick={handleSave} disabled={saving || !form.name} className="h-10 px-6 rounded-xl text-white text-sm font-semibold disabled:opacity-60 shadow-sm" style={{ background: 'linear-gradient(135deg, #FF7A4D, #e8622a)' }}>
                {saving ? 'Saving...' : modal === 'add' ? 'Create' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Category?</h3>
            <p className="text-gray-500 text-sm mb-6">This will permanently delete the category.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 h-10 rounded-xl border border-gray-200 text-sm font-medium">Cancel</button>
              <button onClick={() => handleDelete(deleteId)} className="flex-1 h-10 rounded-xl bg-red-500 text-white text-sm font-semibold">Delete</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
