import { City } from "../city/city";
import { Country } from "../country/country";
import { RegionTranslation } from "./region-translation";

export type Region = {
  id: number;
  country: Country;
  countryCode: string;
  code: string;
  translations: RegionTranslation[];
  cities: City[];
};
