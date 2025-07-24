import { CountryTranslation } from "./country-translation";
import { Region } from "../region/region";

export type Country = {
  code: string;
  translations: CountryTranslation[];
  regions: Region[];
};
