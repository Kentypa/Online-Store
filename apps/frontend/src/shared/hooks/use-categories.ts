import { Queries } from "@enums/queriesKeys";
import { ServiceNames } from "@enums/serviceNames";
import { categoryService } from "@services/categoryService";
import { CategoryRoot } from "@shared-types/category-root";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

export const useCategories = () => {
  const { i18n } = useTranslation();
  const { getCategories } = categoryService(
    ServiceNames.CATEGORY,
    i18n.language
  );
  const { data, ...otherOptions } = useQuery({
    queryKey: [Queries.CATEGORY, i18n.language],
    queryFn: getCategories,
  });

  const categoriesData: CategoryRoot[] | undefined = data?.data;

  return { categoriesData, ...otherOptions };
};
