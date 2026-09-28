import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Zap, Shield, RefreshCw } from 'lucide-react';
import { apiClient } from '../api/client';
import ProductCard from '../components/ProductCard';

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        setLoading(true);
        const data = await apiClient('/products?featured=true');
        setFeaturedProducts(data.slice(0, 6));
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  const categories = [
    {
      name: 'Electronics',
      description: 'Audio, cameras & accessories',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80',
    },
    {
      name: 'Fashion',
      description: 'Footwear & contemporary wear',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=80',
    },
    {
      name: 'Accessories',
      description: 'Watches, bags & shades',
      image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500&auto=format&fit=crop&q=80',
    },
    {
      name: 'Home',
      description: 'Smart lamps & artisan kitchenware',
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&auto=format&fit=crop&q=80',
    },
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white my-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.25),transparent_50%)]"></div>
        <div className="max-w-7xl mx-auto px-6 py-16 sm:py-24 lg:py-28 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-xl space-y-6 text-center md:text-left">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full Stack E-Commerce Showcase</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Elevate Your Lifestyle with Curated Essentials.
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Explore premium electronics, designer accessories, and home goods built on a high-performance MERN architecture.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-2">
              <Link
                to="/products"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-lg shadow-indigo-600/30 transition transform hover:-translate-y-0.5"
              >
                <span>Shop All Products</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link
                to="/products?category=Electronics"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold backdrop-blur-sm transition"
              >
                Featured Electronics
              </Link>
            </div>
          </div>

          <div className="relative w-full max-w-sm sm:max-w-md aspect-square rounded-3xl overflow-hidden shadow-2xl border border-white/10">
            <img
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80"
              alt="Hero product"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex items-center justify-between">
              <div>
                <p className="text-xs text-indigo-300 font-medium">Editor's Pick</p>
                <h4 className="text-sm font-bold text-white">Sony WH-1000XM5</h4>
              </div>
              <span className="text-sm font-extrabold text-white bg-indigo-600 px-3 py-1 rounded-xl">
                $349.99
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Shop by Category
            </h2>
            <p className="text-sm text-slate-500 mt-1">Browse our top selected departments</p>
          </div>
          <Link
            to="/products"
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 flex items-center"
          >
            See all catalog <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={`/products?category=${encodeURIComponent(cat.name)}`}
              className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-100 border border-slate-200 block shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-white font-bold text-lg group-hover:text-indigo-300 transition">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">{cat.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center space-x-2 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-1">
              <Zap className="w-4 h-4" />
              <span>Trending Today</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Featured Products
            </h2>
          </div>
          <Link
            to="/products"
            className="hidden sm:flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-700"
          >
            View all products <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-80 bg-slate-200/70 rounded-2xl animate-pulse"></div>
            ))}
          </div>
        ) : error ? (
          <div className="p-8 text-center bg-rose-50 rounded-2xl text-rose-600 text-sm">
            Could not load featured products: {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Value Proposition Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-indigo-600 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl shadow-indigo-600/20">
          <div className="max-w-xl space-y-4">
            <span className="text-xs uppercase tracking-widest font-bold text-indigo-200">
              Limited Time Special
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold">
              Get 15% Off Your First Order
            </h3>
            <p className="text-indigo-100 text-sm leading-relaxed">
              Use promo code <span className="font-mono font-bold bg-indigo-700 px-2 py-0.5 rounded">SAVE15</span> at checkout to unlock savings across all premium categories.
            </p>
          </div>
          <Link
            to="/products"
            className="px-6 py-3.5 bg-white text-indigo-600 font-bold rounded-2xl hover:bg-slate-100 transition shadow-md whitespace-nowrap"
          >
            Start Shopping
          </Link>
        </div>
      </section>
    </div>
  );
}
