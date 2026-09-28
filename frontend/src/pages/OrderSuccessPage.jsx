import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, Package, ArrowRight, Home, Clock } from 'lucide-react';
import { apiClient } from '../api/client';

export default function OrderSuccessPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const data = await apiClient(`/orders/${id}`);
        setOrder(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center animate-pulse">
        <div className="w-16 h-16 bg-slate-200 rounded-full mx-auto mb-4"></div>
        <div className="h-6 bg-slate-200 rounded w-1/3 mx-auto"></div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold text-slate-800">Order Information Unavailable</h2>
        <p className="text-sm text-slate-500 mt-2">{error}</p>
        <Link to="/" className="inline-flex items-center mt-4 text-indigo-600 font-semibold">
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Success Badge & Headline */}
      <div className="text-center space-y-3">
        <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Thank you for your order!
        </h1>
        <p className="text-sm text-slate-500">
          Order reference: <span className="font-mono font-bold text-slate-800">{order._id}</span>
        </p>
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold">
          <Clock className="w-3.5 h-3.5" />
          <span>Status: {order.status}</span>
        </div>
      </div>

      {/* Itemized Order Receipt Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
        <h3 className="font-bold text-slate-900 text-lg border-b border-slate-100 pb-3">
          Order Summary & Delivery
        </h3>

        {/* Delivery Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-600 bg-slate-50 p-4 rounded-2xl">
          <div>
            <span className="font-bold text-slate-800 block mb-1">Delivering To:</span>
            <p>{order.shippingAddress.street}</p>
            <p>
              {order.shippingAddress.city}, {order.shippingAddress.postalCode}
            </p>
            <p>{order.shippingAddress.country}</p>
          </div>
          <div>
            <span className="font-bold text-slate-800 block mb-1">Payment Method:</span>
            <p>{order.paymentMethod}</p>
            <p className="mt-1">
              Payment Status:{' '}
              <span className={`font-bold ${order.isPaid ? 'text-emerald-600' : 'text-amber-600'}`}>
                {order.isPaid ? 'Paid' : 'Pending (Cash on Delivery)'}
              </span>
            </p>
          </div>
        </div>

        {/* Ordered Items */}
        <div className="divide-y divide-slate-100">
          {order.orderItems.map((item, index) => (
            <div key={index} className="py-3 flex items-center justify-between text-sm">
              <div className="flex items-center space-x-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 rounded-xl object-cover bg-slate-100"
                />
                <div>
                  <p className="font-bold text-slate-800">{item.name}</p>
                  <p className="text-xs text-slate-400">Qty: {item.qty}</p>
                </div>
              </div>
              <span className="font-bold text-slate-900">${(item.price * item.qty).toFixed(2)}</span>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="border-t border-slate-100 pt-4 space-y-1.5 text-xs text-slate-600 text-right">
          <div>
            Subtotal: <span className="font-bold text-slate-800">${order.itemsPrice.toFixed(2)}</span>
          </div>
          <div>
            Shipping: <span className="font-bold text-slate-800">${order.shippingPrice.toFixed(2)}</span>
          </div>
          <div>
            Tax: <span className="font-bold text-slate-800">${order.taxPrice.toFixed(2)}</span>
          </div>
          <div className="text-base font-extrabold text-slate-900 pt-2 border-t border-slate-100">
            Total Paid: <span className="text-indigo-600">${order.totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          to="/profile"
          className="inline-flex items-center justify-center px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-2xl shadow-md transition"
        >
          <Package className="w-4 h-4 mr-2" /> View in Order History
        </Link>
        <Link
          to="/products"
          className="inline-flex items-center justify-center px-6 py-3.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold rounded-2xl transition"
        >
          <Home className="w-4 h-4 mr-2" /> Back to Store
        </Link>
      </div>
    </div>
  );
}
