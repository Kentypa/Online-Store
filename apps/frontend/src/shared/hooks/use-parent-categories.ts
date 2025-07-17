import { Queries } from "@enums/queriesKeys";
import { ServiceNames } from "@enums/serviceNames";
import { categoryService } from "@services/categoryService";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

export const useParentCategories = (categoryId: number) => {
  const { i18n } = useTranslation();
  const { getParentCategories } = categoryService(
    ServiceNames.CATEGORY,
    i18n.language,
  );
  const { data, ...otherOptions } = useQuery({
    queryKey: [Queries.CATEGORY, i18n.language, categoryId],
    queryFn: () => getParentCategories(categoryId),
  });

  const parentIds: number[] | undefined = data?.data;

  return { parentIds, ...otherOptions };
};
