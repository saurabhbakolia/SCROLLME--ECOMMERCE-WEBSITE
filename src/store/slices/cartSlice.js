import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addToCartAPI, viewCartAPI, updateCartItemAPI, deleteCartItemAPI, clearCartAPI } from '../../services/cart/cartService';

const initialState = {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
    status: 'idle',
    error: null,
};

// Thunk for adding to cart
export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async (cartData, { rejectWithValue }) => {
        try {
            const { productId, quantity, price } = cartData;
            const response = await addToCartAPI({ productId, quantity, price });
            return { cartData, response };
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

// Thunk for viewing the cart
export const viewCart = createAsyncThunk(
    'cart/viewCart',
    async (_, { rejectWithValue }) => {
        try {
            const response = await viewCartAPI();
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

// Thunk for updating cart item quantity
export const updateCartItem = createAsyncThunk(
    'cart/updateCartItem',
    async (cartItemData, { rejectWithValue }) => {
        try {
            const response = await updateCartItemAPI(cartItemData);
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

// Thunk for deleting an item from the cart
export const deleteCartItem = createAsyncThunk(
    'cart/deleteCartItem',
    async (cartItemId, { rejectWithValue }) => {
        try {
            const response = await deleteCartItemAPI({ productId: cartItemId });
            return { cartItemId, response };
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

// Thunk for clearing the cart
export const clearCart = createAsyncThunk(
    'cart/clearCart',
    async (_, { rejectWithValue }) => {
        try {
            const response = await clearCartAPI();
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Handle addToCart thunk
            .addCase(addToCart.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                const { cartData } = action.payload;
                const { productId, name, price, quantity, image, brand, category } = cartData;

                const existingItem = state.items.find(item => item.id === productId);

                if (existingItem) {
                    existingItem.quantity += quantity;
                } else {
                    state.items.push({ productId, name, price, quantity, image, brand, category });
                }

                state.totalQuantity += quantity;
                state.totalPrice += price * quantity;
                state.status = 'succeeded';
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            // Handle viewCart thunk
            .addCase(viewCart.fulfilled, (state, action) => {
                console.log("items", action.payload.items);
                console.log("status", action.payload.status);
                state.items = action.payload.items;
                state.totalQuantity = action.payload.totalQuantity;
                state.totalPrice = action.payload.totalPrice;
            })
            .addCase(viewCart.rejected, (state, action) => {
                state.error = action.payload;
            })

            // Handle updateCartItem thunk
            .addCase(updateCartItem.fulfilled, (state, action) => {
                const updatedItem = action.payload;
                const existingItem = state.items.find((item) => item.id === updatedItem.id);

                if (existingItem) {
                    state.totalQuantity += updatedItem.quantity - existingItem.quantity;
                    state.totalPrice += updatedItem.price * updatedItem.quantity - existingItem.price * existingItem.quantity;
                    existingItem.quantity = updatedItem.quantity;
                }
            })
            .addCase(updateCartItem.rejected, (state, action) => {
                state.error = action.payload;
            })

            // Handle deleteCartItem thunk
            .addCase(deleteCartItem.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteCartItem.fulfilled, (state, action) => {
                const { cartItemId } = action.payload;
                const itemIndex = state.items.findIndex((item) => item.id === cartItemId);
                if (itemIndex !== -1) {
                    const removedItem = state.items[itemIndex];
                    state.totalQuantity -= removedItem.quantity;
                    state.totalPrice -= removedItem.price * removedItem.quantity;
                    state.items.splice(itemIndex, 1);
                }
            })
            .addCase(deleteCartItem.rejected, (state, action) => {
                state.error = action.payload;
            })

            // Handle clearCart thunk
            .addCase(clearCart.fulfilled, (state) => {
                state.items = [];
                state.totalQuantity = 0;
                state.totalPrice = 0;
            })
            .addCase(clearCart.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export default cartSlice.reducer;
