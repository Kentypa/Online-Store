import { useSearchParams } from "react-router";
import { SortProductsBy } from "@enums/sortProductsBy";

export const useProductsQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get("page") ?? "1");
  const categoryId = Number(searchParams.get("categoryId") ?? "1");
  const query = searchParams.get("query") ?? "";
  const sortParam = searchParams.get("sortBy") as SortProductsBy | undefined;

  const setNewCategory = (value: string) => {
    searchParams.set("categoryId", value);
    setSearchParams(searchParams);
  };

  const setSortingType = (value: SortProductsBy) => {
    searchParams.set("sortBy", value);
    setSearchParams(searchParams);
  };

  return {
    currentPage,
    categoryId,
    query,
    sortParam,
    setNewCategory,
    setSortingType,
  };
};
