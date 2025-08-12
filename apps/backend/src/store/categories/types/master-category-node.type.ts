import { CategoryTranslation } from "../entities/category-translation.entity";

export type MasterCategoryNode = {
  id: number;
  parentId: number | null;
  imageUrl: string | null;
  children: MasterCategoryNode[];
  translations: CategoryTranslation[];
};
