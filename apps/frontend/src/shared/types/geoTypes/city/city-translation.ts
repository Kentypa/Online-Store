import { City } from "./city";
import { Language } from "../language/language";

export type CityTranslation = {
  cityId: number;
  city: City;
  language: Language;
  langCode: string;
  name: string;
};
