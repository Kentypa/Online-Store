import { Region } from "../region/region";
import { CityTranslation } from "./city-translation";

export type City = {
  id: number;
  region: Region;
  regionId: number;
  translations: CityTranslation[];
};
