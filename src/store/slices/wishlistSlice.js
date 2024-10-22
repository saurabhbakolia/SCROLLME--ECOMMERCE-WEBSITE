import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const product = action.payload;
      const item = state.items?.find((item) => item._id === product._id);
      if (item === undefined) {
        const prodObj = {
          _id: product._id,
          name: product.name,
          imageUrl: product.imageUrl,
          price: product.price,
          color: product.color,
        };
        state.items?.push(prodObj);
      }
    },
    removeFromWishlist: (state, action) => {
      const itemId = action.payload;
      return {
        ...state,
        items: state.items?.filter((item) => item._id !== itemId),
      };
    },
    clearWishlist: () => initialState,
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
