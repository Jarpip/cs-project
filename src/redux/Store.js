import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import authSlice from "./Slice/authSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import customerSlice from "./Slice/customerSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  customer: customerSlice,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
