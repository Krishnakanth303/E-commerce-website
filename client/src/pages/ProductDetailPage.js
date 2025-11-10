import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [cartMessage, setCartMessage] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/products/${id}`);
      setProduct(response.data.data || response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching product:', error);
      setError('Failed to load product details.');
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async () => {
    try {
      setAddingToCart(true);
      await axios.post('/api/cart/add', {
        userId: 'guest_user', // Temporary user ID
        productId: product._id,
        quantity,
        price: product.price
      });
      setCartMessage({ type: 'success', text: 'Product added to cart successfully!' });
      setTimeout(() => setCartMessage(null), 3000);
    } catch (error) {
      console.error('Error adding to cart:', error);
      setCartMessage({ type: 'error', text: 'Failed to add product to cart.' });
      setTimeout(() => setCartMessage(null), 3000);
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error || 'Product not found'}</p>
          <Link to="/" className="mt-2 inline-block bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link to="/" className="text-blue-600 hover:underline">Home</Link>
        <span className="mx-2 text-gray-500">/</span>
        <span className="text-gray-700">{product.name}</span>
      </div>

      {/* Cart Message */}
      {cartMessage && (
        <div className={`mb-6 p-4 rounded-lg ${
          cartMessage.type === 'success' ? 'bg-green-100 text-green-700 border border-green-400' : 'bg-red-100 text-red-700 border border-red-400'
        }`}>
          {cartMessage.text}
        </div>
      )}

      {/* Product Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-96 object-cover rounded-lg"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/600x600?text=Product+Image';
            }}
          />
        </div>

        {/* Product Info */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full mb-4">
            {product.category}
          </span>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
          
          {/* Rating */}
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  className={`w-5 h-5 ${
                    index < Math.floor(product.ratings) ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-gray-600 ml-2">
                {product.ratings} ({product.numReviews} reviews)
              </span>
            </div>
          </div>

          <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>

          <div className="border-t border-b py-4 mb-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-700 font-medium">Price:</span>
              <span className="text-3xl font-bold text-blue-600">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-700 font-medium">Availability:</span>
              <span className={`font-semibold ${
                product.stock > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
              </span>
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Quantity:</label>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="bg-gray-200 text-gray-700 w-10 h-10 rounded-lg hover:bg-gray-300 font-bold"
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock, parseInt(e.target.value) || 1)))}
                className="w-20 text-center border border-gray-300 rounded-lg py-2 font-semibold"
                min="1"
                max={product.stock}
              />
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="bg-gray-200 text-gray-700 w-10 h-10 rounded-lg hover:bg-gray-300 font-bold"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={addToCart}
              disabled={product.stock === 0 || addingToCart}
              className={`w-full py-3 rounded-lg font-semibold transition ${
                product.stock === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {addingToCart ? 'Adding...' : product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
            
            <Link
              to="/cart"
              className="block w-full py-3 rounded-lg font-semibold text-center bg-green-600 text-white hover:bg-green-700 transition"
            >
              Go to Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;