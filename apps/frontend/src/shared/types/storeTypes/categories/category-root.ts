import { CategoryTranslation } from "./category-translation";

export type CategoryRoot = {
  id: number;
  parentId: number | null;
  imageUrl: string | null;
  translations: CategoryTranslation[];
  children: CategoryRoot[];
};
