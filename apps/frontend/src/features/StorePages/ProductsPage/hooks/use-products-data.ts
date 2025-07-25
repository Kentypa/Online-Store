import { useProducts } from "@hooks/store/use-products";
import { useTranslation } from "react-i18next";
import { SortProductsBy } from "@enums/sortProductsBy";

export const useProductsData = (
  currentPage: number,
  currentSortingType: SortProductsBy,
  categoryId: number,
  query: string,
) => {
  const { i18n } = useTranslation("products");
  const limit = 10;
  const offset = (currentPage - 1) * limit;

  const { productsData, total } = useProducts({
    langCode: i18n.language,
    limit,
    offset,
    sortBy: currentSortingType,
    categoryId,
    query,
  });

  const totalPages = Math.ceil(total / limit);

  return {
    productsData,
    total,
    totalPages,
    limit,
  };
};
