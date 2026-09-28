import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, Lock, Mail, ArrowRight, UserCheck, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, user, loading, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirect = new URLSearchParams(location.search).get('redirect') || '/';

  useEffect(() => {
    if (user) {
      navigate(redirect);
    }
  }, [user, navigate, redirect]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate(redirect);
    } catch {
      // Error handled in auth context
    }
  };

  const fillCustomerDemo = () => {
    setEmail('user@example.com');
    setPassword('password123');
  };

  const fillAdminDemo = () => {
    setEmail('admin@example.com');
    setPassword('admin123');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-8">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mx-auto shadow-md shadow-indigo-200">
          <ShoppingBag className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Welcome back to AuraStore
        </h1>
        <p className="text-xs text-slate-500">
          Sign in to access your orders, saved items, and settings
        </p>
      </div>

      {/* One-Click Evaluation Demo Credentials Box */}
      <div className="bg-indigo-50/70 border border-indigo-100 rounded-2xl p-4 space-y-2.5">
        <p className="text-[11px] font-bold uppercase tracking-wider text-indigo-700">
          ⚡ Quick Demo Credentials (Click to Autofill)
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={fillCustomerDemo}
            className="flex-1 py-1.5 px-2 bg-white text-indigo-700 border border-indigo-200 rounded-xl text-xs font-semibold hover:bg-indigo-600 hover:text-white transition flex items-center justify-center gap-1 shadow-sm"
          >
            <UserCheck className="w-3.5 h-3.5" /> Customer Demo
          </button>
          <button
            type="button"
            onClick={fillAdminDemo}
            className="flex-1 py-1.5 px-2 bg-white text-indigo-700 border border-indigo-200 rounded-xl text-xs font-semibold hover:bg-indigo-600 hover:text-white transition flex items-center justify-center gap-1 shadow-sm"
          >
            <Shield className="w-3.5 h-3.5" /> Admin Demo
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
        {error && (
          <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500"
              />
              <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Password</label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500"
              />
              <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/20 transition flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            <span>{loading ? 'Signing In...' : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
          Don't have an account?{' '}
          <Link
            to={`/register?redirect=${encodeURIComponent(redirect)}`}
            className="text-indigo-600 font-bold hover:underline"
          >
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}
