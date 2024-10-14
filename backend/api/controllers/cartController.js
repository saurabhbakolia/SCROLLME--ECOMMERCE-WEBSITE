const Cart = require('../models/cartModel');
const CartItem = require('../models/cartItemModel');
const Product = require('../models/productModel'); // Assuming there's a product model
const mongoose = require('mongoose');
const { ObjectId, BSON } = require('mongodb');

// Add item to cart
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity, price } = req.body;
    const userId = req.user._id;
    console.log(productId, quantity, price);

    if (!productId || quantity <= 0 || !price) {
      return res.status(400).json({ message: 'Invalid product or quantity' });
    }

    // Find the product to ensure it exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let cart = await Cart.findOne({ userId }).populate('items.productId');

    if (!cart) {
      // Create a new cart if it doesn't exist
      cart = new Cart({ userId, items: [] });
    }

    // Check if the product is already in the cart
    const existingItemIndex = cart.items.findIndex(
      (item) => item.productId && item.productId.toString() === productId.toString()
    );

    if (existingItemIndex > -1) {
      // If the product exists in the cart, update the quantity
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Add a new item to the cart
      const newItem = new CartItem({
        productId,
        quantity,
        price: product.price,
      });
      cart.items.push(newItem);
    }

    await cart.save();
    res.status(200).json({ message: 'Item added to cart', cart });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ message: 'Error adding item to cart', error: error.message });
  }
};

// View cart
exports.viewCart = async (req, res) => {
  try {
    const userId = req.user._id;

    const cart = await Cart.findOne({ userId }).populate({
      path: 'items.productId',
      select: 'name price',
    });

    if (!cart || cart.items.length === 0) {
      return res.status(404).json({ message: 'Cart is empty' });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error('Error viewing cart:', error);
    res.status(500).json({ message: 'Error retrieving cart', error: error.message });
  }
};

// Update cart item quantity
exports.updateCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user._id;

    if (quantity <= 0) {
      return res.status(400).json({ message: 'Quantity must be at least 1' });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const productObjectId = mongoose.Types.ObjectId(productId);
    // const itemIndex = cart.items.findIndex((id) => id.toString() === productObjectId.toString());
    const itemIndex = cart.items.findIndex((item) => {
      console.log("Comparing with item:", item.toString());
      return item.toString() === productObjectId.toString();
    });

    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    cart.items[itemIndex].quantity = quantity;
    await cart.save();

    res.status(200).json({ message: 'Cart item updated', cart });
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({ message: 'Error updating cart item', error: error.message });
  }
};

// Delete item from cart
exports.deleteCartItem = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user._id;

    const cart = await Cart.findOne({ userId });
    console.log("cart", cart);
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    console.log("productId", productId);
    const itemIndex = cart.items.findIndex((item) => item === productId);
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    cart.items.splice(itemIndex, 1);

    await cart.save();
    res.status(200).json({ message: 'Item removed from cart', cart });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ message: 'Error deleting item from cart', error: error.message });
  }
};

// Clear entire cart
exports.clearCart = async (req, res) => {
  try {
    const userId = req.user._id;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = []; // Clear all items
    await cart.save();

    res.status(200).json({ message: 'Cart cleared', cart });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({ message: 'Error clearing cart', error: error.message });
  }
};
