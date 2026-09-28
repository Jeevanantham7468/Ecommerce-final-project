import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import Rating from './Rating';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden hover:shadow-xl hover:border-indigo-200 transition-all duration-300 flex flex-col h-full">
      {/* Product Image */}
      <Link
        to={`/products/${product._id}`}
        className="relative aspect-square overflow-hidden bg-slate-100 block"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {product.isFeatured && (
          <span className="absolute top-3 left-3 bg-indigo-600 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-sm">
            Featured
          </span>
        )}
        {product.countInStock === 0 && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px] flex items-center justify-center">
            <span className="bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
              Out of Stock
            </span>
          </div>
        )}
      </Link>

      {/* Product Details */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5 font-medium">
            <span>{product.brand}</span>
            <span className="text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md font-semibold">
              {product.category}
            </span>
          </div>

          <Link
            to={`/products/${product._id}`}
            className="font-semibold text-slate-900 text-base group-hover:text-indigo-600 transition line-clamp-1 mb-2"
            title={product.name}
          >
            {product.name}
          </Link>

          <div className="mb-3">
            <Rating value={product.rating} text={`(${product.numReviews})`} />
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-auto">
          <div>
            <span className="text-xs text-slate-400 block -mb-0.5">Price</span>
            <span className="text-xl font-bold text-slate-900">
              ${Number(product.price).toFixed(2)}
            </span>
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            disabled={product.countInStock === 0}
            className={`p-2.5 rounded-xl font-medium transition flex items-center space-x-1.5 shadow-sm ${
              product.countInStock > 0
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
            title={product.countInStock > 0 ? 'Add to cart' : 'Out of stock'}
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
