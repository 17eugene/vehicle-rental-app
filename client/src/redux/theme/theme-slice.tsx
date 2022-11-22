import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IThemeState {
  theme: string;
}

const initialState = {
  theme: "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    selectTheme: (state, action: PayloadAction<IThemeState>) => {
      state.theme = action.payload.theme;
    },
  },
});

export default themeSlice.reducer;
export const { selectTheme } = themeSlice.actions;
