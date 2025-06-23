import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@stores/user/userSlice";
import popupsListReducer from "@stores/popupsList/popupsListSlice";

export const store = configureStore({
  reducer: { user: userReducer, popupsList: popupsListReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
