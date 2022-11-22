import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IOrder, IOrderResponse } from "../../model/order/order";

axios.defaults.baseURL = "http://localhost:2222/api";

interface IOrderError {
  message: string;
}

const addOrder = createAsyncThunk<
  IOrderResponse,
  IOrder,
  { rejectValue: IOrderError }
>("orders/addOrder", async (credentials, { rejectWithValue }) => {
  const order = credentials;
  try {
    const { data } = await axios.post("/order", order);
    return data.order;
  } catch (error: any) {
    return rejectWithValue(error.response?.data);
  }
});

const getUserOrders = createAsyncThunk<
  IOrderResponse[],
  void,
  { rejectValue: IOrderError }
>("orders/getUserOrders", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get("/order");
    return data.orders;
  } catch (error: any) {
    return rejectWithValue(error.response?.data);
  }
});

const orderOperations = { addOrder, getUserOrders };

export default orderOperations;
