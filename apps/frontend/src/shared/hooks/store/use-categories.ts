import { Queries } from "@enums/queriesKeys";
import { ServiceNames } from "@enums/serviceNames";
import { categoryService } from "@services/category-service";
import { CategoryRoot } from "@shared-types/storeTypes/categories/category-root";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

export const useCategories = () => {
  const { i18n } = useTranslation();
  const { getCategories } = categoryService(
    ServiceNames.CATEGORY,
    i18n.language,
  );
  const { ...otherOptions } = useQuery<CategoryRoot[]>({
    queryKey: [Queries.CATEGORY, i18n.language],
    queryFn: getCategories,
  });

  return { ...otherOptions };
};
