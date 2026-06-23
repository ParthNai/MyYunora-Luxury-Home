import React, { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout';
import { adminFetch } from '@/lib/adminAuth';
import {
  Package, ShoppingCart, IndianRupee, Clock, CheckCircle,
  AlertTriangle, Users, Tag, TrendingUp, TrendingDown
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Area, AreaChart
} from 'recharts';

interface Stats {
  totalProducts: number; totalOrders: number; totalRevenue: number;
  pendingOrders: number; completedOrders: number; outOfStock: number;
  totalCategories: number; totalSubscribers: number;
  recentOrders: any[]; recentProducts: any[]; monthlySales: any[];
}

const statusColors: Record<string, string> = {
  pending: '#f59e0b', confirmed: '#3b82f6', processing: '#8b5cf6',
  shipped: '#06b6d4', delivered: '#10b981', cancelled: '#ef4444',
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminFetch<Stats>('/admin/stats').then(setStats).finally(() => setLoading(false));
  }, []);

  const statCards = stats ? [
    { label: 'Total Revenue', value: `₹${stats.totalRevenue.toLocaleString('en-IN')}`, icon: IndianRupee, color: '#FF7A4D', bg: '#fff5f0', change: '+12%' },
    { label: 'Total Orders', value: stats.totalOrders, icon: ShoppingCart, color: '#3b82f6', bg: '#eff6ff', change: '+8%' },
    { label: 'Products', value: stats.totalProducts, icon: Package, color: '#10b981', bg: '#f0fdf4', change: '+3%' },
    { label: 'Pending Orders', value: stats.pendingOrders, icon: Clock, color: '#f59e0b', bg: '#fffbeb', change: '' },
    { label: 'Completed', value: stats.completedOrders, icon: CheckCircle, color: '#10b981', bg: '#f0fdf4', change: '' },
    { label: 'Out of Stock', value: stats.outOfStock, icon: AlertTriangle, color: '#ef4444', bg: '#fef2f2', change: '' },
    { label: 'Subscribers', value: stats.totalSubscribers, icon: Users, color: '#8b5cf6', bg: '#f5f3ff', change: '+15%' },
    { label: 'Categories', value: stats.totalCategories, icon: Tag, color: '#06b6d4', bg: '#ecfeff', change: '' },
  ] : [];

  return (
    <AdminLayout title="Dashboard">
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="h-8 w-8 rounded-full border-4 border-orange-400 border-t-transparent animate-spin" />
        </div>
      ) : stats ? (
        <div className="space-y-6">
          {/* Stat cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {statCards.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: s.bg }}>
                      <Icon className="h-5 w-5" style={{ color: s.color }} />
                    </div>
                    {s.change && (
                      <span className="text-xs font-medium text-emerald-600 flex items-center gap-0.5">
                        <TrendingUp className="h-3 w-3" /> {s.change}
                      </span>
                    )}
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{s.value}</div>
                  <div className="text-xs text-gray-500 mt-0.5 font-medium">{s.label}</div>
                </div>
              );
            })}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue chart */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Monthly Revenue</h3>
              {stats.monthlySales.length > 0 ? (
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={stats.monthlySales}>
                    <defs>
                      <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FF7A4D" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#FF7A4D" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9ca3af' }} />
                    <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} />
                    <Tooltip formatter={(v: any) => [`₹${Number(v).toLocaleString('en-IN')}`, 'Revenue']} />
                    <Area type="monotone" dataKey="revenue" stroke="#FF7A4D" strokeWidth={2} fill="url(#revGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-48 flex items-center justify-center text-gray-400 text-sm">No sales data yet</div>
              )}
            </div>

            {/* Orders chart */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Monthly Orders</h3>
              {stats.monthlySales.length > 0 ? (
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={stats.monthlySales}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9ca3af' }} />
                    <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} />
                    <Tooltip />
                    <Bar dataKey="orders" fill="#FF7A4D" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-48 flex items-center justify-center text-gray-400 text-sm">No order data yet</div>
              )}
            </div>
          </div>

          {/* Recent */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Orders */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h3 className="font-bold text-gray-900">Recent Orders</h3>
              </div>
              <div className="divide-y divide-gray-50">
                {stats.recentOrders.length === 0 ? (
                  <div className="px-6 py-8 text-center text-gray-400 text-sm">No orders yet</div>
                ) : stats.recentOrders.map(o => (
                  <div key={o.id} className="px-6 py-3.5 flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-gray-800 truncate">{o.fullName}</div>
                      <div className="text-xs text-gray-400">{o.orderId}</div>
                    </div>
                    <div className="text-sm font-bold text-gray-900">₹{o.totalAmount.toLocaleString('en-IN')}</div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: `${statusColors[o.status]}20`, color: statusColors[o.status] }}>
                      {o.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Products */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h3 className="font-bold text-gray-900">Recent Products</h3>
              </div>
              <div className="divide-y divide-gray-50">
                {stats.recentProducts.length === 0 ? (
                  <div className="px-6 py-8 text-center text-gray-400 text-sm">No products yet</div>
                ) : stats.recentProducts.map(p => (
                  <div key={p.id} className="px-6 py-3.5 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0">
                      <Package className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-gray-800 truncate">{p.name}</div>
                      <div className="text-xs text-gray-400 capitalize">{p.category}</div>
                    </div>
                    <div className="text-sm font-bold text-gray-900">₹{Number(p.price).toLocaleString('en-IN')}</div>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${p.inStock ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'}`}>
                      {p.inStock ? 'In Stock' : 'Out'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-16">Failed to load dashboard data.</div>
      )}
    </AdminLayout>
  );
}
