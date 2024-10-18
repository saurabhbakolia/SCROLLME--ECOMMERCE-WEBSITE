import { configureStore } from '@reduxjs/toolkit';
// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// import userReducer from './Slices/UserSlice';
// import cartReducer from './Slices/CartSlice';
import wishlistReducer from './Slices/WishlistSlice';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './Slices/userSlice';
import cartReducer from './Slices/CartSlice';

// persist configuration
const persistConfig = {
  key: 'root',
  version: 1,
  storage
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, userReducer);
const persistedCartReducer = persistReducer({ key: 'cart', storage }, cartReducer);

export const store = configureStore({
  reducer: {
    user: persistedReducer,
    // cart: cartReducer,
    wishlist: wishlistReducer,
    cart: persistedCartReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
});

export let persistor = persistStore(store);
export default store;
