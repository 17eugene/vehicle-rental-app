import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import carsSlice from "./cars/cars-slice";
import authSlice from "./users/users-slice";
import ordersSlice from "./orders/orders-slice";

const authPesistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};

export const store = configureStore({
  reducer: {
    cars: carsSlice,
    auth: persistReducer(authPesistConfig, authSlice),
    orders: ordersSlice,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
