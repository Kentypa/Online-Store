import { UserAchievement } from "@shared-types/user-achievement";
import { UserCharacteristics } from "@shared-types/user-characteristics";
import { UserStats } from "@shared-types/user-stats";

export type UserData = {
  id?: number;
  username?: string;
  email: string;
  avatarUrl?: string;
  achievements?: UserAchievement[];
  userStats: UserStats;
  userCharacteristics: UserCharacteristics;
  isAuthenticated: boolean | null;
  authLoading: boolean;
};
