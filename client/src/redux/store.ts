import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import themeSlice from "./theme/theme-slice";
import carsSlice from "./cars/cars-slice";
import authSlice from "./users/users-slice";
import ordersSlice from "./orders/orders-slice";

const themePersistConfig = {
  key: "theme",
  storage,
}

const authPesistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};

export const store = configureStore({
  reducer: {
    theme: persistReducer(themePersistConfig, themeSlice),
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
