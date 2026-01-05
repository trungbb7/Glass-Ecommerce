import { configureStore } from "@reduxjs/toolkit";
import headerReducer from "@/components/Header/headerSlice";
import authReducer from "@/components/Auth/authSlice";
import notificationReducer from "@/components/Notification/NotificationSlice";
export const store = configureStore({
  reducer: {
    header: headerReducer,
    auth: authReducer,
    notification: notificationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
