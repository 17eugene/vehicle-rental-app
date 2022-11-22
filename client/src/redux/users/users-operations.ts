import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IUser, IUserResponse } from "../../model/user/user";

axios.defaults.baseURL = "http://localhost:2222/api";

interface IUserLogin {
  email: string;
  password: string;
}

interface ILoginError {
  message: string;
}

const token = {
  setToken(token: string) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },

  unsetToken() {
    axios.defaults.headers.common.Authorization = "";
  },
};

const register = createAsyncThunk<IUserResponse, IUser, { rejectValue: any }>(
  "auth/register",
  async (credentials, { rejectWithValue }: any) => {
    try {
      const { data } = await axios.post("/auth/signup", credentials);
      token.setToken(data.userData.token);
      return data.userData;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const login = createAsyncThunk<
  IUserResponse,
  IUserLogin,
  { rejectValue: ILoginError }
>("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    const { data } = await axios.post("/auth/signin", credentials);
    token.setToken(data.data.token);
    return data.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data);
  }
});

const logout = createAsyncThunk<null, undefined, { rejectValue: any }>(
  "auth/logout",
  async (_, { rejectWithValue }: any) => {
    try {
      await axios.post("/auth/signout");
      token.unsetToken();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const getCurrent = createAsyncThunk<
  IUserResponse,
  undefined,
  { rejectValue: any }
>("auth/refresh", async (_, thunkAPI) => {
  const state: any = thunkAPI.getState();
  const persistedToken = state.auth.token;

  if (!persistedToken) {
    return thunkAPI.rejectWithValue("User not authorized!");
  }

  token.setToken(persistedToken);
  try {
    const { data } = await axios.get("/auth/current");
    return data.data;
  } catch (error) {
    thunkAPI.rejectWithValue(error);
  }
});

const authOperations = { register, login, logout, getCurrent };

export default authOperations;
