import { Language } from "../language/language";
import { Country } from "./country";

export type CountryTranslation = {
  country: Country;
  countryCode: string;
  language: Language;
  langCode: string;
  name: string;
};
