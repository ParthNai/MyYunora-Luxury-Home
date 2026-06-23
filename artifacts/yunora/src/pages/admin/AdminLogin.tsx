import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { adminLogin } from '@/lib/adminAuth';
import { Eye, EyeOff, Lock, User, ShieldCheck } from 'lucide-react';

export default function AdminLogin() {
  const [, nav] = useLocation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setTimeout(() => {
      const ok = adminLogin(username, password);
      if (ok) {
        nav('/admin/dashboard');
      } else {
        setError('Invalid username or password.');
      }
      setLoading(false);
    }, 600);
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #fff5f0 0%, #ffe8d6 50%, #ffd6b8 100%)' }}>
      <div className="w-full max-w-md px-4">
        {/* Logo / brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 shadow-lg" style={{ background: 'linear-gradient(135deg, #FF7A4D, #e8622a)' }}>
            <ShieldCheck className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Yunora Admin</h1>
          <p className="text-gray-500 mt-1 text-sm">Secure Admin Dashboard</p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-orange-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Sign in to your account</h2>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Username</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder="YunoraAdmin"
                  required
                  className="w-full h-12 pl-10 pr-4 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none text-sm transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                  className="w-full h-12 pl-10 pr-12 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none text-sm transition-all"
                />
                <button type="button" onClick={() => setShowPass(v => !v)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-xl font-semibold text-white text-sm transition-all shadow-md hover:shadow-lg disabled:opacity-70"
              style={{ background: 'linear-gradient(135deg, #FF7A4D, #e8622a)' }}
            >
              {loading ? 'Signing in...' : 'Sign In to Admin Panel'}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-gray-100">
            <p className="text-xs text-gray-400 text-center">
              Protected access. Unauthorized login attempts are logged.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
