import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const itemId = action.payload;
      if (!state.items?.includes(itemId)) {
        state.items?.push(itemId);
      }
    },
    removeFromWishlist: (state, action) => {
      const itemId = action.payload;
      return state.items?.filter((id) => id !== itemId);
    },
    clearWishlist: () => initialState,
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
