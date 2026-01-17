import { configureStore } from "@reduxjs/toolkit";
import headerReducer from "@/components/Header/headerSlice";
import authReducer from "@/components/Auth/authSlice";
import notificationReducer from "@/components/Notification/notificationSlice";
import cartReducer from "@/components/Cart/cartSlice";

export const store = configureStore({
  reducer: {
    header: headerReducer,
    auth: authReducer,
    notification: notificationReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
