const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        quantity: {
          type: Number, 
          required: true, 
          min: [1, 'Quantity must be atleast 1'],
        },
        price: {
          type: Number, 
          required: true,
          min: [0, 'Price must be atleast a positive number'],
        }
      }
    ],
  },
  { timestamps: true }
);

// Ensure that each user has only one cart
cartSchema.index({ userId: 1}, {unique: true});
const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
