const mongoose = require('mongoose');

// Define the cart item schema
const cartItemSchema = new mongoose.Schema({
    cartId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart',
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Assuming you have a Product model
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    // Optionally, you might include price if needed
    price: {
        type: Number
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create and export the model
const CartItem = mongoose.model('CartItem', cartItemSchema);
module.exports = CartItem;
