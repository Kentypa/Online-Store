import { Language } from "../language/language";
import { Region } from "./region";

export type RegionTranslation = {
  regionId: number;
  region: Region;
  language: Language;
  langCode: string;
  name: string;
};
