export type UserData = {
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  avatarUrl?: string;
  city?: string;
  region?: string;
  country?: string;
  authLoading: boolean;
  isAuthenticated: boolean | null;
};
