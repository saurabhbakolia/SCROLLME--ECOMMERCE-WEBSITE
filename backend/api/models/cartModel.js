const mongoose = require('mongoose');

// Define the cart schema
const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // No need to store items directly here if they are managed in a separate collection
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create and export the model
const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
