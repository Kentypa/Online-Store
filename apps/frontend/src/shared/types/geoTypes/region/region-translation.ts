import { Language } from "../language/language";
import { Region } from "./region";

export type RegionTranslation = {
  region_id: number;
  region: Region;
  language: Language;
  lang_code: string;
  name: string;
};
