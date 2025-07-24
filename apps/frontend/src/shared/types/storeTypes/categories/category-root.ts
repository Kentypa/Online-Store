import { CategoryTranslation } from "./category-translation";

export type CategoryRoot = {
  id: number;
  parent_id: number | null;
  image_url: string | null;
  translations: CategoryTranslation[];
  children: CategoryRoot[];
};
