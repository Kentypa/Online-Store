import { City } from "../geoTypes/city/city";
import { Country } from "../geoTypes/country/country";
import { Language } from "../geoTypes/language/language";
import { Region } from "../geoTypes/region/region";
import { CartItem } from "../storeTypes/cart/cart";

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
