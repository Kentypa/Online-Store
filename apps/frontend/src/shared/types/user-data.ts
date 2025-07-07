import { City } from "./city";
import { Country } from "./country";
import { Language } from "./language";
import { Region } from "./region";

export type UserData = {
  email: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  avatarUrl?: string;
  languageCode?: Language;
  city?: City;
  region?: Region;
  country?: Country;
  authLoading: boolean;
  isAuthenticated: boolean | null;
};
