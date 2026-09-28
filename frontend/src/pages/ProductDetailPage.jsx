import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, Check, ShieldCheck, Truck, RefreshCw, Star } from 'lucide-react';
import { apiClient } from '../api/client';
import Rating from '../components/Rating';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { user } = useAuth();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Review submission state
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewError, setReviewError] = useState(null);
  const [reviewSuccess, setReviewSuccess] = useState(false);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const data = await apiClient(`/products/${id}`);
      setProduct(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setReviewLoading(true);
    setReviewError(null);
    setReviewSuccess(false);

    try {
      await apiClient(`/products/${id}/reviews`, {
        method: 'POST',
        data: { rating, comment },
      });
      setReviewSuccess(true);
      setComment('');
      fetchProduct(); // Reload reviews and recalculated rating
    } catch (err) {
      setReviewError(err.message);
    } finally {
      setReviewLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="aspect-square bg-slate-200 rounded-3xl"></div>
          <div className="space-y-4">
            <div className="h-8 bg-slate-200 rounded w-3/4"></div>
            <div className="h-6 bg-slate-200 rounded w-1/4"></div>
            <div className="h-24 bg-slate-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-slate-800">Product Not Found</h2>
        <p className="text-sm text-slate-500 mt-2">{error || 'This product does not exist.'}</p>
        <Link
          to="/products"
          className="inline-flex items-center mt-4 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Back button */}
      <Link
        to="/products"
        className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-indigo-600 transition"
      >
        <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Catalog
      </Link>

      {/* Main product overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Product Image */}
        <div className="aspect-square rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-sm relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {product.isFeatured && (
            <span className="absolute top-4 left-4 bg-indigo-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
              Featured Pick
            </span>
          )}
        </div>

        {/* Product Info & Action */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-2">
              <span>{product.brand}</span>
              <span>•</span>
              <span className="bg-indigo-50 px-2 py-0.5 rounded text-indigo-700">
                {product.category}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {product.name}
            </h1>
            <div className="mt-3 flex items-center space-x-3">
              <Rating value={product.rating} text={`${product.numReviews} customer reviews`} />
            </div>
          </div>

          <div className="text-3xl font-extrabold text-slate-900">
            ${Number(product.price).toFixed(2)}
          </div>

          <p className="text-slate-600 leading-relaxed text-sm sm:text-base border-t border-b border-slate-200 py-4">
            {product.description}
          </p>

          {/* Stock & Quantity Selection */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500 font-medium">Availability:</span>
              <span
                className={`font-semibold ${
                  product.countInStock > 0 ? 'text-emerald-600' : 'text-rose-600'
                }`}
              >
                {product.countInStock > 0
                  ? `In Stock (${product.countInStock} available)`
                  : 'Out of Stock'}
              </span>
            </div>

            {product.countInStock > 0 && (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-slate-500 font-medium">Quantity:</span>
                <div className="flex items-center border border-slate-300 rounded-xl bg-white overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="px-3.5 py-2 text-slate-600 hover:bg-slate-100 font-bold transition"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-sm font-semibold text-slate-800">
                    {qty}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQty(Math.min(product.countInStock, qty + 1))}
                    className="px-3.5 py-2 text-slate-600 hover:bg-slate-100 font-bold transition"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            <button
              onClick={() => addToCart(product, qty)}
              disabled={product.countInStock === 0}
              className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center space-x-2 shadow-lg transition ${
                product.countInStock > 0
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/30'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <ShoppingBag className="w-5 h-5" />
              <span>{product.countInStock > 0 ? 'Add to Shopping Cart' : 'Currently Unavailable'}</span>
            </button>
          </div>

          {/* Guarantees */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200 text-xs text-slate-500">
            <div className="flex items-center space-x-2">
              <Truck className="w-4 h-4 text-indigo-600" />
              <span>Free standard delivery over $100</span>
            </div>
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              <span>1-year manufacturer warranty</span>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 space-y-8">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900">
            Customer Reviews ({product.reviews.length})
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Real feedback from verified buyers who purchased this product.
          </p>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {product.reviews.length === 0 ? (
            <p className="text-sm text-slate-400 italic">No reviews yet for this product. Be the first to share your thoughts!</p>
          ) : (
            product.reviews.map((r, index) => (
              <div key={index} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-800">{r.name}</span>
                  <Rating value={r.rating} />
                </div>
                <p className="text-xs text-slate-400">
                  {new Date(r.createdAt || Date.now()).toLocaleDateString()}
                </p>
                <p className="text-sm text-slate-600 pt-1">{r.comment}</p>
              </div>
            ))
          )}
        </div>

        {/* Add Review Form */}
        <div className="border-t border-slate-200 pt-8">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Write a Review</h3>

          {user ? (
            <form onSubmit={handleReviewSubmit} className="space-y-4 max-w-xl">
              {reviewSuccess && (
                <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl text-sm font-medium">
                  Thank you! Your review has been recorded.
                </div>
              )}
              {reviewError && (
                <div className="p-3 bg-rose-50 text-rose-700 rounded-xl text-sm font-medium">
                  {reviewError}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Rating:
                </label>
                <select
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-indigo-500"
                >
                  <option value={5}>5 - Excellent</option>
                  <option value={4}>4 - Very Good</option>
                  <option value={3}>3 - Average</option>
                  <option value={2}>2 - Fair</option>
                  <option value={1}>1 - Poor</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Review Comment:
                </label>
                <textarea
                  rows={4}
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share details of your experience with this item..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>

              <button
                type="submit"
                disabled={reviewLoading}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition"
              >
                {reviewLoading ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          ) : (
            <div className="p-4 bg-slate-100 rounded-2xl text-sm text-slate-600">
              Please{' '}
              <Link to="/login" className="text-indigo-600 font-semibold underline">
                sign in
              </Link>{' '}
              to write a customer review.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
