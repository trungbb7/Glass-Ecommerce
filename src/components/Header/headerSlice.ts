import type { Product } from "@/types/product";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface HeaderState {
  cartShaking: boolean;
  wishlistBounce: boolean;
  isComparing: boolean;
  compareProduct: Product | null;
}

const initialState: HeaderState = {
  cartShaking: false,
  wishlistBounce: false,
  isComparing: false,
  compareProduct: null,
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
    startComparing: (state) => {
      state.isComparing = true;
    },
    stopComparing: (state) => {
      state.isComparing = false;
    },
    setCompareProduct: (state, action: PayloadAction<Product | null>) => {
      state.compareProduct = action.payload;
    },
  },
});

export const {
  startShakingCart,
  stopShakingCart,
  startBounceWishlist,
  stopBounceWishlist,
  startComparing,
  stopComparing,
  setCompareProduct,
} = headSlice.actions;

export default headSlice.reducer;
