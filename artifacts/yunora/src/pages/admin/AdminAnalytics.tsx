import React, { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout';
import { adminFetch } from '@/lib/adminAuth';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, Legend } from 'recharts';
import { TrendingUp, IndianRupee, ShoppingCart, Users } from 'lucide-react';

interface Stats { totalRevenue: number; totalOrders: number; totalSubscribers: number; monthlySales: any[]; recentOrders: any[]; }

const COLORS = ['#FF7A4D', '#FFB38A', '#FF9A6C', '#e8622a', '#ffd6b8', '#ffede0'];

export default function AdminAnalytics() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { adminFetch<Stats>('/admin/stats').then(setStats).finally(() => setLoading(false)); }, []);

  if (loading) return <AdminLayout title="Analytics"><div className="flex items-center justify-center h-64"><div className="h-8 w-8 rounded-full border-4 border-orange-400 border-t-transparent animate-spin" /></div></AdminLayout>;

  const statusData = stats?.recentOrders.reduce((acc: any[], o) => {
    const ex = acc.find(x => x.name === o.status);
    if (ex) ex.value++;
    else acc.push({ name: o.status, value: 1 });
    return acc;
  }, []) ?? [];

  return (
    <AdminLayout title="Analytics">
      <div className="space-y-6">
        {/* KPI row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Revenue', value: `₹${(stats?.totalRevenue ?? 0).toLocaleString('en-IN')}`, icon: IndianRupee, pct: '+12% this month' },
            { label: 'Total Orders', value: stats?.totalOrders ?? 0, icon: ShoppingCart, pct: '+8% this month' },
            { label: 'Avg Order Value', value: stats?.totalOrders ? `₹${Math.round((stats.totalRevenue ?? 0) / stats.totalOrders).toLocaleString('en-IN')}` : '₹0', icon: TrendingUp, pct: '' },
            { label: 'Subscribers', value: stats?.totalSubscribers ?? 0, icon: Users, pct: '+15% this month' },
          ].map((k, i) => {
            const Icon = k.icon;
            return (
              <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center"><Icon className="h-4 w-4 text-primary" /></div>
                </div>
                <div className="text-2xl font-bold text-gray-900">{k.value}</div>
                <div className="text-xs text-gray-500 mt-0.5">{k.label}</div>
                {k.pct && <div className="text-xs text-emerald-600 font-medium mt-1">{k.pct}</div>}
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue trend */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4">Revenue Trend</h3>
            {(stats?.monthlySales ?? []).length > 0 ? (
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={stats?.monthlySales}>
                  <defs>
                    <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FF7A4D" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#FF7A4D" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9ca3af' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} />
                  <Tooltip formatter={(v: any) => [`₹${Number(v).toLocaleString('en-IN')}`, 'Revenue']} />
                  <Area type="monotone" dataKey="revenue" stroke="#FF7A4D" strokeWidth={2.5} fill="url(#grad1)" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-56 flex items-center justify-center text-gray-300 text-sm">No data available yet</div>
            )}
          </div>

          {/* Order status pie */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4">Order Status</h3>
            {statusData.length > 0 ? (
              <>
                <ResponsiveContainer width="100%" height={160}>
                  <PieChart>
                    <Pie data={statusData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                      {statusData.map((_: any, i: number) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-1.5 mt-2">
                  {statusData.map((d: any, i: number) => (
                    <div key={i} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
                        <span className="text-gray-600 capitalize">{d.name}</span>
                      </div>
                      <span className="font-semibold text-gray-800">{d.value}</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="h-40 flex items-center justify-center text-gray-300 text-sm">No orders yet</div>
            )}
          </div>
        </div>

        {/* Orders bar chart */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4">Monthly Orders</h3>
          {(stats?.monthlySales ?? []).length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={stats?.monthlySales}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9ca3af' }} />
                <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} />
                <Tooltip />
                <Bar dataKey="orders" fill="#FF7A4D" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-48 flex items-center justify-center text-gray-300 text-sm">No data available yet</div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
