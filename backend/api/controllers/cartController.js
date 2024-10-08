const Cart = require('../models/cartModel');
const CartItem = require('../models/cartItemModel');

// Add item to cart
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user._id;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const cartItem = await CartItem.findOne({ product: productId });

    if (!cartItem) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    res.status(200).json({ message: 'Item added to cart', cart });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error adding item to cart', error: error.message });
  }
};

// View cart
exports.viewCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ user: userId }).populate('items.product');

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.status(200).json(cart);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error retrieving cart', error: error.message });
  }
};

// Update cart item quantity
exports.updateCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    if (quantity <= 0) {
      cart.items.splice(itemIndex, 1); // Remove item if quantity is zero or less
    } else {
      cart.items[itemIndex].quantity = quantity; // Update quantity
    }

    await cart.save();
    res.status(200).json({ message: 'Cart updated successfully', cart });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error updating cart', error: error.message });
  }
};

// Delete item from cart
exports.deleteCartItem = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    cart.items.splice(itemIndex, 1); // Remove item from cart

    await cart.save();
    res.status(200).json({ message: 'Item deleted from cart', cart });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error deleting item from cart', error: error.message });
  }
};

// Clear cart
exports.clearCart = async (req, res) => {
  try {
    const userId = req.user._id;

    // Find the user's cart
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Clear all items from the cart
    cart.items = [];

    // Save the updated cart
    await cart.save();

    res.status(200).json({ message: 'Cart cleared', cart });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error clearing cart', error: error.message });
  }
};
