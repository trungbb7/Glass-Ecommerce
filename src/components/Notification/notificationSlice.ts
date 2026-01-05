import type { Notification } from "@/types/notification";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
interface NotificationState {
  show: boolean;
  notification?: Notification;
}

const initialState: NotificationState = {
  show: false,
  notification: undefined,
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState: initialState,
  reducers: {
    pushNotification: (state, action: PayloadAction<Notification>) => {
      state.show = true;
      state.notification = action.payload;
    },
    closeNotification: (state) => {
      state.show = false;
      state.notification = undefined;
    },
  },
});

export const { pushNotification, closeNotification } =
  notificationSlice.actions;

export default notificationSlice.reducer;
