import { Button } from "@ui/Button";
import { SortingType } from "@features/RatingPage/types/sorting-types";
import { FC } from "react";

type SortingButtonsProps = {
  className?: string;
  sortingType: SortingType;
  setSortingType: (sortingType: SortingType) => void;
  sortingTypes: SortingType[];
  buttonClassName?: string;
};

export const SortingButtons: FC<SortingButtonsProps> = ({
  className,
  sortingTypes,
  sortingType,
  setSortingType,
  buttonClassName,
}) => {
  return (
    <ul className={className}>
      {sortingTypes.map((item) => (
        <Button
          handleClick={() => {
            setSortingType(item);
          }}
          className={`${buttonClassName} ${
            item === sortingType
              ? "bg-background border-primary"
              : "border-subtle-light"
          }`}
          key={item}
        >
          <div className="w-[100.75px] h-[20px]">{item}</div>
        </Button>
      ))}
    </ul>
  );
};
