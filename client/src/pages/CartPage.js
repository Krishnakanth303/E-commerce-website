import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function CartPage() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/cart/guest_user');
      setCart(response.data.data || response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching cart:', error);
      setError('Failed to load cart.');
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    try {
      if (newQuantity < 1) return;
      
      await axios.put('/api/cart/update', {
        userId: 'guest_user',
        productId,
        quantity: newQuantity
      });
      
      fetchCart();
    } catch (error) {
      console.error('Error updating quantity:', error);
      alert('Failed to update quantity');
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await axios.delete(`/api/cart/guest_user/${productId}`);
      fetchCart();
    } catch (error) {
      console.error('Error removing item:', error);
      alert('Failed to remove item from cart');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
          <button 
            onClick={fetchCart}
            className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const isEmpty = !cart || !cart.items || cart.items.length === 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>

      {isEmpty ? (
        <div className="bg-white rounded-lg shadow-lg p-12 text-center">
          <svg
            className="mx-auto h-24 w-24 text-gray-400 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Start shopping to add items to your cart</p>
          <Link
            to="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item) => (
              <div key={item._id} className="bg-white rounded-lg shadow-lg p-6 flex gap-4">
                <img
                  src={item.productId?.image}
                  alt={item.productId?.name}
                  className="w-24 h-24 object-cover rounded"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/150?text=Product';
                  }}
                />
                
                <div className="flex-grow">
                  <Link
                    to={`/product/${item.productId?._id}`}
                    className="text-lg font-semibold text-gray-800 hover:text-blue-600"
                  >
                    {item.productId?.name}
                  </Link>
                  <p className="text-gray-600 text-sm mt-1">
                    {item.productId?.category}
                  </p>
                  <p className="text-blue-600 font-bold mt-2">
                    ₹{item.price?.toLocaleString('en-IN')}
                  </p>
                </div>

                <div className="flex flex-col items-end justify-between">
                  <button
                    onClick={() => removeFromCart(item.productId?._id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.productId?._id, item.quantity - 1)}
                      className="bg-gray-200 text-gray-700 w-8 h-8 rounded hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="w-12 text-center font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId?._id, item.quantity + 1)}
                      className="bg-gray-200 text-gray-700 w-8 h-8 rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>

                  <p className="text-gray-800 font-bold mt-2">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-20">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cart.items?.length} items)</span>
                  <span>₹{cart.totalPrice?.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600">FREE</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-lg font-bold text-gray-800">
                  <span>Total</span>
                  <span>₹{cart.totalPrice?.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold mb-3">
                Proceed to Checkout
              </button>
              
              <Link
                to="/"
                className="block w-full text-center bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition font-semibold"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;