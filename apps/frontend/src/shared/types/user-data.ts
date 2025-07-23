import { CartItem } from "./cart";
import { City } from "./city";
import { Country } from "./country";
import { Language } from "./language";
import { Region } from "./region";

export type UserData = {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  avatarUrl?: string;
  cart?: CartItem[];
  languageCode?: Language;
  city?: City;
  region?: Region;
  country?: Country;
  authLoading: boolean;
  isAuthenticated: boolean | null;
};
