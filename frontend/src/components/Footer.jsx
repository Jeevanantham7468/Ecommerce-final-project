import React from 'react';
import { ShoppingBag, Heart, Github, Linkedin, ShieldCheck, Truck, Headphones } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-20 border-t border-slate-800">
      {/* Value Badges Banner */}
      <div className="border-b border-slate-800/80 py-10 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">Free Express Shipping</h4>
                <p className="text-xs text-slate-400">On all domestic orders over $100</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">Secure Checkout</h4>
                <p className="text-xs text-slate-400">Encrypted payment & data protection</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                <Headphones className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">24/7 Dedicated Support</h4>
                <p className="text-xs text-slate-400">Always here to assist with your purchases</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <span className="font-bold text-xl text-white">AuraStore</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              A comprehensive MERN stack e-commerce web application featuring real-time catalog search, secure JWT authentication, cart state management, checkout, and admin controls.
            </p>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Explore</h5>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/" className="hover:text-indigo-400 transition">Featured Products</Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-indigo-400 transition">All Catalog</Link>
              </li>
              <li>
                <Link to="/products?category=Electronics" className="hover:text-indigo-400 transition">Electronics</Link>
              </li>
              <li>
                <Link to="/products?category=Fashion" className="hover:text-indigo-400 transition">Fashion & Apparel</Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Account</h5>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/login" className="hover:text-indigo-400 transition">Sign In</Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-indigo-400 transition">Register</Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-indigo-400 transition">Order History</Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-indigo-400 transition">My Cart</Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Assignment Info</h5>
            <p className="text-xs text-slate-400 mb-3">
              EMC Full Stack Program Final Assignment. Built with React, Express, MongoDB, Node.js & Tailwind CSS.
            </p>
            <div className="flex items-center space-x-3 text-slate-400">
              <span className="inline-flex items-center text-xs px-2.5 py-1 rounded bg-slate-800 text-indigo-300 font-mono">
                MERN Stack
              </span>
              <span className="inline-flex items-center text-xs px-2.5 py-1 rounded bg-slate-800 text-emerald-300 font-mono">
                v1.0.0
              </span>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} AuraStore MERN Application. All rights reserved.</p>
          <p className="mt-2 sm:mt-0 flex items-center">
            Designed for EMC Final Evaluation
          </p>
        </div>
      </div>
    </footer>
  );
}
