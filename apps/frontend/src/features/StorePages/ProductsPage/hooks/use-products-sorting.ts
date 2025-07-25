import { useState } from "react";
import { SortProductsBy } from "@enums/sortProductsBy";

export const useProductsSorting = (initialSort?: SortProductsBy) => {
  const [currentSortingType, setCurrentSortingType] = useState<SortProductsBy>(
    initialSort || SortProductsBy.TOTAL_SOLD_DESC,
  );

  const handleSetSortingType = (value: SortProductsBy) => {
    setCurrentSortingType(value);
    return value;
  };

  return {
    currentSortingType,
    handleSetSortingType,
  };
};
