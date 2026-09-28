import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ArrowRight, ArrowLeft, ShoppingBag, Tag, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function CartPage() {
  const {
    cartItems,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState(null);

  const applyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'SAVE15') {
      const disc = Number((itemsPrice * 0.15).toFixed(2));
      setDiscount(disc);
      setPromoMessage({ type: 'success', text: 'Coupon SAVE15 applied (-15%)!' });
    } else {
      setDiscount(0);
      setPromoMessage({ type: 'error', text: 'Invalid promo code. Try SAVE15' });
    }
  };

  const finalTotal = Number(Math.max(0, totalPrice - discount).toFixed(2));

  const handleCheckout = () => {
    if (!user) {
      navigate('/login?redirect=/checkout');
    } else {
      navigate('/checkout');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900">Your Cart is Empty</h2>
        <p className="text-slate-500 max-w-md mx-auto text-sm">
          Looks like you haven't added anything to your cart yet. Explore our curated catalog to find what you love!
        </p>
        <Link
          to="/products"
          className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-2xl shadow-lg shadow-indigo-600/20 transition"
        >
          Explore Catalog <ArrowRight className="w-4 h-4 ml-2" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Shopping Cart</h1>
          <p className="text-sm text-slate-500 mt-1">
            You have {cartItems.reduce((acc, item) => acc + item.qty, 0)} items in your cart
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs font-semibold text-rose-600 hover:text-rose-700 underline"
        >
          Clear entire cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-3xl border border-slate-200 divide-y divide-slate-100 overflow-hidden shadow-sm">
            {cartItems.map((item) => (
              <div key={item.product} className="p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 rounded-2xl object-cover bg-slate-100 flex-shrink-0"
                />

                <div className="flex-1 min-w-0 text-center sm:text-left">
                  <Link
                    to={`/products/${item.product}`}
                    className="font-bold text-slate-900 hover:text-indigo-600 transition text-base block truncate"
                  >
                    {item.name}
                  </Link>
                  <p className="text-sm text-slate-500 mt-0.5">${Number(item.price).toFixed(2)} each</p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 overflow-hidden">
                  <button
                    onClick={() => updateQuantity(item.product, item.qty - 1)}
                    className="px-3 py-1.5 text-slate-600 hover:bg-slate-200 transition font-bold"
                  >
                    -
                  </button>
                  <span className="px-3.5 py-1.5 text-xs font-bold text-slate-800">
                    {item.qty}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.product, item.qty + 1)}
                    disabled={item.qty >= item.countInStock}
                    className="px-3 py-1.5 text-slate-600 hover:bg-slate-200 transition font-bold disabled:opacity-40"
                  >
                    +
                  </button>
                </div>

                <div className="text-right font-extrabold text-slate-900 text-base sm:w-24">
                  ${(item.price * item.qty).toFixed(2)}
                </div>

                <button
                  onClick={() => removeFromCart(item.product)}
                  className="p-2 text-slate-400 hover:text-rose-600 transition"
                  title="Remove item"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          <Link
            to="/products"
            className="inline-flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Continue Shopping
          </Link>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-6 shadow-sm">
            <h3 className="font-extrabold text-lg text-slate-900">Order Summary</h3>

            {/* Price Calculations */}
            <div className="space-y-3 text-sm text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-slate-900">${itemsPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span className="font-bold text-slate-900">
                  {shippingPrice === 0 ? (
                    <span className="text-emerald-600 font-bold uppercase text-xs">Free</span>
                  ) : (
                    `$${shippingPrice.toFixed(2)}`
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Tax (8%)</span>
                <span className="font-bold text-slate-900">${taxPrice.toFixed(2)}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Discount (SAVE15)</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}

              <div className="border-t border-slate-200 pt-3 flex justify-between text-base font-extrabold text-slate-900">
                <span>Total</span>
                <span className="text-xl text-indigo-600">${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Promo Code Form */}
            <form onSubmit={applyPromo} className="pt-2 border-t border-slate-100 space-y-2">
              <label className="block text-xs font-semibold text-slate-700">Promo Code</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. SAVE15"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs uppercase tracking-wider font-mono focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition"
                >
                  Apply
                </button>
              </div>
              {promoMessage && (
                <p
                  className={`text-xs font-medium ${
                    promoMessage.type === 'success' ? 'text-emerald-600' : 'text-rose-600'
                  }`}
                >
                  {promoMessage.text}
                </p>
              )}
            </form>

            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-600/30 transition flex items-center justify-center space-x-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
