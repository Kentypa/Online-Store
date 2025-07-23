import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserData } from "@shared-types/user-data";

const initialState: UserData = {
  id: 0,
  avatarUrl: "",
  email: "",
  authLoading: true,
  isAuthenticated: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    changeByData: (state, action: PayloadAction<UserData>) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.city = action.payload.city;
      state.region = action.payload.region;
      state.country = action.payload.country;
      state.phoneNumber = action.payload.phoneNumber;
      state.cart = action.payload.cart;
      state.avatarUrl = action.payload.avatarUrl
        ? `http://localhost:3000/${action.payload.avatarUrl}`
        : "";
    },
    changeIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    changeAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.authLoading = action.payload;
    },
    logout: () => {
      return { ...initialState, authLoading: false, isAuthenticated: false };
    },
  },
});

export const {
  changeByData,
  logout,
  changeAuthLoading,
  changeIsAuthenticated,
} = userSlice.actions;

export default userSlice.reducer;
