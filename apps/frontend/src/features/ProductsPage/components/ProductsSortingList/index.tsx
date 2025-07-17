import { SortProductsBy } from "@enums/sortProductsBy";
import { ExpandSelectionList } from "@ui/ExpandSelectionList";
import { FC } from "react";
import SortIcon from "@icons/sort.svg?react";
import { useTranslation } from "react-i18next";

type ProductsSortingListProps = {
  handleSetSortingType: (value: SortProductsBy) => void;
  currentSortingType: SortProductsBy;
};

export const ProductsSortingList: FC<ProductsSortingListProps> = ({
  handleSetSortingType,
  currentSortingType,
}) => {
  const { t } = useTranslation("products");

  const SORT_OPTIONS: { value: SortProductsBy; label: string }[] = [
    {
      value: SortProductsBy.TOTAL_SOLD_DESC,
      label: t("sortingTypes.totalSold"),
    },
    { value: SortProductsBy.PRICE_ASC, label: t("sortingTypes.fromLower") },
    { value: SortProductsBy.PRICE_DESC, label: t("sortingTypes.fromHighter") },
  ];

  const selectedOption = SORT_OPTIONS.find(
    (opt) => opt.value === currentSortingType,
  );

  return (
    <ExpandSelectionList
      variants={Object.fromEntries(
        SORT_OPTIONS.map((opt) => [opt.value, opt.label]),
      )}
      selectedClassName="flex flex-row-reverse gap-3 text-white hover:text-accent hover:fill-accent"
      selectionClassName="text-primary hover:bg-accent p-2 rounded-md w-30"
      variantsListClassName="left-1/2 top-full -translate-x-1/2 mt-3 bg-background border-2 border-separator rounded-md z-50"
      onChange={(value) => {
        handleSetSortingType(value as SortProductsBy);
      }}
    >
      <div className="flex gap-3 rounded-2xl p-3 border-2 border-separator fill-primary text-primary">
        <SortIcon className="size-6" />
        <p>{selectedOption?.label ?? "Sort"}</p>
      </div>
    </ExpandSelectionList>
  );
};
