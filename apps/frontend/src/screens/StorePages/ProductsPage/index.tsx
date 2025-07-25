import { FC } from "react";
import { MainContentWrapper } from "@layout/MainContentWrapper";
import { PaginationButtons } from "@business/PaginationButtons";
import { ProductsList } from "@layout/ProductsList";
import { useProductsQueryParams } from "@features/StorePages/ProductsPage/hooks/use-products-query-params";
import { useProductsSorting } from "@features/StorePages/ProductsPage/hooks/use-products-sorting";
import { useProductsData } from "@features/StorePages/ProductsPage/hooks/use-products-data";
import { ProductsHeader } from "@features/StorePages/ProductsPage/components/ProductsHeader";
import { SortProductsBy } from "@enums/sortProductsBy";
import "swiper/css";

export const ProductsPage: FC = () => {
  const {
    currentPage,
    categoryId,
    query,
    sortParam,
    setNewCategory,
    setSortingType: setUrlSortingType,
  } = useProductsQueryParams();

  const { currentSortingType, handleSetSortingType } =
    useProductsSorting(sortParam);

  const { productsData, totalPages } = useProductsData(
    currentPage,
    currentSortingType,
    categoryId,
    query,
  );

  const handleSortingChange = (value: SortProductsBy) => {
    handleSetSortingType(value);
    setUrlSortingType(value);
  };

  return (
    <MainContentWrapper>
      <div className="flex flex-col w-full px-25 py-16 gap-30">
        <div className="flex flex-col gap-3 items-center">
          <div className="flex flex-col gap-6">
            <ProductsHeader
              categoryId={categoryId}
              setNewCategory={setNewCategory}
              currentSortingType={currentSortingType}
              handleSetSortingType={handleSortingChange}
            />

            <ProductsList productsData={productsData} />
          </div>

          {totalPages > 1 && (
            <PaginationButtons
              currentPage={currentPage}
              totalPages={totalPages}
            />
          )}
        </div>
      </div>
    </MainContentWrapper>
  );
};
