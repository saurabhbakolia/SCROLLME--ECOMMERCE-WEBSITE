import { createSlice } from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: [], // Store wishlist item IDs
  reducers: {
    addToWishlist: (state, action) => {
      const itemId = action.payload;
      if (!state.includes(itemId)) {
        state.push(itemId); // Add item ID to wishlist if not already present
      }
    },
    removeFromWishlist: (state, action) => {
      const itemId = action.payload;
      return state.filter((id) => id !== itemId); // Remove item from wishlist
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
