const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// @route   POST /api/cart/add
// @desc    Add item to cart
// @access  Public
router.post('/add', async (req, res) => {
  try {
    const { userId, productId, quantity, price } = req.body;
    
    // Validate product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ 
        success: false,
        message: 'Product not found' 
      });
    }
    
    // Check stock availability
    if (product.stock < quantity) {
      return res.status(400).json({ 
        success: false,
        message: 'Insufficient stock available' 
      });
    }
    
    // Find or create cart
    let cart = await Cart.findOne({ userId });
    
    if (!cart) {
      cart = new Cart({ userId, items: [], totalPrice: 0 });
    }
    
    // Check if item already exists in cart
    const itemIndex = cart.items.findIndex(item => 
      item.productId.toString() === productId
    );
    
    if (itemIndex > -1) {
      // Update quantity if item exists
      cart.items[itemIndex].quantity += quantity;
    } else {
      // Add new item
      cart.items.push({ productId, quantity, price });
    }
    
    // Calculate total price
    cart.calculateTotal();
    
    await cart.save();
    
    // Populate product details
    await cart.populate('items.productId');
    
    res.json({
      success: true,
      message: 'Item added to cart',
      data: cart
    });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error adding to cart', 
      error: error.message 
    });
  }
});

// @route   GET /api/cart/:userId
// @desc    Get user's cart
// @access  Public
router.get('/:userId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId })
      .populate('items.productId');
    
    if (!cart) {
      return res.json({
        success: true,
        data: { items: [], totalPrice: 0 }
      });
    }
    
    res.json({
      success: true,
      data: cart
    });
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error fetching cart', 
      error: error.message 
    });
  }
});

// @route   PUT /api/cart/update
// @desc    Update cart item quantity
// @access  Public
router.put('/update', async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    
    const cart = await Cart.findOne({ userId });
    
    if (!cart) {
      return res.status(404).json({ 
        success: false,
        message: 'Cart not found' 
      });
    }
    
    const itemIndex = cart.items.findIndex(item => 
      item.productId.toString() === productId
    );
    
    if (itemIndex === -1) {
      return res.status(404).json({ 
        success: false,
        message: 'Item not found in cart' 
      });
    }
    
    if (quantity <= 0) {
      // Remove item if quantity is 0 or less
      cart.items.splice(itemIndex, 1);
    } else {
      // Update quantity
      cart.items[itemIndex].quantity = quantity;
    }
    
    cart.calculateTotal();
    await cart.save();
    await cart.populate('items.productId');
    
    res.json({
      success: true,
      message: 'Cart updated',
      data: cart
    });
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error updating cart', 
      error: error.message 
    });
  }
});

// @route   DELETE /api/cart/:userId/:productId
// @desc    Remove item from cart
// @access  Public
router.delete('/:userId/:productId', async (req, res) => {
  try {
    const { userId, productId } = req.params;
    
    const cart = await Cart.findOne({ userId });
    
    if (!cart) {
      return res.status(404).json({ 
        success: false,
        message: 'Cart not found' 
      });
    }
    
    cart.items = cart.items.filter(item => 
      item.productId.toString() !== productId
    );
    
    cart.calculateTotal();
    await cart.save();
    await cart.populate('items.productId');
    
    res.json({
      success: true,
      message: 'Item removed from cart',
      data: cart
    });
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error removing from cart', 
      error: error.message 
    });
  }
});

// @route   DELETE /api/cart/:userId
// @desc    Clear entire cart
// @access  Public
router.delete('/:userId', async (req, res) => {
  try {
    const cart = await Cart.findOneAndDelete({ userId: req.params.userId });
    
    if (!cart) {
      return res.status(404).json({ 
        success: false,
        message: 'Cart not found' 
      });
    }
    
    res.json({
      success: true,
      message: 'Cart cleared successfully'
    });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error clearing cart', 
      error: error.message 
    });
  }
});

module.exports = router;