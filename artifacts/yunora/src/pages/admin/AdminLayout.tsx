import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { adminLogout, getAdminSession } from '@/lib/adminAuth';
import {
  LayoutDashboard, Package, ShoppingCart, Tag, Users, BarChart3,
  Settings, LogOut, Menu, X, ChevronRight, Bell, Store,
  MessageSquare, Star, FileText, Boxes
} from 'lucide-react';

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/orders', label: 'Orders', icon: ShoppingCart },
  { href: '/admin/categories', label: 'Categories', icon: Tag },
  { href: '/admin/inventory', label: 'Inventory', icon: Boxes },
  { href: '/admin/subscribers', label: 'Subscribers', icon: Users },
  { href: '/admin/reviews', label: 'Reviews', icon: Star },
  { href: '/admin/enquiries', label: 'Enquiries', icon: MessageSquare },
  { href: '/admin/cms', label: 'CMS', icon: FileText },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

interface AdminLayoutProps { children: React.ReactNode; title: string; }

export default function AdminLayout({ children, title }: AdminLayoutProps) {
  const [location, nav] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const session = getAdminSession();

  const handleLogout = () => {
    adminLogout();
    nav('/admin');
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar overlay (mobile) */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 flex flex-col bg-white border-r border-gray-100 shadow-xl transition-transform duration-300 lg:relative lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-gray-100">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-sm flex-shrink-0" style={{ background: 'linear-gradient(135deg, #FF7A4D, #e8622a)' }}>
            <Store className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="font-bold text-gray-900 text-sm leading-none">Yunora Admin</div>
            <div className="text-xs text-gray-400 mt-0.5">Control Panel</div>
          </div>
          <button className="ml-auto lg:hidden text-gray-400" onClick={() => setSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <div className="space-y-0.5">
            {navItems.map(item => {
              const Icon = item.icon;
              const active = location === item.href || location.startsWith(item.href + '/');
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    active
                      ? 'text-white shadow-sm'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  style={active ? { background: 'linear-gradient(135deg, #FF7A4D, #e8622a)' } : {}}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  {item.label}
                  {active && <ChevronRight className="h-3 w-3 ml-auto opacity-60" />}
                </Link>
              );
            })}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all"
            >
              <Store className="h-4 w-4 flex-shrink-0" />
              View Website
            </a>
          </div>
        </nav>

        {/* User */}
        <div className="p-3 border-t border-gray-100">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-orange-50">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: 'linear-gradient(135deg, #FF7A4D, #e8622a)' }}>
              {session?.username?.[0] ?? 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-gray-800 truncate">{session?.username ?? 'Admin'}</div>
              <div className="text-xs text-gray-400">Administrator</div>
            </div>
            <button onClick={handleLogout} className="text-gray-400 hover:text-red-500 transition-colors" title="Logout">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center gap-4 px-5 py-4 bg-white border-b border-gray-100 shadow-sm">
          <button className="lg:hidden text-gray-500 hover:text-gray-700" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-bold text-gray-900 flex-1">{title}</h1>
          <div className="flex items-center gap-2">
            <button className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-all">
              <Bell className="h-4 w-4" />
            </button>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold shadow-sm" style={{ background: 'linear-gradient(135deg, #FF7A4D, #e8622a)' }}>
              {session?.username?.[0] ?? 'A'}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-5 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
