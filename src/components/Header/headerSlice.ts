import { createSlice } from "@reduxjs/toolkit";

interface HeaderState {
  shaking: boolean;
}

const initialState: HeaderState = {
  shaking: false,
};

export const headSlice = createSlice({
  name: "header",
  initialState: initialState,
  reducers: {
    startShaking: (state) => {
      state.shaking = true;
    },
    stopShaking: (state) => {
      state.shaking = false;
    },
  },
});

export const { startShaking, stopShaking } = headSlice.actions;

export default headSlice.reducer;
