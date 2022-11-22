import { createSlice } from "@reduxjs/toolkit";
import authOperations from "./users-operations";

interface IUserData {
  _id: string | null;
  name: string | null;
  email: string | null;
  role: string | null;
}

interface IUserState {
  user: IUserData;
  token: string | null;
  isLoggedIn: boolean;
  refreshing: boolean;
  auth_error: null | string;
}

const initialState: IUserState = {
  user: {
    _id: null,
    name: null,
    email: null,
    role: null,
  },
  token: null,
  isLoggedIn: false,
  refreshing: false,
  auth_error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authOperations.register.pending, (state, _) => {
        state.auth_error = null;
        state.refreshing = true;
        state.isLoggedIn = false;
      })
      .addCase(authOperations.register.fulfilled, (state, action) => {
        state.user._id = action.payload._id;
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
        state.user.role = action.payload.role;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.auth_error = null;
        state.refreshing = false;
      })
      .addCase(authOperations.register.rejected, (state, action) => {
        state.auth_error = action.payload.response.data.message;
        state.refreshing = false;
        state.isLoggedIn = false;
      })
      .addCase(authOperations.login.pending, (state, _) => {
        state.auth_error = null;
        state.refreshing = true;
        state.isLoggedIn = false;
      })
      .addCase(authOperations.login.fulfilled, (state, action) => {
        state.user._id = action.payload._id;
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
        state.user.role = action.payload.role;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.auth_error = null;
        state.refreshing = false;
      })
      .addCase(authOperations.login.rejected, (state, action) => {
        state.auth_error = action.payload?.message || "";
        state.refreshing = false;
        state.isLoggedIn = false;
      })
      .addCase(authOperations.logout.pending, (state, _) => {
        state.auth_error = null;
        state.refreshing = true;
      })
      .addCase(authOperations.logout.fulfilled, (state, _) => {
        state.user._id = null;
        state.user.name = null;
        state.user.email = null;
        state.user.role = null;
        state.token = null;
        state.isLoggedIn = false;
        state.auth_error = null;
        state.refreshing = false;
      })
      .addCase(authOperations.logout.rejected, (state, _) => {
        state.auth_error = null;
        state.refreshing = false;
      })
      .addCase(authOperations.getCurrent.pending, (state, _) => {
        state.auth_error = null;
        state.refreshing = true;
      })
      .addCase(authOperations.getCurrent.fulfilled, (state, action) => {
        state.user._id = action.payload._id;
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
        state.user.role = action.payload.role;
        state.isLoggedIn = true;
        state.auth_error = null;
        state.refreshing = false;
      })
      .addCase(authOperations.getCurrent.rejected, (state, _) => {
        state.auth_error = null;
        state.refreshing = false;
      });
  },
});

export default authSlice.reducer;
