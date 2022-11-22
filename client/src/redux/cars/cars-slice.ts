import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import carsOperations from "./cars-operations";
import { ICarResponse } from "../../model/car/car";

interface ICarsState {
  carsCollection: ICarResponse[];
  loading: boolean;
  error: null | string | object;
  selectedCar: ICarResponse | null;
}

const initialState: ICarsState = {
  carsCollection: [],
  loading: false,
  error: null,
  selectedCar: null,
};

const carsSlice = createSlice({
  name: "cars",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(carsOperations.getAllCars.pending, (state, _) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(carsOperations.getAllCars.fulfilled, (state, action) => {
        state.carsCollection = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(carsOperations.getAllCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(carsOperations.addCar.pending, (state, _) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(carsOperations.addCar.fulfilled, (state, action) => {
        state.carsCollection = [...state.carsCollection, action.payload];
        state.loading = false;
        state.error = null;
      })
      .addCase(carsOperations.addCar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "";
      })
      .addCase(carsOperations.deleteCar.pending, (state, _) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(carsOperations.deleteCar.fulfilled, (state, action) => {
        state.carsCollection = state.carsCollection.filter(
          (car) => car._id !== action.payload._id
        );
        state.selectedCar = state.carsCollection[0];
        state.loading = false;
        state.error = null;
      })
      .addCase(carsOperations.deleteCar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "";
      })
      .addCase(carsOperations.updateCar.pending, (state, _) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(carsOperations.updateCar.fulfilled, (state, action) => {
        state.carsCollection = state.carsCollection.map((car) =>
          car._id === action.payload._id ? action.payload : car
        );
        state.selectedCar = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(carsOperations.updateCar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "";
      });
  },
  reducers: {
    selectCar: (state, action: PayloadAction<ICarResponse>) => {
      state.selectedCar = action.payload;
      state.loading = false;
      state.error = null;
    },

    getDefaultCar: (state, action: PayloadAction<ICarResponse>) => {
      state.selectedCar = action.payload;
      state.loading = false;
      state.error = null;
    },

    resetToDefaultCar: (state, action: PayloadAction<ICarResponse>) => {
      state.selectedCar = action.payload;
    },
  },
});

export default carsSlice.reducer;
export const { selectCar, resetToDefaultCar, getDefaultCar } =
  carsSlice.actions;
