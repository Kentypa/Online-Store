import { CategoryBreadcrumbs } from "@business/CategoryBreadcrumbs";
import { SortProductsBy } from "@enums/sortProductsBy";
import { ProductsSortingList } from "@features/StorePages/ProductsPage/components/ProductsSortingList";
import { FC } from "react";

type ProductsHeaderProps = {
  categoryId: number;
  setNewCategory: (value: string) => void;
  currentSortingType: SortProductsBy;
  handleSetSortingType: (value: SortProductsBy) => void;
};

export const ProductsHeader: FC<ProductsHeaderProps> = ({
  categoryId,
  setNewCategory,
  currentSortingType,
  handleSetSortingType,
}) => (
  <div className="flex flex-col gap-6">
    <CategoryBreadcrumbs
      categoryId={categoryId}
      handleSetNewCategory={setNewCategory}
    />
    <div className="flex w-full gap-6">
      <ProductsSortingList
        currentSortingType={currentSortingType}
        handleSetSortingType={handleSetSortingType}
      />
    </div>
  </div>
);
