import { City } from "./city";
import { Language } from "../language/language";

export type CityTranslation = {
  city_id: number;
  city: City;
  language: Language;
  lang_code: string;
  name: string;
};
