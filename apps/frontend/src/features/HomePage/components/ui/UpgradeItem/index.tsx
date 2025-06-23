import { Button } from "@ui/Button";
import { numberFormatter } from "@utils/number-formatter";
import { ClickerUpgrade } from "@features/HomePage/types/clicker-upgrade";
import { FC } from "react";
import CoinIcon from "@icons/coin-small.svg";

type UpgradeItemProps = {
  upgrade: ClickerUpgrade;
};

export const UpgradeItem: FC<UpgradeItemProps> = ({ upgrade }) => {
  return (
    <li className="flex justify-between w-full px-6 py-3.75 rounded-lgx border border-subtle-light hover:border-primary">
      <img
        className="size-12 border border-subtle-light rounded-lg"
        src={upgrade.iconPath}
        alt={upgrade.title}
      />
      <div className="grid grid-cols-1 gap-0.5 max-w-[276px] w-full">
        <h3 className="text-label-large">{upgrade.title}</h3>
        <p className="text-subtle-dark text-body-large">
          {upgrade.description}
        </p>
        <div className="relative">
          <div className="flex">
            <img
              src={CoinIcon}
              alt="coin-icon"
              className="size-6 p-0.5 mr-2.5"
            />
            <p className="text-title-medium">
              {numberFormatter(upgrade.price)}
            </p>
          </div>
          <Button className="absolute -translate-full left-full rounded-xl px-4 py-2.5 bg-background hover:bg-primary hover:text-white">
            <p className="text-label-medium">Buy</p>
          </Button>
        </div>
      </div>
    </li>
  );
};
