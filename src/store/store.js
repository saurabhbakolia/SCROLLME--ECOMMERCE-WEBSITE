import { configureStore } from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer, 
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import userReducer from "./Slices/UserSlice";

const persistConfig = {
    key: "root", 
    version: 1, 
    storage,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
};

const rootReducer = persistReducer(persistConfig, userReducer);


export const store = configureStore({
    reducer: {
        user: rootReducer
    }
});

export let persistor = persistStore(store);
export default store;