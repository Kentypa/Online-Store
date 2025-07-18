import { FC, useState } from "react";
import { MainContentWrapper } from "@layout/MainContentWrapper";
import { useTranslation } from "react-i18next";
import { useProducts } from "@hooks/use-products";
import { SortProductsBy } from "@enums/sortProductsBy";
import "swiper/css";
import { PaginationButtons } from "@business/PaginationButtons";
import { useSearchParams } from "react-router";
import { ProductsSortingList } from "@features/ProductsPage/components/ProductsSortingList";
import { CategoryBreadcrumbs } from "@features/ProductsPage/components/CategoryBreadcrumbs";
import { ProductsList } from "@layout/ProductsList";

export const ProductsPage: FC = () => {
  const { i18n } = useTranslation("products");
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get("page") ?? "1");
  const categoryId = Number(searchParams.get("categoryId") ?? "1");
  const sortParam = searchParams.get("sortBy") as SortProductsBy | null;

  const limit = 10;
  const offset = (currentPage - 1) * limit;
  const [currentSortingType, setCurrentSortingType] = useState<SortProductsBy>(
    sortParam && Object.values(SortProductsBy).includes(sortParam)
      ? sortParam
      : SortProductsBy.TOTAL_SOLD_DESC,
  );

  const handleSetSortingType = (value: SortProductsBy) => {
    setCurrentSortingType(value);
    searchParams.set("sortBy", value);
    setSearchParams(searchParams);
  };

  const { productsData, total } = useProducts({
    langCode: i18n.language,
    limit,
    offset,
    sortBy: currentSortingType,
    categoryId,
  });

  const totalPages = Math.ceil(total / limit);

  return (
    <MainContentWrapper>
      <div className="flex flex-col w-full px-25 py-16 gap-30">
        <div className="flex flex-col gap-3 items-center">
          <div className="flex flex-col gap-6">
            <CategoryBreadcrumbs categoryId={categoryId} />
            <div className="flex w-full gap-6">
              <ProductsSortingList
                currentSortingType={currentSortingType}
                handleSetSortingType={handleSetSortingType}
              />
            </div>

            <ProductsList productsData={productsData} />
          </div>
          <PaginationButtons
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </div>
      </div>
    </MainContentWrapper>
  );
};
