import { Region } from "../region/region";
import { CityTranslation } from "./city-translation";

export type City = {
  id: number;
  region: Region;
  region_id: number;
  translations: CityTranslation[];
};
