import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [], // to store cart items with id and quantity
  reducers: {
    addToCart: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.find((item) => item.id === itemId);
      if (existingItem) {
        // If item already exists, increase quantity
        existingItem.quantity += 1;
      } else {
        // If item doesn't exist, add it to cart with quantity 1
        state.push({ id: itemId, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.find((item) => item.id === itemId);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          // If quantity is more than 1, decrease it
          existingItem.quantity -= 1;
        } else {
          // If quantity is 1, remove item from cart
          return state.filter((item) => item.id !== itemId);
        }
      }
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
