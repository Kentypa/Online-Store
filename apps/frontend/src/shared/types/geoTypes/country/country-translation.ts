import { Language } from "../language/language";
import { Country } from "./country";

export type CountryTranslation = {
  country: Country;
  country_code: string;
  language: Language;
  lang_code: string;
  name: string;
};
