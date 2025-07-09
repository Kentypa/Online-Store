import { CategoryTranslation } from "../entities/category-translation.entity";

export type MasterCategoryNode = {
  id: number;
  parent_id: number | null;
  image_url: string | null;
  children: MasterCategoryNode[];
  translations: CategoryTranslation[];
};
