import { ClickerUpgrade } from "@features/HomePage/types/clicker-upgrade";
import { FC } from "react";
import { UpgradeItem } from "../../ui/UpgradeItem";

type UpgradesListProps = {
  upgradesList: ClickerUpgrade[];
  className?: string;
  listRef?: React.RefObject<HTMLUListElement | null>;
  onScroll?: () => void;
};

export const UpgradesList: FC<UpgradesListProps> = ({
  upgradesList,
  className,
  listRef,
  onScroll,
}) => {
  return (
    <ul ref={listRef} className={className} onScroll={onScroll}>
      {upgradesList.map((item) => (
        <UpgradeItem upgrade={item} key={item.id} />
      ))}
    </ul>
  );
};
