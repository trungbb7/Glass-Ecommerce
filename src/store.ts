import { configureStore } from "@reduxjs/toolkit";
import headerReducer from "@/components/Header/headerSlice";
import authReducer from "@/components/Auth/authSlice";
export const store = configureStore({
  reducer: {
    header: headerReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
