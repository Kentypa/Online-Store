import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserData } from "@shared-types/user-data";

const initialState: UserData = {
  username: "",
  avatarUrl: "",
  achievements: [],
  email: "",
  userStats: {
    totalClickCoins: 0,
    totalClicks: 0,
  },
  userCharacteristics: {
    coinsPerClick: 1,
    passiveCoinsIncome: 0,
  },
  authLoading: true,
  isAuthenticated: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    changeByData: (state, action: PayloadAction<UserData>) => {
      state.username = action.payload.username;
      state.avatarUrl = action.payload.avatarUrl
        ? `http://localhost:3000/${action.payload.avatarUrl}`
        : "";
      state.achievements = action.payload.achievements;
      state.email = action.payload.email;
      state.userStats = action.payload.userStats;
      state.userCharacteristics = action.payload.userCharacteristics;
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
