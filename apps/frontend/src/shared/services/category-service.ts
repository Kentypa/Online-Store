import api from "@config/axios";
import { CategoryRoot } from "@shared-types/storeTypes/categories/category-root";
import { apiErrorHandler } from "@utils/api-error-handler";

export function categoryService(url: string, langCode: string) {
  const getCategories = async () => {
    return apiErrorHandler(() =>
      api.get<CategoryRoot[]>(`${url}/categories-tree`, {
        params: { langCode },
      }),
    );
  };

  const getParentCategories = async (categoryId: number) => {
    return apiErrorHandler(() =>
      api.get<number[]>(`${url}/categories-parent-ids`, {
        params: { categoryId },
      }),
    );
  };

  return { getCategories, getParentCategories };
}
