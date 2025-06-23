import { useAppSelector } from "@hooks/redux";
import { FeatureItem } from "@shared-types/feature-item";
import { userSelector } from "@selectors/userSelector";
import undefinedIcon from "@icons/undefined.svg";

export const useHomeFeatures = () => {
  const {
    userStats: { totalClickCoins },
    userCharacteristics: { coinsPerClick, passiveCoinsIncome },
  } = useAppSelector(userSelector);

  return [
    {
      description: "Total ClickCoins",
      img: undefinedIcon,
      name: totalClickCoins,
    },
    {
      description: "Coins per Click",
      img: undefinedIcon,
      name: coinsPerClick,
    },
    {
      description: "Passive Income",
      img: undefinedIcon,
      name: passiveCoinsIncome,
    },
  ] as FeatureItem[];
};
