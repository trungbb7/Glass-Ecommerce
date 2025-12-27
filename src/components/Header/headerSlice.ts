import { createSlice } from "@reduxjs/toolkit";

interface HeaderState {
  cartShaking: boolean;
  wishlistBounce: boolean;
}

const initialState: HeaderState = {
  cartShaking: false,
  wishlistBounce: false,
};

export const headSlice = createSlice({
  name: "header",
  initialState: initialState,
  reducers: {
    startShakingCart: (state) => {
      state.cartShaking = true;
    },
    stopShakingCart: (state) => {
      state.cartShaking = false;
    },

    startBounceWishlist: (state) => {
      state.wishlistBounce = true;
    },
    stopBounceWishlist: (state) => {
      state.wishlistBounce = false;
    },
  },
});

export const {
  startShakingCart,
  stopShakingCart,
  startBounceWishlist,
  stopBounceWishlist,
} = headSlice.actions;

export default headSlice.reducer;
