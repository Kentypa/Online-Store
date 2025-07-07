import { City } from "./city";
import { Country } from "./country";
import { RegionTranslation } from "./region-translation";

export type Region = {
  id: number;

  country: Country;

  country_code: string;

  code: string;

  translations: RegionTranslation[];

  cities: City[];
};
