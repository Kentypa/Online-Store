import { UserData } from "@shared-types/auth/user-data";

export const initialState: UserData = {
  id: 0,
  avatarUrl: "",
  email: "",
  authLoading: true,
  isAuthenticated: null,
};
