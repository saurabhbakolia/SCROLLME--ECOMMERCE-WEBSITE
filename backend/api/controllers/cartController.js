const Cart = require('../models/cartModel');
const Product = require('../models/productModel'); // Assuming there's a product model
const mongoose = require('mongoose');

// Add item to cart
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity, price } = req.body;
    const userId = req.user._id;

    if (!productId || quantity <= 0 || !price) {
      return res.status(400).json({ message: 'Invalid product or quantity, price' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingItemIndex = cart.items.findIndex(
      (item) => item.productId && item.productId.toString() === product._id.toString()
    );

    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      const newItem = {
        productId,
        quantity, 
        price
      };
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

    const cartData = await Cart.findOne({ userId }).populate({
      path: 'items.productId',
      select: 'name price brand category imageUrl',
    });

    if (!cartData || cartData.items.length === 0) {
      return res.status(404).json({ message: 'Cart is empty' });
    }

    const transformedCartData = {
      userId: cartData.userId,
      items: cartData.items.map((item) => {
        const product = item.productId;
        return ({
          productId: product._id,
          name: product.name,
          category: product.category,
          imageUrl: product.imageUrl,
          brand: product.brand,
          quantity: item.quantity,
          price: item.price
        })
      }),
      createdAt: cartData.createdAt, 
      updatedAt: cartData.updatedAt,
  };

    res.status(200).json(transformedCartData);
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

    const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId.toString());

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
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId.toString());
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
