import type { User } from "@/types/user";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
interface AuthState {
  user?: User;
  token?: string;
  logged: boolean;
}

const token = localStorage.getItem("token") || "";

const initialState: AuthState = {
  user: undefined,
  token: token,
  logged: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<User>) => {
      const user = action.payload;
      state.user = user;
      state.logged = true;
      localStorage.setItem("token", user.token || "");
    },

    logoutUser: (state) => {
      state.user = undefined;
      state.logged = false;
      localStorage.setItem("token", "");
    },
  },
});

export const { loginUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
