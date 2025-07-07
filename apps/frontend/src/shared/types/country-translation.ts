import { Country } from "./country";
import { Language } from "./language";

export type CountryTranslation = {
  country: Country;
  country_code: string;
  language: Language;
  lang_code: string;
  name: string;
};
