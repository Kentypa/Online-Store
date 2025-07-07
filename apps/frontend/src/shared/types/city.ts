import { CityTranslation } from "./city-translation";
import { Region } from "./region";

export type City = {
  id: number;

  region: Region;

  region_id: number;

  translations: CityTranslation[];
}