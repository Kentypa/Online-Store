import { CategoryRoot } from "@shared-types/storeTypes/categories/category-root";

type CategoryWithNames = {
  id: number;
  names: string[];
};

export function getCategoriesByIds(
  categoryIds: number[],
  allCategories: CategoryRoot[],
): CategoryWithNames[] {
  const result: CategoryWithNames[] = [];
  const queue: CategoryRoot[] = [...allCategories];

  while (queue.length > 0) {
    const category = queue.shift()!;
    if (categoryIds.includes(category.id)) {
      result.push({
        id: category.id,
        names: category.translations.map((t) => t.name),
      });
    }

    if (category.children && category.children.length > 0) {
      queue.push(...category.children);
    }
  }

  return result;
}
