import { AxiosError } from "axios";
import { createSlice } from "@reduxjs/toolkit";
import orderOperations from "./orders-operations";
import { IOrderResponse } from "../../model/order/order";

interface IOrdersState {
  ordersCollection: IOrderResponse[];
  loading: boolean;
  error: null | string | AxiosError | undefined;
}

const initialState: IOrdersState = {
  ordersCollection: [],
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(orderOperations.addOrder.pending, (state, _) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(orderOperations.addOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.ordersCollection = [...state.ordersCollection, action.payload];
      })
      .addCase(orderOperations.addOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      .addCase(orderOperations.getUserOrders.pending, (state, _) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(orderOperations.getUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.ordersCollection = action.payload;
      })
      .addCase(orderOperations.getUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      });
  },
  reducers: {},
});

export default orderSlice.reducer;
